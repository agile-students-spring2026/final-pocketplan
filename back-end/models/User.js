import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    classes: {
      type: [String],
      default: [],
    },
    commitments: {
      type: [String],
      default: [],
    },
    preferences: {
      taskUrgency: { type: Boolean, default: true },
      showDeadlines: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false },
      notifications: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);