const router = require("express").Router();
const conn = require("../db/dbConnection");

const admin = require("../middleware/admin");
const { update_request_validation, post_request_validation, get_request_validation } = require("../validation/recuestvalidation");
const { post_request, get_request,get_request_spisk, update_request, get_request_id } = require("../servis/requestserves");



// MAKE request [ USER]
router.post("/"
  ,
  post_request_validation,
  post_request
);

// UPDATE product [ADMIN]
router.put(
  "/:id", // params
  admin,
  update_request_validation,
  update_request



);
router.get("/",
  admin,
  update_request_validation,
  get_request
);


router.get("/super", get_request_validation,get_request_spisk);


router.get("/:id", admin, get_request_validation,get_request_id );


module.exports = router;