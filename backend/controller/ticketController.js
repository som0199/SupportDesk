const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const getTickets = asyncHandler(async (req, res) => {
  //get user using ID in req.user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const tickets = await Ticket.find({ user: req.user._id.toString() });

  if (!tickets) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  //get user using ID in req.user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //find single ticket
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  res.status(200).json(ticket);
});

const addTicket = asyncHandler(async (req, res) => {
  //get user using ID in req.user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const { product, description } = req.body;

  if (!product || !description) {
    res.status(401);
    throw new Error("Please fill all details");
  }

  const newTicket = await Ticket.create({
    user: req.user._id,
    product,
    description,
    status: "open",
  });
  if (!newTicket) {
    res.status(400);
    throw new Error("Error in Creating Ticket");
  }
  res.status(201).json(newTicket);
});

const updateTicket = asyncHandler(async (req, res) => {
  //get user using ID in req.user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedTicket) {
    res.status(400);
    throw new Error("Error in updating Ticket");
  }
  res.status(201).json(updatedTicket);
});
module.exports = { getTickets, getTicket, addTicket, updateTicket };
