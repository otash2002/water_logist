import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/', PaymentController.create);
router.get('/', PaymentController.list);
router.get('/:id', PaymentController.getById);

export default router;
