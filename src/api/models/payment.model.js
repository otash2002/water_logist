import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ['card', 'cash', 'transfer'], default: 'card' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    transactionId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
