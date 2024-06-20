const { body, validationResult ,check} = require("express-validator");
exports.update_user_validation=[

    body("email").isEmail().withMessage("please enter a valid email!"),
    body("password")
      .isLength({ min: 8, max: 12 })
      .withMessage("password should be between (8-12) character"),
    body("status")
      .isBoolean()
      .withMessage("please enter a valid status ")
      .withMessage("status should be 1 or 0"),
    body("type")
      .isBoolean()
      .withMessage("please enter a valid status ")
      .withMessage("status should be 1 or 0"),
    body("phone")
      .isInt()
      .withMessage("please enter a valid description ")
      .isLength({ min: 11 })
      .withMessage("phone should be at lease 11 characters")


]
exports.post_user_validation=[
    body("email").isEmail().withMessage("please enter a valid email!"),
 
    body("password")
      .isLength({ min: 8, max: 12 })
      .withMessage("password should be between (8-12) character"),
    body("status")
      .isBoolean()
      .withMessage("status should be 1or0"),
    body("type")
      .isBoolean()
      .withMessage("type should be 1or0"),
    body("phone")
      .isLength({ min: 8, max: 12 })
      .withMessage("phone should be between (8-12) character")




]
exports.delete_user_validation=[
check("id").exists().withMessage('ID is required')
.isNumeric().withMessage('ID must be a number')
.isInt({ min: 1 }).withMessage('ID must be a positive integer')


]

exports.get_user_validation=[
    check("id").notEmpty().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')
    
    
    ]
