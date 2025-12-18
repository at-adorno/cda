import { Router } from 'express';
import { usuarioController } from '../controllers/UsuarioController';

const router = Router();

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listarTodos);
router.get('/:id', usuarioController.obterPorId);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

export default router;