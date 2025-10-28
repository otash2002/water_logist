import express from 'express';
import PaymentController from '../controllers/payment.controller.js';
import { auth } from '../middlewares/jwt.js';
import { validate } from '../middlewares/validate.js';
import { paymentSchema } from '../validations/schemas.js';

const router = express.Router();

router.post('/', auth, validate(paymentSchema.create), PaymentController.create);
router.get('/', auth, PaymentController.list);
router.get('/:id', auth, PaymentController.getById);

export default router;
