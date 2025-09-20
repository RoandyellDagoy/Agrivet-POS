// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "No token" });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if(!user) return res.status(401).json({error: "User not found"});

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      req.user = decoded; // attach user data to request
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

export const protect = authMiddleware();
export const admin = authMiddleware(["admin"]);