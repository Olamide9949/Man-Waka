const path = require('path');
const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

const mw = express();

// Storage connection starts here 
const mwdb = mysql.createConnection({
    host: process.env.STORAGE_HOST,
    user: process.env.ACCOUNT,
    password: process.env.SECRET,
    database: process.env.STORAGE,
    port: process.env.PASSAGE
});
mwdb.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Storage Attached...")
    }
})
// Storage Connection ends here

// Enabling Handlebars 
mw.set('view engine', 'hbs');
// Handlebars enabling ends here 

//Where additional files will be or should be located
const publicDirectory = path.join(__dirname, 'Admin')
mw.use(express.static(publicDirectory));
// console.log(__dirname)
//Additional file paths ends here


mw.get("/", (req, res) =>{
    // res.send("<h1>Man Waka Admin</h1>")
    res.render("login");
});

mw.listen(5000, ()=>{
    console.log("Yay! journey begins...");
})