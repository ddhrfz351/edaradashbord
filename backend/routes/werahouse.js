const router = require("express").Router();
const { update_warehouse_validation, post_warehouse_validation, delete_warehouse_validation, get_warehouse_validation } = require("../validation/wareousevalid");
const { post_warehouse, get_warehouse, delete_warehouse, update_warehouse, get_warehouse_id } = require("../servis/warehouseserves");

const admin = require("../middleware/admin");

const util = require("util"); // helper


// CREATE warehouse [ADMIN]
router.post("/",
 
  admin,
  post_warehouse_validation,
  post_warehouse
 
);

// UPDATE warehouse [ADMIN]
router.put(
  "/:id", // params
  admin,
  update_warehouse_validation,
  update_warehouse
  
  
 
  
);

// DELETE warehouse [ADMIN]
router.delete(
  "/:id", // params
admin,
delete_warehouse_validation,
delete_warehouse
  
);
//show all warehouse 
router.get("/", 
admin,
get_warehouse_validation,
get_warehouse
);


// SHOW warehouse [ADMIN, USER]
router.get("/:id",get_warehouse_validation,  get_warehouse_id );



module.exports = router;
