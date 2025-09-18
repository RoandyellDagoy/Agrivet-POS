// models/Sale.js
import mongoose from "mongoose";

const saleProductSubSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },     // snapshot
  price: { type: Number, required: true },    // snapshot price
  quantity: { type: Number, required: true, min: 1 },
});

const saleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [saleProductSubSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ["cash", "credit_card", "paypal"], required: true },
  status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Sale", saleSchema);
