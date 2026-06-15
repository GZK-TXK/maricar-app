import { Router } from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/carController.js";
import { protect, admin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, admin, upload.single("image"), createCar);
router.put("/:id", protect, admin, upload.single("image"), updateCar);
router.delete("/:id", protect, admin, deleteCar);

export default router;