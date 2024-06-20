const { body, validationResult ,check} = require("express-validator");
exports.update_warehouse_validation=[
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
  .withMessage("please enter a valid  status ")
  

]
exports.post_warehouse_validation=[
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
        .withMessage("status should be 1or0")



]
exports.delete_warehouse_validation=[
    check("id").exists().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')
]
exports.get_warehouse_validation=[
    check("id").notEmpty().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')

]