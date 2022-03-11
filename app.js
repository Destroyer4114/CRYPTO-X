const express =  require ("express");
const mysql = require("mysql");
const path = require("path");
const res = require("express/lib/response");

const app= express();
const dotenv= require('dotenv');
dotenv.config({path: './.env'});
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE, 


});
const publicDirectory = path.join(__dirname,'./public');

app.use(express.static(publicDirectory));

app.set('view engine','hbs');
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Mysql connected..")
    }
})



app.get("/",(req,res)=>{
    res.send("<h1>Home page</h1>")
})

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})
