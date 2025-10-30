import express from 'express';
import StaffController from '../controllers/staff.controller.js';

const router = express.Router();

router.post('/register', StaffController.register);
router.post('/login', StaffController.login);
router.get('/', StaffController.list);
router.get('/:id', StaffController.getById);
router.put('/:id', StaffController.update);
router.delete('/:id', StaffController.remove);

export default router;
