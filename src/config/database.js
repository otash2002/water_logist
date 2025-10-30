import mongoose from 'mongoose';
import config from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      // useNewUrlParser/UnifiedTopology not needed in modern mongoose
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
