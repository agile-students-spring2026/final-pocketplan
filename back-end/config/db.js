import mongoose from 'mongoose';

async function connectDB() {
  try {
    console.log('URI loaded:', !!process.env.MONGODB_URI);
    console.log(
      'Using URI:',
      process.env.MONGODB_URI?.replace(/:(.*?)@/, ':***@')
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error full object:', error);
    console.error('MongoDB connection error message:', error.message);
    process.exit(1);
  }
}

export default connectDB;