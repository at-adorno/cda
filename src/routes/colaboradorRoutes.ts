import { Router } from 'express';
import ColaboradorController from '../controlers/colaboradorController.ts';

const router = Router();

router.post('/', ColaboradorController.criarColaborador);
router.get('/', ColaboradorController.listarColaboradores);
router.get('/:id_colaborador', ColaboradorController.buscarColaboradorPorId);
router.put('/:id_colaborador', ColaboradorController.atualizarColaborador);

export default router;
