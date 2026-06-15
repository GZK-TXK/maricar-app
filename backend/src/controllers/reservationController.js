import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Car from "../models/Car.js";

export const createReservation = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return res.status(400).json({ message: "Start date cannot be in the past" });
    }

    if (end <= start) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Mari-Car not found" });
    }
    if (!car.available) {
      return res.status(400).json({ message: "Mari-Car not available" });
    }

    const overlapping = await Reservation.findOne({
      car: carId,
      status: "active",
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (overlapping) {
      return res.status(400).json({ message: "Car already reserved for those dates" });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return res.status(400).json({ message: "Invalid rental period" });
    }

    const totalPrice = days * car.pricePerDay;

    const reservation = await Reservation.create({
      user: req.user._id,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    car.available = false;
    await car.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("car", "brand model imageUrl pricePerDay")
      .sort("-createdAt");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("car", "brand model")
      .sort("-createdAt");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};