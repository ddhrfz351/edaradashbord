const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.login_validation = [
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("password")
        .isLength({ min: 8, max: 12 })
        .withMessage("password should be between (8-12) character")


]
exports.add_user_validation = [
    body("email").isEmail().withMessage("please enter a valid email!"),

    body("password")
        .isLength({ min: 8, max: 12 })
        .withMessage("password should be between (8-12) character"),
    body("type")
        .isBoolean()
        .withMessage("statu should be 1or0"),
    body("phone")
        .isLength({ min: 8, max: 12 })
        .withMessage("phone should be between (8-12) character")

]