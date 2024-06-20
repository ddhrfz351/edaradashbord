const router = require("express").Router();
const admin = require("../middleware/admin");

const { update_user_validation, post_user_validation, delete_user_validation, get_user_validation } = require("../validation/uservalidation");
const { post_user, get_user, delete_user, update_user, get_user_id } = require("../servis/userserves");


// add user
router.post(
  "/add",
  admin,
  post_user_validation
  ,
  post_user

);

// Get request => get all users
router.get("/",
  admin,
  get_user
);

// UPDATE user [ADMIN]
router.put(
  "/:id", // params
  admin,

  update_user_validation,
  update_user

);

// DELETE user [ADMIN]
router.delete(
  "/:id", // params
  admin,
  delete_user_validation,
  delete_user
);




router.get("/:id", admin, get_user_validation,
  get_user_id
);





module.exports = router;
