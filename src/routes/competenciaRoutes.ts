import { Router } from 'express';
import CompetenciaController from '../controllers/CompetenciaController';

const router = Router();

router.get('/', CompetenciaController.list);
router.get('/:id', CompetenciaController.get);
router.post('/', CompetenciaController.create);
router.put('/:id', CompetenciaController.update);
router.delete('/:id', CompetenciaController.delete);

export default router;
