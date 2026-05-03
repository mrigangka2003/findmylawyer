import mongoose, { Schema, Document } from "mongoose";

export interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bookingId?: mongoose.Types.ObjectId;
  title: string;
  fileUrl: string;
  fileType: string;
  status: 'pending' | 'reviewed' | 'rejected';
  createdAt: Date;
}

const documentSchema = new Schema<IDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: "Booking"
  },
  title: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const LegalDocument = mongoose.model<IDocument>("LegalDocument", documentSchema);
