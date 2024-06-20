const conn = require("../db/dbConnection");
const { validationResult } = require("express-validator");
const util = require("util"); // helper
exports.post_request= async (req, res) => {
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
exports.update_request = async (req, res) => {
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
exports.get_request = (req, res) => {
    conn.query("select * from warehouse_stock_request", (err, result, fields) => {
        res.send(result);
    });
}
exports.get_request_id = async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const request = await query("select * from warehouse_stock_request  where id = ?", [
        req.params.id,
    ]);
    if (!request[0]) {
        res.status(404).json({ ms: "request not found !" });
    }


    res.status(200).json(request[0]);
}
exports.get_request_spisk = async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    if (req.query.user_id) {
        const products = await query(`SELECT * FROM warehouse_stock_request WHERE user_id = ${req.query.user_id}`);
        res.status(200).json(products);
    } else {
        res.status(400).json({ message: "User ID is required." });
    }
}