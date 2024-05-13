const pool = require("../db");
const md5 = require("md5");


const getUser = async (email, pass, usuario) =>{
    console.log("modelo de datos...")
    const query = "select * from users where email = ? and password = ?";
    const row = await pool.query(query, [email, md5(pass)]);
    return row[0];
}

module.exports =  {getUser} ;