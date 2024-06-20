const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE warehouse [ADMIN]
router.post(
  "",
  admin,
  body("user_id")
  .isInt()
  .withMessage("please enter a valid  id")
  
  .withMessage("enter id"),
  body("name")
    .isString()
    .withMessage("please enter a valid  name")
    .isLength({ min: 1})
    .withMessage("warehouse name should be at lease 10 characters"),

  body("location")
    .isString()
    .withMessage("please enter a valid location	 ")
    .isLength({ min:1})
    .withMessage("location	should be at lease 20 characters"),
    
    body("status")
    .isBoolean()
      .withMessage("status should be 1or0"),
  async (req, res) => {
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
);

// UPDATE warehouse [ADMIN]
router.put(
  "/:id", // params
  admin,
  
  body("name")
    .isString()
    .withMessage("please enter a valid warehouse name")
    .isLength({ min: 1 })
    .withMessage("warehouse name should be at lease 10 characters"),

    body("location")
    .isString()
    .withMessage("location should be between 8-12 characters"),

     body("status")
  .isBoolean()
  .withMessage("please enter a valid  status "),
  
 
  async (req, res) => {
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
);

// DELETE warehouse [ADMIN]
router.delete(
  "/:id", // params
admin,
  async (req, res) => {
    try {
      // 1- CHECK IF warehouse  EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const warehouse= await query("select * from warehouse where id = ?", [
        req.params.id,
      ]);
      if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found !" });
      }
     // delete old image
      await query("delete from warehouse where id = ?", [warehouse[0].id]);
      res.status(200).json({
        msg: "warehouse delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//show all warehouse 
router.get("/", 
admin,
(req, res) => {
  conn.query("select * from warehouse", (err, result, fields) => {
      res.send(result);
  });
});
// LIST & SEARCH [ADMIN, USER]
router.get("/", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or status LIKE '%${req.query.search}%'`;
  }
  const warehouses = await query(`select * from warehouse ${search}`);
  warehouses.map((warehouse) => {
   
  });
  res.status(200).json(warehouses);
});

// SHOW warehouse [ADMIN, USER]
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const warehouse = await query("select * from warehouse where id = ?", [
    req.params.id,
  ]);
  if (!warehouse[0]) {
    res.status(404).json({ ms: "warehouse not found !" });
  }


  res.status(200).json(warehouse[0]);
});



module.exports = router;
