import express from 'express';
import OrdersController from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/', OrdersController.create);
router.get('/', OrdersController.list);
router.get('/:id', OrdersController.getById);
router.put('/:id', OrdersController.update);
router.delete('/:id', OrdersController.remove);

export default router;
