import mongoose from 'mongoose';
import { config } from '../config/config.js';

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    };

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(config.MONGO_URI, options);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Connection URI:', config.MONGO_URI.replace(/:[^:]*@/, ':***@')); // Mask password in logs
    process.exit(1);
  }
};

export default connectDB;
