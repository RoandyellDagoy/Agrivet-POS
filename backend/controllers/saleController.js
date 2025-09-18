// controllers/saleController.js
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// POST /api/sales  (protected)
export const createSale = asyncHandler(async (req, res) => {
  const { products, paymentMethod } = req.body; // products: [{ product: id, quantity }]
  if (!products || products.length === 0) {
    res.status(400); throw new Error("No products in sale");
  }

  // Load product docs
  const productIds = products.map(p => p.product);
  const dbProducts = await Product.find({ _id: { $in: productIds } });

  // Validate and calculate total
  let total = 0;
  const saleProducts = products.map(item => {
    const dbP = dbProducts.find(p => p._id.equals(item.product));
    if (!dbP) throw new Error(`Product ${item.product} not found`);
    if (dbP.stock < item.quantity) throw new Error(`Insufficient stock for ${dbP.name}`);
    const snapshotPrice = dbP.price;
    total += snapshotPrice * item.quantity;
    return { product: dbP._id, name: dbP.name, price: snapshotPrice, quantity: item.quantity };
  });

  // Transaction: decrement stocks & create sale
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    for (const item of saleProducts) {
      const r = await Product.updateOne(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { session }
      );
      if (r.modifiedCount === 0) {
        throw new Error(`Concurrent stock issue for product ${item.product}`);
      }
    }

    const sale = await Sale.create(
      [{ user: req.user._id, products: saleProducts, totalAmount: total, paymentMethod, status: "completed" }],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(sale[0]);
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});

// GET /api/sales (admin or user-specific - here admin gets all)
export const listSales = asyncHandler(async (req, res) => {
  // simple admin-only list
  const sales = await Sale.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(sales);
});
