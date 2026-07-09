import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'lawyer', 'admin','super-admin'],
    default: 'user',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  address: {
    line1: { type: String, default: '' },
    line2: { type: String, default: '' },
  },
  gender: {
    type: String,
    default: '',
  },
  dob: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  // Password reset fields
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;