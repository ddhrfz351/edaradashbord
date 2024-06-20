const { log } = require("console");
const bcrypt = require("bcrypt");
const conn = require("../db/dbConnection");
const {  validationResult } = require("express-validator");

const util = require("util"); // helper
exports.login = async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const user = await query("select * from users where email = ?", [
        req.body.email,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }

      // 3- COMPARE HASHED PASSWORD
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (checkPassword) {
        delete user[0].password;
        res.status(200).json(user[0]);
      } else {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
  
  exports.add_user=async (req, res) => {
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
     status:req.body.status,
     type:req.body.type,
     phone:req.body.phone
      };

      // 4- INSERT USER OBJECT INTO DB
      await query("insert into users set ? ", userData);
      delete userData.password;
      res.status(200).json({userData: userData, message: "User Created Successfully!"});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errors: [
          {
            msg: "Something went wrong, please try again later !",
          },
        ],
      });
    }
  }