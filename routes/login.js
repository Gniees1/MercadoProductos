const express = require("express");
const router = express.Router();
const mdlUsers = require("../models/users");
const products = require("../models/products");

router.get("/", (req,res) =>{
    res.render("login");
});

router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

router.post("/", async (req,res)=>{
    const {email, password} = req.body;
   const data = await mdlUsers.getUser(email, password);
   console.log(data);
    if(data != undefined) {
        req.session.user = email;
        const data = await products.getProducts();
        res.render("profile", { data: { email: email, products: data } });
    }else{
        const message= "Usuario o contraseña incorrectos";
        res.render("login", {message})
    }
})

module.exports = router;