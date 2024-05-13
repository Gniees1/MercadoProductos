const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require('express-validator');

// GET
router.get("/",(req,res)=>{
    res.render("contact");
});

//middleware de validación
const validationRules =[
  body("name", "Debe ingresar un nombre").exists().isLength({min: 2}),
  body("lastName", "Debe ingresar apellido").exists().isLength({min: 2}),
  body("email", "Debe ingresar un email valido").exists().isEmail(),
  body("message", "Mensaje debe contener entre 10 y 300 caracteres").exists().trim(" ").isLength({min:10,max:300}).trim()
]



//Las validaciones se aplicarán a través de un middleware que provee express-validator
//el middleware se insertará entre la ruta y el callback
router.post("/", validationRules, async (req,res)=>{
  //buscamos los errores de validación que pueda haber en la request y,
  // si los hay, los envolvemos en un objeto.
  const errors = validationResult(req);
  //validationResults() retorna un arreglo, ese arreglo no estará vació mientras haya errores
  //en los campos del formulario. Entonces, preguntamos si hay errores: si hay, renderizamos
  // el formulario con los msj de error. Si no, procedemos con el resto de la lógica programada
  //para enviar el email.
  console.log(req.body);
  if(!errors.isEmpty()){
    const formData = req.body;
    const arrWarnings = errors.array();
    res.render("contact", {arrWarnings, formData});
    
  }else {

    
    console.log(errors);
    const {name, lastName, email, message} =req.body;
    
    const emailMsg = {
      to:"atencionclientes@empresa.com",
      from: email,
      subject: "Mensaje desde formulario de contacto",
      html: `${name} ${lastName} dice: ${message}`,
    };
    
    
    
    const transport = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      // },
      host:"sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user:"894a96730e807d",
        pass:"7756c74413a178"
      },
      connectionTimeout: 10000, 
    });
    
    
    const sendMailStatus = await transport.sendMail(emailMsg);
    let sendMessage = "";
    if(sendMailStatus.rejected.length){
      sendMessage = "No pudimos enviar :( intente de nuevo";
    } else{
      sendMessage = "Mensaje enviado :)";
    }
    res.render("contact", {sendMessage});
    
  }
  });


module.exports = router;

