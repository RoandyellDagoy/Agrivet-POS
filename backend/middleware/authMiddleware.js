// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new Error("User not found");
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else {
    res.status(403);
    throw new Error("Admin resource. Access denied.");
  }
};
