const conn = require("../db/dbConnection");
const {  validationResult } = require("express-validator");
const util = require("util"); // helper
exports.post_warehouse= async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    

      // 3- PREPARE warehouse OBJECT
      const warehouse = {
        user_id:req.body.user_id,
        name: req.body.name,
        location: req.body.location,
        status:req.body. status,

      
      };

      // 4 - INSERT warehouse INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into warehouse set ? ", warehouse);
      res.status(200).json({
        msg: "warehouse created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  exports.update_warehouse=async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF warehouse EXISTS OR NOT
      const warehouse = await query("select * from warehouse where id = ?", [
        req.params.id,
      ]);
      if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found !" });
      }

      // 3- PREPARE warehouse OBJECT
      const warehouseObj = {
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
      };

      
      // 4- UPDATE warehouse
      await query("update warehouse set ? where id = ?", [warehouseObj, warehouse[0].id]);

      res.status(200).json({
        msg: "warehouse updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  exports.delete_warehouse = async (req, res) => {
    try {
      // 1- CHECK IF warehouse EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const warehouse = await query("select * from warehouse where id = ?", [
        req.params.id,
      ]);
      if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found !" });
      }
  
      // 2- DELETE warehouse FROM DB
      await query("delete from warehouse where id = ?", [warehouse[0].id]);
  
      res.status(200).json({
        msg: "warehouse delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.get_warehouse=(req, res) => {
    conn.query("select * from warehouse", (err, result, fields) => {
        res.send(result);
    });
  }
  exports.get_warehouse_id=async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const warehouse = await query("select * from warehouse where id = ?", [
      req.params.id,
    ]);
    if (!warehouse[0]) {
      res.status(404).json({ ms: "warehouse not found !" });
    }
  
  
    res.status(200).json(warehouse[0]);
  }