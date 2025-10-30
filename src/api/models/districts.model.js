import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0
    },
    boundaries: {
      type: String,
      trim: true,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("District", districtSchema);
