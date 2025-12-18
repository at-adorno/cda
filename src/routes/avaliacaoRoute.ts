import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController';

const router = Router();

router.post('/', AvaliacaoController.create);
router.get('/', AvaliacaoController.findAll);
router.get('/:id', AvaliacaoController.findById);
router.put('/:id', AvaliacaoController.update);
router.delete('/:id', AvaliacaoController.delete);

export default router;
