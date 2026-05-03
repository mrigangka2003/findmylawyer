import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string; // 'admin', 'lawyer', 'user'
  permissions: string[]; // ['booking:create', 'ai:access', etc.]
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'lawyer', 'user']
  },
  permissions: {
    type: [String],
    required: true
  }
});

export const Role = mongoose.model<IRole>("Role", roleSchema);
