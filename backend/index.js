// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();
//const conn = require("../db/dbConnection");
// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./routes/Auth");
const products = require("./routes/products");
const users =require("./routes/users");
const werahouse =require("./routes/werahouse");
const requst =require("./routes/requst");
// ====================  RUN THE APP  ====================
app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/products", products);
app.use("/users", users);
app.use("/werahouse",werahouse);
app.use("/requst",requst);