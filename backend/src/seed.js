import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Car from "./models/Car.js";
import Reservation from "./models/Reservation.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await Reservation.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      name: "Admin-MariCar",
      email: "admin@maricar.com",
      password: "Maricarmen26",
      role: "admin",
    });

    const user = await User.create({
      name: "Gaizka",
      email: "gaizka@test.com",
      password: "123456",
      role: "user",
    });

    const cars = await Car.create([
      { brand: "Toyota", model: "Corolla", category: "Sedan", pricePerDay: 45, available: true },
      { brand: "Honda", model: "Civic", category: "Sedan", pricePerDay: 50, available: true },
      { brand: "BMW", model: "X5", category: "SUV", pricePerDay: 120, available: true },
      { brand: "Audi", model: "A3", category: "Hatchback", pricePerDay: 70, available: true },
      { brand: "Tesla", model: "Lavadora", category: "Secadora", pricePerDay: 90, available: true },
      { brand: "Ford", model: "Mustang", category: "Coupe", pricePerDay: 110, available: true },
      { brand: "Volkswagen", model: "Golf", category: "Hatchback", pricePerDay: 55, available: true },
      { brand: "Hyundai", model: "Tucson", category: "SUV", pricePerDay: 65, available: true },
    ]);

    console.log(`Seed completed:`);
    console.log(`   - ${await User.countDocuments()} usuarios (admin + user)`);
    console.log(`   - ${await Car.countDocuments()} coches`);
    console.log(`   - ${await Reservation.countDocuments()} reservas`);

    process.exit(0);
  } catch (error) {
    console.error("Fail trying to apply the seed:", error.message);
    process.exit(1);
  }
};

seed();