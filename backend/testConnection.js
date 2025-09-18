import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  }
}

testDB();
