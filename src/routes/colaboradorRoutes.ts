import { Router } from 'express';
import { ColaboradorController } from '../controllers/ColaboradorController';

const router = Router();

router.get('/', ColaboradorController.listarTodos);
router.get('/:id', ColaboradorController.obterPorId);
router.post('/', ColaboradorController.criar);
router.put('/:id', ColaboradorController.atualizar);
router.delete('/:id', ColaboradorController.remover);

export default router;