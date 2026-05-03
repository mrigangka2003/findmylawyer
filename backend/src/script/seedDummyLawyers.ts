import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { LawyerProfile } from "../models/lawyer.model";
import { config } from "dotenv";

config();

const dummyLawyers = [
  {
    name: "Eleanor Vance",
    email: "eleanor.vance@legalai.com",
    password: "password123",
    speciality: "Corporate Law",
    degree: "JD, Harvard Law School",
    experience: "15 years",
    fees: 5000,
    image: "https://i.pinimg.com/736x/8d/f3/d3/8df3d33bd82c7ce5ed55ed4b9d0e2e50.jpg",
    description: "Expert in mergers, acquisitions, and high-stakes corporate litigation.",
    address: { line1: "100 Wall Street", line2: "New York, NY" },
  },
  {
    name: "Marcus Thorne",
    email: "marcus.thorne@legalai.com",
    password: "password123",
    speciality: "Criminal Law",
    degree: "LLB, Oxford University",
    experience: "12 years",
    fees: 3500,
    image: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
    description: "Defending complex criminal cases with a 98% success rate in federal court.",
    address: { line1: "500 Justice Blvd", line2: "Chicago, IL" },
  },
  {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@legalai.com",
    password: "password123",
    speciality: "Family Law",
    degree: "JD, Yale Law School",
    experience: "8 years",
    fees: 2000,
    image: "https://i.pinimg.com/736x/6f/a7/46/6fa7462d7a224c30c88f117c2a71f08e.jpg",
    description: "Specializing in high-net-worth divorce and complex custody disputes.",
    address: { line1: "1200 Family Court Ave", line2: "Los Angeles, CA" },
  },
  {
    name: "David Chen",
    email: "david.chen@legalai.com",
    password: "password123",
    speciality: "Intellectual Property",
    degree: "JD, Stanford Law School",
    experience: "10 years",
    fees: 4000,
    image: "https://i.pinimg.com/736x/55/e8/37/55e837f525547cb07e0f80bc232ba3bb.jpg",
    description: "Protecting the innovations of tech startups and Fortune 500 companies alike.",
    address: { line1: "10 Silicon Way", line2: "San Francisco, CA" },
  },
];

async function seedLawyers() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas");

    for (const lawyer of dummyLawyers) {
      const existingUser = await User.findOne({ email: lawyer.email });
      if (existingUser) {
        console.log(`Lawyer ${lawyer.email} already exists. Skipping...`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(lawyer.password, 10);

      // Create User
      const newUser = await User.create({
        name: lawyer.name,
        email: lawyer.email,
        password: hashedPassword,
        role: "lawyer",
      });

      // Create LawyerProfile
      await LawyerProfile.create({
        userId: newUser._id,
        specialization: [lawyer.speciality],
        speciality: lawyer.speciality,
        description: lawyer.description,
        degree: lawyer.degree,
        experience: lawyer.experience,
        experienceYears: parseInt(lawyer.experience),
        fees: lawyer.fees,
        image: lawyer.image,
        address: lawyer.address,
        rating: 4.8,
      });

      console.log(`Created lawyer: ${lawyer.name}`);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedLawyers();
