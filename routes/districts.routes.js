import express from 'express';
import DistrictsController from '../controllers/districts.controller.js';

const router = express.Router();

router.post('/', DistrictsController.create);
router.get('/', DistrictsController.list);
router.get('/:id', DistrictsController.getById);
router.put('/:id', DistrictsController.update);
router.delete('/:id', DistrictsController.remove);

export default router;
