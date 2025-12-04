import { Router } from 'express';
import { UsuarioController } from '../controlers/UsuarioController.js';

const router = Router();

router.post('/', UsuarioController.create);
router.get('/', UsuarioController.list);
router.get('/:id', UsuarioController.get);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.remove);

export default router;
