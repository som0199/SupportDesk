const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token by JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from DB
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("UnAuthorised Access");
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(404);
      throw new Error("UnAuthorised Access");
    }
  } else {
    res.status(400);
    throw new Error("UnAuthorised Access");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorised");
  }
});

module.exports = protect;
