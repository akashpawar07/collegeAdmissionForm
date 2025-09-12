const express = require("express"); 
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const fs = require("fs")
const port = process.env.PORT || 7070


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static('uploads'))



// use static file presents in public folder..................
const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath));

//set view engine ex - (hbs, pug, ejs).....................
app.set('view engine', 'hbs');

// set the actual location of views folder.................
app.set('views', path.join(__dirname, "/templates/views"));

// databse connection 
const dbURI = require('./DB/dbConnection')

// importing routes from router folder
const indexRoutes           = require("./router/indexRoutes")
const stdUndertakingRoutes  = require("./router/studentUndertakingRoutes")
const feesUndertakingRoutes = require("./router/feesUndertakingRoutes")
const idcardRoutes          = require("./router/idCardRoutes"); 
const userSignup            = require("./router/signupRoutes");
const userlogin             = require("./router/loginRoutes");
// const userLogout            = require("./route/userLogout");


// middleware for authorized user only
// const {loggedinUserOnly} = require('./middleware/authMiddlewares')


//using routes here
app.use("/",                        indexRoutes);
app.use("/studentUndertaking",      stdUndertakingRoutes)
app.use("/feesundertaking",         feesUndertakingRoutes)
app.use("/idcard",                  idcardRoutes)
app.use("/signup",                  userSignup)
app.use("/login",                   userlogin)
// app.use("/lgout",                   userLogout)


// default route for if anyone want to access another page beyond the existing pages then this will open 404 page!
app.get("/*", (req, res) => {
    res.render('Invalid')
})
// Listening page on port
app.listen(port, (req, res) => {
    console.log(`Server is started click on http://localhost:${port}`)
});