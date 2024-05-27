const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please Fill Note"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Note", noteSchema);
