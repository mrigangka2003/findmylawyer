import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  lawyerId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Review = mongoose.model<IReview>("Review", reviewSchema);
