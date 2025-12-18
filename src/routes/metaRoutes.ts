import { Router } from 'express';
import MetaController from '../controllers/MetaController';

const router = Router();

router.get('/', MetaController.list);
router.get('/:id', MetaController.get);
router.post('/', MetaController.create);
router.put('/:id', MetaController.update);
router.delete('/:id', MetaController.delete);

export default router;
