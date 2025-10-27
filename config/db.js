import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB: Ulanish muvaffaqiyatli");
  } catch (err) {
    console.error("MongoDB ulanishda xatolik:", err.message);
    process.exit(1);
  }
};
