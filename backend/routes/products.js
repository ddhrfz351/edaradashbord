const router = require("express").Router();
const { update_product_validation, post_product_validation, delete_product_validation, get_product_validation } = require("../validation/productvalidation");

const { post_product, get_product, delete_product , update_product, get_product_id ,get_spicfk_product } = require("../servis/productserves");
const admin = require("../middleware/admin");



// CREATE product [ADMIN]
router.post("/",

  admin,
  post_product_validation,
  post_product
 
);

// UPDATE product [ADMIN]
router.put(
  "/:id", // params
  admin,
  update_product_validation,
  update_product
  
);

// DELETE product [ADMIN]
router.delete(
  "/:id", // params
admin,
delete_product_validation,
delete_product
);
router.get("/",get_product_validation , get_product );

router.get("/super", get_product_validation ,get_spicfk_product);

// SHOW MOVIE [ADMIN, USER]
router.get("/:id", get_product_validation ,get_product_id );


module.exports = router;
