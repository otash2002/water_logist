import express from 'express';
import OrderItemController from '../controllers/orderItems.controller.js';
import { auth } from '../middlewares/jwt.js';
import { validate } from '../middlewares/validate.js';
import { orderItemSchema } from '../validations/schemas.js';

const router = express.Router();

router.post('/', auth, validate(orderItemSchema.create), OrderItemController.create);
router.get('/', auth, OrderItemController.list);
router.get('/:id', auth, OrderItemController.getById);
router.put('/:id', auth, validate(orderItemSchema.update), OrderItemController.update);
router.delete('/:id', auth, OrderItemController.remove);

export default router;
