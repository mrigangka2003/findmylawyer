import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  lawyerId: mongoose.Types.ObjectId;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);