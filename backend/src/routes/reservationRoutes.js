import { Router } from "express";
import { createReservation, getMyReservations, getAllReservations } from "../controllers/reservationController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = Router();

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.get("/", protect, admin, getAllReservations);

export default router;