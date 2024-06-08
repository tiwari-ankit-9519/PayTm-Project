const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected.....");
  } catch (error) {
    console.error("An error occured", error);
    process.exit(1);
  }
};

module.exports = connectDB;
