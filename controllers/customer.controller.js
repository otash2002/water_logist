import Customer from '../models/customers.model.js';
import jwt from 'jsonwebtoken';
import { success, error } from '../utils/response.js';

const JWT_SECRET = process.env.JWT_SECRET || 'otash2002';

const CustomerController = {
	register: async (req, res) => {
		try {
			const payload = req.body;
			const existing = await Customer.findOne({ email: payload.email });
			if (existing) return error(res, 'Email already in use', 400);
			const customer = await Customer.create(payload);
			return success(res, { id: customer._id, email: customer.email }, 'Registered', 201);
		} catch (err) {
			return error(res, 'Registration failed', 500, err.message);
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const customer = await Customer.findOne({ email });
			if (!customer) return error(res, 'Invalid credentials', 401);
			const match = await customer.comparePassword(password);
			if (!match) return error(res, 'Invalid credentials', 401);
			const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, { expiresIn: '7d' });
			return success(res, { token, user: { id: customer._id, email: customer.email } }, 'Logged in');
		} catch (err) {
			return error(res, 'Login failed', 500, err.message);
		}
	},

	list: async (req, res) => {
		try {
			const items = await Customer.find().select('-password');
			return success(res, items);
		} catch (err) {
			return error(res, 'Fetch failed', 500, err.message);
		}
	},

	getById: async (req, res) => {
		try {
			const item = await Customer.findById(req.params.id).select('-password');
			if (!item) return error(res, 'Not found', 404);
			return success(res, item);
		} catch (err) {
			return error(res, 'Fetch failed', 500, err.message);
		}
	},

	update: async (req, res) => {
		try {
			const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
			if (!updated) return error(res, 'Not found', 404);
			return success(res, updated, 'Updated');
		} catch (err) {
			return error(res, 'Update failed', 500, err.message);
		}
	},

	remove: async (req, res) => {
		try {
			const removed = await Customer.findByIdAndDelete(req.params.id).select('-password');
			if (!removed) return error(res, 'Not found', 404);
			return success(res, removed, 'Deleted');
		} catch (err) {
			return error(res, 'Delete failed', 500, err.message);
		}
	}
};

export default CustomerController;
