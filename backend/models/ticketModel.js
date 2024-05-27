const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please Fill Product Name"],
      enum: ["iPhone", "iPad", "iMac", "Mackbook", "iWatch"],
    },
    description: {
      type: String,
      required: [true, "Please Describe Your Issue!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "new", "close"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Ticket", ticketSchema);
