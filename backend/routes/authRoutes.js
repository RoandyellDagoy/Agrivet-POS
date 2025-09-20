// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// REGISTER (for admin to create accounts)
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
