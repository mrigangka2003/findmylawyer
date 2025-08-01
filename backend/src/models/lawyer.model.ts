import mongoose from "mongoose";

type IAddress = {
    line1: string;
    line2?: string;
};

type Ilawyer = {
    name: string;
    email: string;
    password: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    available: boolean;
    fees: number;
    address: IAddress;
    date: number;
    slots_booked: Object;
};

const addressSchema = new mongoose.Schema<IAddress>(
    {
        line1: { type: String, required: true },
        line2: { type: String },
    },
    { _id: false }
);

const lawyerSchema = new mongoose.Schema<Ilawyer>(
    {
        name: {
            type: String,
            required: true,
        },
        email:{ 
            type: String,
            required: true, 
            unique: true 
        },
        password: { 
            type: String,
            required: true 
        },
        image: { 
            type: String,
            required: true 
        },
        speciality: { 
            type: String,
            required: true 
        },
        degree: { 
            type: String,
            required: true 
        },
        experience: { 
            type: String,
            required: true 
        },
        about: { 
            type: String,
            required: true 
        },
        available: { 
            type: Boolean,
            required: true, default: true 
        },
        fees: { 
            type: Number,
            required: true 
        },
        address: { 
            type: addressSchema,
            required: true 
        },
        date: { 
            type: Number,
            required: true 
        },
        slots_booked: { 
            type: Object, 
            required: true, 
            default: {} 
        },
    },
    { minimize:false }
);

const lawyerModel = mongoose.models.Lawyer || mongoose.model<Ilawyer>("Lawyer", lawyerSchema);
export default lawyerModel;