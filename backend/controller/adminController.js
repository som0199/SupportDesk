const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");

const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  res.json(tickets);
});

module.exports = { getAllTickets };
