import { Router } from 'express';
import PontuacaoController from '../controllers/PontuacaoController';

const router = Router();

router.post('/', PontuacaoController.create);
router.get('/', PontuacaoController.findAll);
router.get('/:id', PontuacaoController.findById);
router.put('/:id', PontuacaoController.update);
router.delete('/:id', PontuacaoController.delete);

export default router;
