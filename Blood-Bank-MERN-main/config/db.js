const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO_URI from .env:", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
