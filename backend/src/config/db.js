import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Error trying to connect:", error.message);
    process.exit(1);
  }
}