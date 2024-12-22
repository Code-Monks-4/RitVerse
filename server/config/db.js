const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://namo:namokar@cluster0.s81yo.mongodb.net/RitVerse");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;
