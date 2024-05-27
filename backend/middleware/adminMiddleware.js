const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAdmin = asyncHandler(async (req, res, next) => {
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
        throw new Error("Admin Access Only!!");
      }

      if (req.user.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error("Admin Access Only!!");
      }
    } catch (error) {
      console.log(error.message);
      res.status(404);
      throw new Error("Admin Access Only!!");
    }
  } else {
    res.status(400);
    throw new Error("Admin Access Only!!");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorised");
  }
});

module.exports = isAdmin;
