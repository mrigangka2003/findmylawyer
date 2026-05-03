import mongoose, { Schema, Document } from "mongoose";

export interface ILawyerProfile extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string[];
  description: string;
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
  description: {
    type: String,
    required: true
  },
  experienceYears: Number,
  rating: {
    type: Number,
    default: 0
  }
});

export const LawyerProfile = mongoose.model<ILawyerProfile>("LawyerProfile", lawyerProfileSchema);