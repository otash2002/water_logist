import mongoose from 'mongoose';
import Payment from '../models/payment.model.js';
import Order from '../models/orders.model.js';
import { success, error } from '../utils/response.js';

const PaymentController = {
  create: async (req, res) => {
    try {
      const { order: orderId, amount, method, transactionId } = req.body;
      const ord = await Order.findById(orderId);
      if (!ord) return error(res, 'Order not found', 404);

      // basic amount check
      if (amount < ord.totalAmount) return error(res, 'Payment amount is less than order total', 400);

      // Use a mongoose session to ensure atomicity when supported
      let payment;
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        payment = await Payment.create(
          [{ order: orderId, amount, method, transactionId, status: 'completed' }],
          { session }
        );
        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' }, { session });
        await session.commitTransaction();
        session.endSession();
        payment = payment[0];
      } catch (txErr) {
        await session.abortTransaction();
        session.endSession();
        // fallback: try non-transactional write (best-effort)
        payment = await Payment.create({ order: orderId, amount, method, transactionId, status: 'completed' });
        ord.paymentStatus = 'paid';
        await ord.save();
      }

      return success(res, payment, 'Payment recorded', 201);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  list: async (req, res) => {
    try {
      const { page = 1, limit = 10, q, sort = '-createdAt' } = req.query;
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(100, parseInt(limit, 10) || 10);

      const filter = {};
      if (q) {
        const regex = new RegExp(q, 'i');
        if (mongoose.Types.ObjectId.isValid(q)) {
          filter.$or = [{ _id: q }, { order: q }];
        } else {
          // search by transactionId or method
          filter.$or = [{ transactionId: { $regex: regex } }, { method: { $regex: regex } }];
        }
      }

      const total = await Payment.countDocuments(filter);
      const items = await Payment.find(filter)
        .populate('order')
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return success(res, { total, page: pageNum, pages: Math.ceil(total / limitNum), items });
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  getById: async (req, res) => {
    try {
      const p = await Payment.findById(req.params.id).populate('order');
      if (!p) return error(res, 'Not found', 404);
      return success(res, p);
    } catch (err) {
      return error(res, err.message, 500);
    }
  }
};

export default PaymentController;
