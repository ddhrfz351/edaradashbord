const { body, validationResult ,check} = require("express-validator");
exports.post_request_validation=[
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
  body("status").isBoolean().withMessage("please enter a status"),
  body("history").isString().withMessage("please enter a history")
]
exports.update_request_validation=[
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
    .withMessage("history should be at least 5 characters")
]
exports.get_request_validation=[
    check("id").notEmpty().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')

]