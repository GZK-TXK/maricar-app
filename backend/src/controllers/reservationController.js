import Reservation from "../models/Reservation.js";
import Car from "../models/Car.js";

export const createReservation = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (!car.available) {
      return res.status(400).json({ message: "Car not available" });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    const reservation = await Reservation.create({
      user: req.user._id,
      car: carId,
      startDate,
      endDate,
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