import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { lawyerModel } from "../models";

const addLawyer = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
        } = req.body;

        const imageFile = req.file;

        /* ---------- Validation ---------- */
        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address ||
            !imageFile
        ) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        /* ---------- Check duplicate email ---------- */
        const exists = await lawyerModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        /* ---------- Hash password ---------- */
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        /* ---------- Upload image ---------- */
        const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "lawyers",
        });
        const imageUrl = uploadResult.secure_url;

        /* ---------- Create lawyer ---------- */
        const lawyerData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address,
            available: true,
            date: Date.now(),
            slots_booked: {},
        };

        const newLawyer = new lawyerModel(lawyerData);
        await newLawyer.save();

        res.status(201).json({ success: true, message: "Lawyer added", data: newLawyer });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { addLawyer };