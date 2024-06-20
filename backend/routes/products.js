const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE product [ADMIN]
router.post(
  "",
  admin,
  upload.single("photo"),
  body("name")
    .isString()
    .withMessage("please enter a valid  name")
    .isLength({ min: 5 })
    .withMessage("product name should be at lease 5 characters"),
  body("user_id")
    .isInt()
    .withMessage("please enter a valid  id"),
  body("warehouse_id")
    .isInt()
    .withMessage("please enter a valid  id"),
  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 4 })
    .withMessage("description name should be at lease 20 characters"),

  body("stock")
    .isInt()
    .withMessage("please enter a valid stock "),


  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- VALIDATE THE IMAGE
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      // 3- PREPARE product OBJECT
      const product = {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        user_id: req.body.user_id,
        warehouse_id: req.body.warehouse_id,
        photo: req.file.filename,
      };

      // 4 - INSERT product INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into product set ? ", product);
      res.status(200).json({
        msg: "product created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE product [ADMIN]
router.put(
  "/:id", // params
  admin,
  upload.single("image"),
  body("name")
    .isString()
    .withMessage("please enter a valid product name"),


  body("description")
    .isString()
    .withMessage("please enter a valid description "),

  body("stock")
    .isInt()
    .withMessage("stock should be an integer"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF product EXISTS OR NOT
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }

      // 3- PREPARE product OBJECT
      const productObj = {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
      };

      if (req.file) {
        productObj.photo = req.file.filename;
        fs.unlinkSync("./upload/" + product[0].photo); // delete old image
      }

      // 4- UPDATE product
      await query("update product set ? where id = ?", [productObj, product[0].id]);

      res.status(200).json({
        msg: "product updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE product [ADMIN]
router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF product  EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }
      // 2- REMOVE product IMAGE
      fs.unlinkSync("./upload/" + product[0].photo); // delete old image
      await query("delete from product where id = ?", [product[0].id]);
      res.status(200).json({
        msg: "product delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.get("/", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  if (req.query.user_id) {
    // QUERY PARAMS
    const products = await query(`select * from product p join warehouse w on p.warehouse_id = w.id where w.user_id = ${req.query.user_id} ${search}`);
    products.map((product) => {
      product.photo = "http://" + req.hostname + ":4000/" + product.photo;
    });
    res.status(200).json(products);
  } else {
    const products = await query(`select * from product ${search}`);
    products.map((product) => {
      product.photo = "http://" + req.hostname + ":4000/" + product.photo;
    });
    res.status(200).json(products);
  }
});

router.get("/super", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  if (req.query.user_id) {
    // QUERY PARAMS
    const products = await query(`select * from product p join warehouse w on p.warehouse_id = w.id where w.user_id = ${req.query.user_id} ${search}`);
    products.map((product) => {
      product.photo = "http://" + req.hostname + ":4000/" + product.photo;
    });
    res.status(200).json(products);
  } else {
    const products = await query(`select * from product ${search}`);
    products.map((product) => {
      product.photo = "http://" + req.hostname + ":4000/" + product.photo;
    });
    res.status(200).json(products);
  }
});

// SHOW MOVIE [ADMIN, USER]
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const product = await query("SELECT * FROM product WHERE id = ?", [req.params.id]);
  if (!product || !product[0]) {
    res.status(404).json({ message: "Product not found!" });
  } else {
    product[0].photo = "http://" + req.hostname + ":4000/" + product[0].photo;
    res.status(200).json(product[0]);
  }
});


module.exports = router;
