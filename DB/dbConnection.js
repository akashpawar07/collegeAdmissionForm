const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Database is connected successfully");
    } catch (err) {
        console.log("Something went wrong while connecting to the database -> ", err);
        
        process.exit(1); 
    }
};

// 2. Export the function
module.exports = connectDB;