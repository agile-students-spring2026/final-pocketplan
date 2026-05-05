import mongoose from 'mongoose';

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
      console.error('MONGODB_URI is required in production.');
      process.exit(1);
    }
    console.warn('MONGODB_URI not set — skipping DB connection (non-production mode).');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
}

export default connectDB;
