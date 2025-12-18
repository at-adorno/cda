import { Router } from 'express';
import GestorController from '../controllers/GestorController';

const router = Router();

router.post('/', GestorController.create);
router.get('/', GestorController.findAll);
router.get('/:id', GestorController.findById);
router.put('/:id', GestorController.update);
router.delete('/:id', GestorController.delete);

export default router;
