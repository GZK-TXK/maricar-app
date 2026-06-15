import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.get("/", (req, res) => {
  res.send("API MariCar working");
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server connected to port: ${PORT}`);
});