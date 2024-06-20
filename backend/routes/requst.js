const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system
const { request } = require("http");

// MAKE request [ USER]
router.post(
  "",

  body("user_id")
    .isInt()
    .withMessage("please enter a valid  id"),
  body("warehouse_id")
    .isInt()
    .withMessage("please enter a valid  id"),
  body("product_id")
    .isInt()
    .withMessage("please enter a valid  id"),

  body("stock").isNumeric().withMessage("please enter a valid stock"),
  body("operation").isString().withMessage("please enter a operation"),

  body("history").isString().withMessage("please enter a history"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }




      // 3 - PREPARE request requst OBJECT
      const requObj = {
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        warehouse_id: req.body.warehouse_id,
        stock: req.body.stock,
        operation: req.body.operation,
        status: req.body.status,
        history: req.body.history,
      };


      // 4 - INSERT request INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into warehouse_stock_request  set ? ", requObj);
      res.status(200).json({
        msg: "request created successfully !",
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


  body("stock")
    .isInt()
    .isLength({ min: 1 })
    .withMessage("request should int"),
  body("operation")
    .isString()
    .isLength({ min: 5 })
    .withMessage("operation should be at least 5 characters"),
  body("status")
    .isBoolean()
    .withMessage("status should be 1 or 0"),
  body("history")
    .isString()
    .isLength({ min: 5 })
    .withMessage("history should be at least 5 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF request  EXISTS OR NOT
      const request = await query("select * from  warehouse_stock_request where id = ?", [
        req.params.id,
      ]);
      if (!request[0]) {
        res.status(404).json({ ms: "request not found !" });
      }

      // 3- PREPARE request OBJECT
      const requestObj = {
        stock: req.body.stock,
        operation: req.body.operation,
        status: req.body.status,
        history: req.body.history,
      };

      // 4- UPDATE request 
      await query("update warehouse_stock_request set ? where id = ?", [requestObj, request[0].id]);

      res.status(200).json({
        msg: "request updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// UPDATE product [ADMIN]
router.put(
  "/req/:id",
  admin,
  body("stock").isInt().isLength({ min: 1 }).withMessage("Stock must be a positive integer."),
  body("operation").isString().isLength({ min: 5 }).withMessage("Operation should be at least 5 characters."),
  body("status").isBoolean().withMessage("Status should be a boolean value."),
  body("history").isString().isLength({ min: 5 }).withMessage("History should be at least 5 characters."),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request = await query("SELECT * FROM warehouse_stock_request WHERE id = ?", [req.params.id]);
      if (!request[0]) {
        res.status(404).json({ ms: "Request not found !" });
      }

      const requestObj = {
        
        stock: req.body.stock,
        operation: req.body.operation,
        status: req.body.status,
        history: req.body.history,
        product_id:req.body.product_id,
      };

      await query("UPDATE warehouse_stock_request SET ? WHERE id = ?", [requestObj, request[0].id]);

      // Check if status is 1, then update product table
      if (req.body.status === 1) {
        const product_id = request[0].product_id;
        const product = await query("SELECT * FROM product JOIN warehouse_stock_request ON product.id = warehouse_stock_request.product_id WHERE product.id = ?", [product_id]);
        if (!product[0]) {
          return res.status(404).json({ ms: "Product not found !" });
        }
        const newStock =  req.body.stock;
        await query("UPDATE product SET stock = ? WHERE id = ?", [newStock, product_id]);
      }

      res.status(200).json({
        msg: "Request updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/",
  admin,
  (req, res) => {
    conn.query("select * from warehouse_stock_request", (err, result, fields) => {
      res.send(result);
    });
  });
// DELETE request [ADMIN]
router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF product  EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const request = await query("select * from warehouse_stock_request where id = ?", [
        req.params.id,
      ]);
      if (!request[0]) {
        res.status(404).json({ ms: "request not found !" });
      }


      await query("delete from warehouse_stock_request where id = ?", [request[0].id]);
      res.status(200).json({
        msg: "requestt delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/super", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  if (req.query.user_id) {
    const products = await query(`SELECT * FROM warehouse_stock_request WHERE user_id = ${req.query.user_id}`);
    res.status(200).json(products);
  } else {
    res.status(400).json({ message: "User ID is required." });
  }
});


router.get("/:id", admin, async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const request = await query("select * from warehouse_stock_request  where id = ?", [
    req.params.id,
  ]);
  if (!request[0]) {
    res.status(404).json({ ms: "request not found !" });
  }


  res.status(200).json(request[0]);
});


module.exports = router;