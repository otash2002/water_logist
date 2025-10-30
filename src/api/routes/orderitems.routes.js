import express from 'express';
import OrderItemController from '../controllers/orderItems.controller.js';

const router = express.Router();

router.post('/', OrderItemController.create);
router.get('/', OrderItemController.list);
router.get('/:id', OrderItemController.getById);
router.put('/:id', OrderItemController.update);
router.delete('/:id', OrderItemController.remove);

export default router;
