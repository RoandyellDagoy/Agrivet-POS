// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, enum: ["sack", "kilo"], required: true }, // type of unit
  price: { type: Number, required: true }, // price per unit
  stock: { type: Number, default: 0 } // optional, for inventory tracking
});

export default mongoose.model("Product", productSchema);
