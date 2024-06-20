const conn = require("../db/dbConnection");
const {  validationResult } = require("express-validator");
const util = require("util"); // helper
const bcrypt = require('bcrypt');

exports.post_user=  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const checkEmailExists = await query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already exists !",
            },
          ],
        });
      }

      // 3- PREPARE OBJECT USER TO -> SAVE
      const userData = {

        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone
      };

      // 4- INSERT USER OBJECT INTO DB
      await query("insert into users set ? ", userData);
      delete userData.password;
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
  exports.get_user=  (req, res) => {
    conn.query("select * from users", (err, result, fields) => {
      res.send(result);
    });
  }
   exports.delete_user=async (req, res) => {
    try {
      // 1- CHECK IF product  EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "product not found !" });
      }


      await query("delete from users where id = ?", [user[0].id]);
      res.status(200).json({
        msg: "product delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  exports.update_user=async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // 2- CHECK IF user EXISTS OR NOT
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        return res.status(404).json({ ms: "user not found !" });
      }
  
      // 3- PREPARE user OBJECT
      const userObj = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone,
      };
  
      // 4- UPDATE user
      await query("update users set ? where id = ?", [userObj, user[0].id]);
  
      res.status(200).json({
        msg: "user updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
  
  exports.get_user_id= async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    try {
      const user = await query("select * from users where id = ?", [req.params.id]);
      if (!user[0]) {
        res.status(404).json({ ms: "User not found!" });
        return;
      }
      res.status(200).json(user[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ ms: "Internal server error" });
    }
  }