import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.CONNECTION_STRING;
    if (!mongoURI) {
      throw new Error('MONGO_URI not found in environment variables');
    }

    await mongoose.connect(mongoURI, {
      dbName: 'garage-sale', 
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
