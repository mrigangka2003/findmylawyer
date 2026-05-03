import mongoose, { Schema, Document } from "mongoose";

export interface ILawyerProfile extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string[]; // Keep for logic
  speciality: string; // Add for frontend compatibility
  description: string;
  degree: string;
  experience: string;
  fees: number;
  image: string;
  address: {
    line1: string;
    line2?: string;
  };
  experienceYears?: number;
  rating: number;
}

const lawyerProfileSchema = new Schema<ILawyerProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  specialization: {
    type: [String],
    required: true
  },
  speciality: {
    type: String,
    required: true,
    default: 'General'
  },
  description: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    default: 'LLB'
  },
  experience: {
    type: String,
    default: '0 years'
  },
  fees: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  address: {
    line1: { type: String, default: '' },
    line2: { type: String, default: '' }
  },
  experienceYears: Number,
  rating: {
    type: Number,
    default: 0
  }
});

export const LawyerProfile = mongoose.model<ILawyerProfile>("LawyerProfile", lawyerProfileSchema);