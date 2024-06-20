const conn = require("../db/dbConnection");

const util = require("util"); // helper
const fs = require("fs"); // file system
const upload = require("../middleware/uploadImages");
const { log } = require("console");
exports.post_product = async (req, res) => {
    try {
       

        // 2- VALIDATE THE IMAGE
        if (!req.file) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Image is Required",
                    },
                ],
            });
        }

        // 3- PREPARE product OBJECT
        const product = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            user_id: req.body.user_id,
            warehouse_id: req.body.warehouse_id,
            photo: req.file.filename,
        };

        // 4 - INSERT product INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into product set ? ", product);
        res.status(200).json({
            msg: "product created successfully !",
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.update_product = async (req, res) => {
    console.log("start")
    try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
       console.log(query)

        // 2- CHECK IF product EXISTS OR NOT
        const product = await query("select * from product where id = ?", [
            req.params.id,
        ]);
        console.log(product)
        if (!product[0]) {
            res.status(404).json({ ms: "product not found !" });
        }

        // 3- PREPARE product OBJECT
        const productObj = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
        };
        console.log(productObj+"1")

        if (req.file) {
            productObj.photo = req.file.filename;
            fs.unlinkSync("./upload/" + product[0].photo); // delete old image
            
        }
        console.log(productObj+"2")

        // 4- UPDATE product
        await query("update product set ? where id = ?", [productObj, product[0].id]);

        res.status(200).json({
            msg: "product updated successfully",
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.delete_product = async (req, res) => {
    try {
        // 1- CHECK IF product  EXISTS OR NOT
        const query = util.promisify(conn.query).bind(conn);
        const product = await query("select * from product where id = ?", [
            req.params.id,
        ]);
        if (!product[0]) {
            res.status(404).json({ ms: "product not found !" });
        }
        // 2- REMOVE product IMAGE
        fs.unlinkSync("./upload/" + product[0].photo); // delete old image
        await query("delete from product where id = ?", [product[0].id]);
        res.status(200).json({
            msg: "product delete successfully",
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.get_product = async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
        // QUERY PARAMS
        search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
    }
    if (req.query.user_id) {
        // QUERY PARAMS
        const products = await query(`select * from product p join warehouse w on p.warehouse_id = w.id where w.user_id = ${req.query.user_id} ${search}`);
        products.map((product) => {
            product.photo = "http://" + req.hostname + ":4000/" + product.photo;
        });
        res.status(200).json(products);
    } else {
        const products = await query(`select * from product ${search}`);
        products.map((product) => {
            product.photo = "http://" + req.hostname + ":4000/" + product.photo;
        });
        res.status(200).json(products);
    }
}
exports.get_spicfk_product = async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
        // QUERY PARAMS
        search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
    }
    if (req.query.user_id) {
        // QUERY PARAMS
        const products = await query(`select * from product p join warehouse w on p.warehouse_id = w.id where w.user_id = ${req.query.user_id} ${search}`);
        products.map((product) => {
            product.photo = "http://" + req.hostname + ":4000/" + product.photo;
        });
        res.status(200).json(products);
    } else {
        const products = await query(`select * from product ${search}`);
        products.map((product) => {
            product.photo = "http://" + req.hostname + ":4000/" + product.photo;
        });
        res.status(200).json(products);
    }
}
exports.get_product_id = async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const product = await query("SELECT * FROM product WHERE id = ?", [req.params.id]);
    if (!product || !product[0]) {
        res.status(404).json({ message: "Product not found!" });
    } else {
        product[0].photo = "http://" + req.hostname + ":4000/" + product[0].photo;
        res.status(200).json(product[0]);
    }
}