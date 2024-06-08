const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLegth: 30,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
