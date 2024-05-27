const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401);
    throw new Error("Please fill all details");
  }

  //user already exists
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(402);
    throw new Error("User already Exists");
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });
  if (!user) {
    res.status(400);
    throw new Error("User cannot be registered!!");
  }
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("Please fill all details");
  }

  //find user exist with given email

  const user = await User.findOne({ email: email });
  // if (!user) {
  //   res.status(404);
  //   throw new Error("Invalid Credential");
  // }

  //if user exist and password matched
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid Credentials");
  }
});

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//protected Route
const protectedFunction = asyncHandler(async (req, res) => {
  res.json("i am Protected");
});

module.exports = { registerUser, loginUser, protectedFunction };
