import Order from '../models/orders.model.js';
import OrderItem from '../models/orderItems.model.js';
import Customer from '../models/customers.model.js';
import Address from '../models/address.model.js';
import { success, error } from '../utils/response.js';
import mongoose from 'mongoose';

const OrdersController = {
  create: async (req, res) => {
    try {
      const { customer, address, items = [], notes } = req.body;

      // validate refs
      const cust = await Customer.findById(customer);
      if (!cust) return error(res, 'Customer not found', 404);
      const addr = await Address.findById(address);
      if (!addr) return error(res, 'Address not found', 404);

      // create order in transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const order = await Order.create([{ customer, address, notes }], { session });

        // create order items and calculate total
        const createdItems = [];
        let totalAmount = 0;
        for (const it of items) {
          const payload = {
            order: order[0]._id,
            productName: it.productName,
            quantity: it.quantity,
            price: it.price,
            total: it.quantity * it.price
          };
          const oi = await OrderItem.create([payload], { session });
          createdItems.push(oi[0]._id);
          totalAmount += payload.total;
        }

        const updated = await Order.findByIdAndUpdate(order[0]._id, { items: createdItems, totalAmount }, { new: true, session });

        await session.commitTransaction();
        session.endSession();

        const populated = await Order.findById(updated._id).populate('items').populate('customer').populate('address');
        return success(res, populated, 'Order created', 201);
      } catch (txErr) {
        await session.abortTransaction();
        session.endSession();
        throw txErr;
      }
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  list: async (req, res) => {
    try {
      const { page = 1, limit = 10, q, status, sort = '-createdAt' } = req.query;
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(100, parseInt(limit, 10) || 10);

      const filter = {};
      if (status) filter.status = status;

      if (q) {
        const regex = new RegExp(q, 'i');
        const or = [];
        if (mongoose.Types.ObjectId.isValid(q)) {
          or.push({ _id: q });
        }
        or.push({ notes: { $regex: regex } });

        // try to find matching customers by name/email
        const matchingCustomers = await Customer.find({ $or: [{ name: regex }, { email: regex }] }).select('_id');
        if (matchingCustomers.length) {
          filter.customer = { $in: matchingCustomers.map(c => c._id) };
        } else {
          filter.$or = or;
        }
      }

      const total = await Order.countDocuments(filter);
      const items = await Order.find(filter)
        .populate('customer')
        .populate('address')
        .populate('items')
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return success(res, {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        items
      });
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  getById: async (req, res) => {
    try {
      const ord = await Order.findById(req.params.id).populate('customer').populate('address').populate('items');
      if (!ord) return error(res, 'Not found', 404);
      return success(res, ord);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  update: async (req, res) => {
    try {
      // allow updating status, staff assignment, notes
      const { status, staff, notes } = req.body;
      const updated = await Order.findByIdAndUpdate(req.params.id, { status, staff, notes }, { new: true }).populate('items');
      if (!updated) return error(res, 'Not found', 404);
      return success(res, updated, 'Updated');
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  remove: async (req, res) => {
    try {
      const removed = await Order.findByIdAndDelete(req.params.id);
      if (!removed) return error(res, 'Not found', 404);
      // optionally remove related items
      await OrderItem.deleteMany({ order: removed._id });
      return success(res, removed, 'Deleted');
    } catch (err) {
      return error(res, err.message, 500);
    }
  }
};

export default OrdersController;
