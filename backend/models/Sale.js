// models/Sale.js
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
