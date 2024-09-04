const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const fs = require("fs")

const port = process.env.PORT || 7000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static('uploads'))



//DB connection........
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Database established Successful ✅")
    }).catch((err) => {
        console.log("Something went wrong while connecting Atlas Database -> ", err)
    })

// use static file presents in public folder..................
const staticPath = path.join(__dirname, "/public")
app.use(express.static(staticPath));

//set view engine ex - (hbs, pug, ejs).....................
app.set('view engine', 'hbs');

// set the actual location of views folder.................
app.set('views', path.join(__dirname, "/templates/views"));


// Routing
const indexRoutes = require("./router/indexRoutes")
const secondPageRoutes = require("./router/secondPageRoutes")
const thirdPageRoutes = require("./router/thirdPageRoutes")
const lastPageRoutes = require("./router/lastPageRoutes"); 
const upload = require("./router/indexRoutes");



app.use("/", indexRoutes);
app.use("/secondPage", secondPageRoutes)
app.use("/thirdPage", thirdPageRoutes)
app.use("/lastPage", lastPageRoutes)

app.get("/*", (req, res) => {
    res.render('Invalid')
})

app.listen(port, (req, res) => {
    console.log(`Server is started click on http://localhost:${port}`)
});