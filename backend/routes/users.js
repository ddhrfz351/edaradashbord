const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system
// add user
router.post(
  "/add",

  body("email").isEmail().withMessage("please enter a valid email!"),
  admin,
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("status")
    .isBoolean()
    .withMessage("status should be 1or0"),
  body("type")
    .isBoolean()
    .withMessage("type should be 1or0"),
  body("phone")
    .isLength({ min: 8, max: 12 })
    .withMessage("phone should be between (8-12) character"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const checkEmailExists = await query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already exists !",
            },
          ],
        });
      }

      // 3- PREPARE OBJECT USER TO -> SAVE
      const userData = {

        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone
      };

      // 4- INSERT USER OBJECT INTO DB
      await query("insert into users set ? ", userData);
      delete userData.password;
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);

// Get request => get all users
router.get("/",
  admin,
  (req, res) => {
    conn.query("select * from users", (err, result, fields) => {
      res.send(result);
    });
  });

// UPDATE user [ADMIN]
router.put(
  "/:id", // params
  admin,
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("status")
    .isBoolean()
    .withMessage("please enter a valid status ")
    .withMessage("status should be 1 or 0"),
  body("type")
    .isBoolean()
    .withMessage("please enter a valid status ")
    .withMessage("status should be 1 or 0"),
  body("phone")
    .isInt()
    .withMessage("please enter a valid description ")
    .isLength({ min: 11 })
    .withMessage("phone should be at lease 11 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF user EXISTS OR NOT
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      // 3- PREPARE user OBJECT
      const userObj = {
        email: req.body.email,
        password: crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("hex"),
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone,
      };

      // 4- UPDATE user
      await query("update users set ? where id = ?", [userObj, user[0].id]);

      res.status(200).json({
        msg: "user updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE user [ADMIN]
router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF product  EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "product not found !" });
      }


      await query("delete from users where id = ?", [user[0].id]);
      res.status(200).json({
        msg: "product delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);




router.get("/:id", admin, async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  try {
    const user = await query("select * from users where id = ?", [req.params.id]);
    if (!user[0]) {
      res.status(404).json({ ms: "User not found!" });
      return;
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ ms: "Internal server error" });
  }
});





module.exports = router;
