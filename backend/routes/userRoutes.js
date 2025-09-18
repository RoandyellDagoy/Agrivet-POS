// routes/userRoutes.js
import express from "express";
import { registerUser, authUser, getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/", protect, admin, getUsers); // admin-only
export default router;
