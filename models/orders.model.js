import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Adress', required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    totalAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
