import { Router } from 'express';
import { cicloDesempenhoController } from '../controllers/CicloDesempenhoController';

const router = Router();

router.get('/', cicloDesempenhoController.listarTodos);
router.get('/:id', cicloDesempenhoController.obterPorId);
router.post('/', cicloDesempenhoController.criar);
router.put('/:id', cicloDesempenhoController.atualizar);
router.delete('/:id', cicloDesempenhoController.remover);

export default router;
