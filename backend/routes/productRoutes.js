// routes/product.js
import express from "express";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all products
router.get("/", authMiddleware(["staff", "admin"]), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create product (admin only)
router.post("/", authMiddleware(["admin"]), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Record a sale
router.post("/sale", authMiddleware(["staff", "admin"]), async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const totalAmount = product.price * quantity;

  const sale = new Sale({
    product: product._id,
    quantity,
    totalAmount,
    soldBy: req.user.id
  });

  await sale.save();

  res.json({ message: "Sale recorded", sale });
});

// Get sales (admin only)
router.get("/sales", authMiddleware(["admin"]), async (req, res) => {
  const sales = await Sale.find().populate("product").populate("soldBy");
  res.json(sales);
});

export default router;
