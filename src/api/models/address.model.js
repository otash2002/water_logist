import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    street: {
      type: String,
      required: true,
      trim: true
    },
    building: {
      type: String,
      required: true,
      trim: true
    },
    apartment: {
      type: String,
      trim: true
    },
    floor: {
      type: Number,
      min: 0
    },
    notes: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

addressSchema.index({ customer: 1, street: 1, building: 1, apartment: 1 }, { unique: true });

export default mongoose.model("Address", addressSchema);
