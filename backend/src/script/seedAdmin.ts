import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { config } from "dotenv";

config();

async function seedAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas");

    const email = "mrigangkadatta15@gmail.com";
    const password = "password@123";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if(existingUser.role !== 'admin') {
            console.log(`User exists but is not an admin. Updating role to admin...`);
            existingUser.role = 'admin';
            existingUser.password = await bcrypt.hash(password, 10);
            await existingUser.save();
            console.log(`Admin user successfully updated: ${email}`);
        } else {
            console.log(`Admin user already exists: ${email}`);
        }
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    await User.create({
      name: "Mrigangka Datta",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Successfully created admin user: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exit(1);
  }
}

seedAdmin();
