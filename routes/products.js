const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", async (req,res) =>{
    const data = await products.getProducts();
    res.render("listado", {data});
    
})
router.post("/carrito", (req, res) => {
  const arr1 = req.body.arr1; // Obtén arr1 de la solicitud POST
  req.session.arr1 = arr1; // Almacena arr1 en la sesión
  res.redirect("/contact"); // Redirige a la vista de contacto
});




module.exports = router;