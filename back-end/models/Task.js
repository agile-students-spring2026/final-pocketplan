import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      default: null,
    },
    hours: {
      type: Number,
      default: 0,
      min: 0,
    },
    minutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    effort: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', ''],
      default: '',
    },
    details: {
      type: String,
      default: '',
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);