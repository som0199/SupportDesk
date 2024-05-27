const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please fill email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
