import express from 'express';
import CustomerController from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/register', CustomerController.register);
router.post('/login', CustomerController.login);
router.get('/', CustomerController.list);
router.get('/:id', CustomerController.getById);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.remove);

export default router;
