const asyncHandler = require("express-async-handler");
const User = require("../models/noteModel");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const notes = await Note.find({ ticket: req.params._id });

  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found!!!");
  }
  res.status(200).json(notes);
});

const addNote = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    res.status(401);
    throw new Error("Kindly Describe your Note");
  }

  //1.Get user by Id from Req.user or from JWT token
  //2. Get Ticket Id from Params
  //3. create Note
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    description: description,
  });

  res.status(201).json(note);
});

module.exports = { getNotes, addNote };
