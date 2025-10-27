import Address from '../models/address.model.js';
import { success, error } from '../utils/response.js';

const AddressController = {
	create: async (req, res) => {
		try {
			const item = await Address.create(req.body);
			return success(res, item, 'Created', 201);
		} catch (err) {
			return error(res, 'Create failed', 500, err.message);
		}
	},

	list: async (req, res) => {
		try {
			const items = await Address.find().select('-password');
			return success(res, items);
		} catch (err) {
			return error(res, 'Fetch failed', 500, err.message);
		}
	},

	getById: async (req, res) => {
		try {
			const item = await Address.findById(req.params.id).select('-password');
			if (!item) return error(res, 'Not found', 404);
			return success(res, item);
		} catch (err) {
			return error(res, 'Fetch failed', 500, err.message);
		}
	},

	update: async (req, res) => {
		try {
			const updated = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
			if (!updated) return error(res, 'Not found', 404);
			return success(res, updated, 'Updated');
		} catch (err) {
			return error(res, 'Update failed', 500, err.message);
		}
	},

	remove: async (req, res) => {
		try {
			const removed = await Address.findByIdAndDelete(req.params.id).select('-password');
			if (!removed) return error(res, 'Not found', 404);
			return success(res, removed, 'Deleted');
		} catch (err) {
			return error(res, 'Delete failed', 500, err.message);
		}
	}
};

export default AddressController;
