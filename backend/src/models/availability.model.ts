import mongoose, { Document, Schema } from "mongoose";

export interface IAvailability extends Document {
    lawyerId: mongoose.Types.ObjectId;
    dayOfWeek: number; // 0 (Sun) to 6 (Sat)
    startTime: string; // "09:00"
    endTime: string;   // "17:00"
    slotDuration: number; // in minutes, e.g., 30
}

const AvailabilitySchema = new Schema<IAvailability>({
    lawyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true },
    slotDuration: { type: Number, default: 30 }
});

AvailabilitySchema.index({ lawyerId: 1, dayOfWeek: 1 });

export const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
