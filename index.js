const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const fs = require("fs")
const port = process.env.PORT || 7070

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static('uploads'))

// databse connection 
const dbURI = require('./DB/dbConnection')

// use static file presents in public folder..................
const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath));

//set view engine ex - (hbs, pug, ejs).....................
app.set('view engine', 'hbs');

// set the actual location of views folder.................
app.set('views', path.join(__dirname, "/templates/views"));

// importing routes from router folder
const indexRoutes           = require("./router/indexRoutes")
const stdUndertakingRoutes  = require("./router/studentUndertakingRoutes")
const feesUndertakingRoutes = require("./router/feesUndertakingRoutes")
const idcardRoutes          = require("./router/idCardRoutes"); 
// const upload                = require("./router/indexRoutes");
// const dbConection           = require("./DB/dbConnection");

//using routes here
app.use("/api/v1/",                     indexRoutes);
app.use("/api/v1/studentUndertaking",   stdUndertakingRoutes)
app.use("/api/v1/feesundertaking",      feesUndertakingRoutes)
app.use("/api/v1/idcard",               idcardRoutes)

// default route for if anyone want to access another page beyond the existing pages then this will open 404 page!
app.get("/*", (req, res) => {
    res.render('Invalid')
})
// Listening page on port
app.listen(port, (req, res) => {
    console.log(`Server is started click on http://localhost:${port}/api/v1/`)
});