import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Error trying to connect:", error.message);
    process.exit(1);
  }
}