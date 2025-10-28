import express from 'express';
import OrdersController from '../controllers/orders.controller.js';
import { auth } from '../middlewares/jwt.js';
import { validate } from '../middlewares/validate.js';
import { orderSchema } from '../validations/schemas.js';

const router = express.Router();

router.post('/', auth, validate(orderSchema.create), OrdersController.create);
router.get('/', auth, OrdersController.list);
router.get('/:id', auth, OrdersController.getById);
router.put('/:id', auth, validate(orderSchema.update), OrdersController.update);
router.delete('/:id', auth, OrdersController.remove);

export default router;
