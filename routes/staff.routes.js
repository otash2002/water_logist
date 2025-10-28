import express from 'express';
import StaffController from '../controllers/staff.controller.js';
import { auth, authRole } from '../middlewares/jwt.js';
import { validate } from '../middlewares/validate.js';
import { staffSchema } from '../validations/schemas.js';

const router = express.Router();

// Allow public registration/login but validate input
router.post('/register', validate(staffSchema.register), StaffController.register);
router.post('/login', validate(staffSchema.login), StaffController.login);

// Management routes: require admin or manager
router.get('/', auth, authRole(['admin','manager']), StaffController.list);
router.get('/:id', auth, authRole(['admin','manager']), StaffController.getById);
router.put('/:id', auth, authRole(['admin','manager']), validate(staffSchema.update), StaffController.update);
router.delete('/:id', auth, authRole(['admin','manager']), StaffController.remove);

export default router;
