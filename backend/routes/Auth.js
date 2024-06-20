const router = require("express").Router();

const { login_validation, add_user_validation } = require("../validation/authvalidation");
const { login, add_user } = require("../servis/authserves");

const admin = require("../middleware/admin");

// LOGIN
router.post("/login", login_validation, login);



// REGISTRATION
router.post(
  "/register",
  admin,
  add_user_validation,
  add_user
);


module.exports = router;
