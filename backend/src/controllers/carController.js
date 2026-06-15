import Car from "../models/Car.js";

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ available: true });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Mari-Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const { brand, model, category, pricePerDay } = req.body;
    const imageUrl = req.file ? "/uploads/" + req.file.filename : "" ;
    const car = await Car.create({ brand, model, category, pricePerDay, imageUrl });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    if (req.file) {
      req.body.imageUrl = "/uploads/" + req.file.filename;
    }
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Mari-Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (car) {
      res.json({ message: "Mari-Car removed" });
    } else {
      res.status(404).json({ message: "Mari-Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};