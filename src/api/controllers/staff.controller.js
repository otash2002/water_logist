import Staff from '../models/staff.model.js';
import jwt from 'jsonwebtoken';
import { success, error } from '../utils/response.js';

const JWT_SECRET = process.env.JWT_SECRET || 'otash2002';

const StaffController = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;
      const existing = await Staff.findOne({ email });
      if (existing) return error(res, 'Email already in use', 400);

      const staff = await Staff.create({ name, email, phone, password, role });
      const token = jwt.sign({ id: staff._id, email: staff.email, role: staff.role }, JWT_SECRET, { expiresIn: '7d' });
      return success(res, { token, user: { id: staff._id, name: staff.name, email: staff.email, role: staff.role } }, 'Staff created', 201);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const staff = await Staff.findOne({ email, isActive: true });
      if (!staff) return error(res, 'Invalid credentials', 401);
      const ok = await staff.comparePassword(password);
      if (!ok) return error(res, 'Invalid credentials', 401);
      const token = jwt.sign({ id: staff._id, email: staff.email, role: staff.role }, JWT_SECRET, { expiresIn: '7d' });
      return success(res, { token, user: { id: staff._id, name: staff.name, email: staff.email, role: staff.role } }, 'Login successful');
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  list: async (req, res) => {
    try {
      const list = await Staff.find({ isActive: true }).select('-password');
      return success(res, list);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  getById: async (req, res) => {
    try {
      const s = await Staff.findById(req.params.id).select('-password');
      if (!s) return error(res, 'Not found', 404);
      return success(res, s);
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  update: async (req, res) => {
    try {
      const { name, email, phone, role } = req.body;
      if (email) {
        const existing = await Staff.findOne({ email, _id: { $ne: req.params.id } });
        if (existing) return error(res, 'Email already in use', 400);
      }
      const updated = await Staff.findByIdAndUpdate(req.params.id, { name, email, phone, role }, { new: true }).select('-password');
      if (!updated) return error(res, 'Not found', 404);
      return success(res, updated, 'Updated');
    } catch (err) {
      return error(res, err.message, 500);
    }
  },

  remove: async (req, res) => {
    try {
      const removed = await Staff.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
      if (!removed) return error(res, 'Not found', 404);
      return success(res, null, 'Removed');
    } catch (err) {
      return error(res, err.message, 500);
    }
  }
};

export default StaffController;
