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
const connectDB = require("./DB/dbConnection"); 
connectDB();

// middlewares
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

// importing routes from router folder
const indexRoutes           = require("./router/indexRoutes")
const stdUndertakingRoutes  = require("./router/studentUndertakingRoutes")
const feesUndertakingRoutes = require("./router/feesUndertakingRoutes")
const idcardRoutes          = require("./router/idCardRoutes"); 
// const userSignup            = require("./router/signupRoutes");
const userlogin             = require("./router/loginRoutes");
const adminDashboard        = require("./router/adminDashboardRoutes");
const userLogout            = require("./router/logoutRoutes");


// middleware for authorized user only
const {loggedinUserOnly} = require('./middleware/authMiddlewares');



//using routes here
app.use("/",                        indexRoutes);
app.use("/studentUndertaking",      stdUndertakingRoutes);
app.use("/feesundertaking",         feesUndertakingRoutes);
app.use("/admin-dashboard",         loggedinUserOnly, adminDashboard);
app.use("/idcard",                  idcardRoutes);
// app.use("/signup",                  userSignup);
app.use("/login",                   userlogin);
app.use("/logout",                   userLogout)


app.get("/*", (req, res) => {
    res.render('404page')
})
// Listening page on port
app.listen(port, (req, res) => {
    console.log(`Server is started click on http://localhost:${port}`)
});