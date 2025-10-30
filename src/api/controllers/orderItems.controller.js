import OrderItem from '../models/orderItems.model.js';
import { success, error } from '../utils/response.js';

const OrderItemController = {
  create: async (req, res) => {
    try {
      const payload = req.body; // expects order, productName, quantity, price
      payload.total = payload.quantity * payload.price;
      const item = await OrderItem.create(payload);
      return success(res, item, 'Created', 201);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  list: async (req, res) => {
    try {
      const items = await OrderItem.find().sort('-createdAt');
      return success(res, items);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  getById: async (req, res) => {
    try {
      const item = await OrderItem.findById(req.params.id);
      if (!item) return error(res, 'Not found', 404);
      return success(res, item);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  update: async (req, res) => {
    try {
      const { productName, quantity, price } = req.body;
      const update = { productName, quantity, price };
      if (quantity && price) update.total = quantity * price;
      const updated = await OrderItem.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!updated) return error(res, 'Not found', 404);
      return success(res, updated, 'Updated');
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  remove: async (req, res) => {
    try {
      const removed = await OrderItem.findByIdAndDelete(req.params.id);
      if (!removed) return error(res, 'Not found', 404);
      return success(res, removed, 'Deleted');
    } catch (err) {
      return error(res, err.message, 500);
    }
  }
};

export default OrderItemController;
