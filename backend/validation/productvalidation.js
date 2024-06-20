
const upload = require("../middleware/uploadImages");
const { body, validationResult ,check} = require("express-validator");
 exports.update_product_validation=[
    upload.single("photo"),
    body("name")
      .isString()
      .withMessage("please enter a valid product name"),
      
  
    body("description")
      .isString()
      .withMessage("please enter a valid description "),
      
      body("stock")
      .isInt()
      .withMessage("stock should be an integer")
    
]
exports.post_product_validation=[
    upload.single("photo"),
    body("name")
      .isString()
      .withMessage("please enter a valid  name")
      .isLength({ min: 5 })
      .withMessage("product name should be at lease 10 characters"),
      body("user_id")
      .isInt()
      .withMessage("please enter a valid  id"),
      body("warehouse_id")
    .isInt()
    .withMessage("please enter a valid  id"),
    body("description")
      .isString()
      .withMessage("please enter a valid description ")
      .isLength({ min: 4})
      .withMessage("description name should be at lease 20 characters"),
      
    body("stock")
    .isInt()
    .withMessage("please enter a valid stock ")
   
]
exports.delete_product_validation=[
    check("id").exists().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')



]
exports.get_product_validation=[

    check("id").notEmpty().withMessage('ID is required')
    .isNumeric().withMessage('ID must be a number')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer')

]