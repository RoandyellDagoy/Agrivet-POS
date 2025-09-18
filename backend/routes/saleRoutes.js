// routes/saleRoutes.js
import express from "express";
import { createSale, listSales } from "../controllers/saleController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(protect, createSale).get(protect, admin, listSales);
export default router;
