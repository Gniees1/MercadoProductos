
const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", async (req, res) =>{
    const email = req.session.user;
    const data = await products.getProducts();
    res.render("profile", { data: { email: email, products: data } });
});

router.get("/handleDelete/:id/:name", (req, res) => {
    const { id, name } = req.params;
    res.render("confirma", { id, name });
});

router.get("/delete/:id", async (req, res) =>{
    const productId = req.params.id;
    await products.deleteProduct(productId);
    res.redirect("/profile");
});

router.get("/addItem", (req, res) => {
    res.render("addItem");
});

router.post("/addItem", (req, res) => {
    const { name, stock, prize } = req.body;
    const newProduct = { name, stock, prize };
    products.addProduct(newProduct);
    res.redirect("/profile");
});

router.get("/editItem/:id", async (req, res) => {
    const row = await products.getProductById(req.params.id);
    const product1 = {
        id: row[0].id,
        name: row[0].name,
        stock: row[0].Stock,
        prize: row[0].Prize
    };
    await res.render("editItem", { product1 });
});

router.post("/editItem", async (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name,
        stock: req.body.stock,
        prize: req.body.prize
    };
    await products.modifyProduct(data, req.body.id);
    res.redirect("/profile");
});

module.exports = router;
