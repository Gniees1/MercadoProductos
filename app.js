const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const session = require("express-session");
require("dotenv").config();



//creamos una constante y le asignamos el modulo
const routeIndex = require("./routes/index");
const routeContact = require("./routes/contact");
const routeLogin = require("./routes/login");
const routeProfile = require("./routes/profile");
const routeListado = require("./routes/products");

const hbs = require("express-handlebars");


//creamos nuestra app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
//configuramos express-handlebars
app.engine(".hbs", hbs.engine( {extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");
// app.set("views", path.join(__dirname, "views"));

//configuramos express-session
app.use(
    session({
        secret: "openSesam3@",
        resave: false,
        saveUninitialized: true
    })
)

//creamos el middleware que verifica los intentos de ingreso a la ruta profile
//en caso de intentar entrar directamente, siempre se correrá este middleware.
//solo podremos acceder si req.session.user (que se setea con un valor en caso de login positivo)
//luego, si salimos de "profile", podremos volver a ingresar sin loguear nuevamente.
const isAuth = async(req,res,next) =>{
    if(req.session.user){
        next();
    }else{
        res.render("noAuth");
    }
}


//habilitamos lectura de info de formularios que no viaja en la url y por lo tanto es mas segura
app.use(express.urlencoded({extended: false}));

app.use("/", routeIndex);
app.use("/contact", routeContact);
app.use("/login", routeLogin );
app.use("/profile", isAuth, routeProfile);
app.use("/products", routeListado);

//lanzamos la app en el puerto
app.listen(PORT, (err)=>{
    err? console.log("Crash, Boom, Bang") : console.log(`Server running on PORT ${PORT}`);
});




