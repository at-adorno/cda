import { Router } from 'express';
import PlanoCarreiraController from '../controllers/PlanoCarreiraController';

const router = Router();

router.get('/', PlanoCarreiraController.list);
router.get('/:id', PlanoCarreiraController.get);
router.post('/', PlanoCarreiraController.create);
router.put('/:id', PlanoCarreiraController.update);
router.delete('/:id', PlanoCarreiraController.delete);

export default router;
