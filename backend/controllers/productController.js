// controllers/productController.js
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const product = await Product.create({ name, description, price, stock, category });
  res.status(201).json(product);
});

// GET /api/products
export const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET /api/products/:id
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404); throw new Error("Product not found");
  }
  res.json(product);
});

// PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

// DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  await product.remove();
  res.json({ message: "Product removed" });
});
