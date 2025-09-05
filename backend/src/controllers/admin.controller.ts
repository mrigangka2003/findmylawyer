import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken'

import { lawyerModel } from "../models";
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from "../constants";

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


        let parsedAddress = address;
        try {
            if (typeof address === "string") {
                parsedAddress = JSON.parse(address);
            }
        } catch (err) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
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
            address:parsedAddress,
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

//api for admin login

const loginAdmin = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body ;

        if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD ){
            
            const token = jwt.sign(email+password,JWT_SECRET);
            res.json({success:true,token});

        }else{
            res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to get all lawyers list

const allLawyers = async(req:Request,res:Response)=>{
    try {
        const lawyers = await lawyerModel.find({}).select('-password')
        res.json({success:true,lawyers})

    } catch (error:any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addLawyer ,loginAdmin, allLawyers };