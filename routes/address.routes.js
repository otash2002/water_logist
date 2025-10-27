import express from 'express';
import AddressController from '../controllers/adress.controller.js';

const router = express.Router();

router.post('/', AddressController.create);
router.get('/', AddressController.list);
router.get('/:id', AddressController.getById);
router.put('/:id', AddressController.update);
router.delete('/:id', AddressController.remove);

export default router;
