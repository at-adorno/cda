import { Router } from 'express';
import CargoController from '../controllers/CargoController';

const router = Router();

router.get('/', CargoController.list);
router.get('/:id', CargoController.get);
router.post('/', CargoController.create);
router.put('/:id', CargoController.update);
router.delete('/:id', CargoController.delete);

export default router;
