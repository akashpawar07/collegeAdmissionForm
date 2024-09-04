const mongoose = require('mongoose');

// making connection with database
const dbConection = mongoose.connect(process.env.dbURL)
    .then(() => {
        console.log("Database is connected")
    }).catch((err) => {
        console.log("Something went wrong while connecting atlas database -> ", err)
    })
//exporting databse module
module.exports = dbConection;