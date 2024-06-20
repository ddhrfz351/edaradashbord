const conn = require("../db/dbConnection");
const util = require("util"); // helper

const authorized = async (req, res, next) => {
  const query = util.promisify(conn.query).bind(conn);
  const { email } = req.headers;
  const user = await query("select * from users where email = ?", [email]);
  if (user[0]&&user[0].type=="0") {
    res.locals.user = user[0];
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};

module.exports = authorized;
