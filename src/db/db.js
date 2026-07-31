const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to Database");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        process.exit(1); 
    }
}

module.exports = connectDB;