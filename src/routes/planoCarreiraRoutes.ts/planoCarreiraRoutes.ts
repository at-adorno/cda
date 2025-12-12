import { Router } from 'express';
import { PlanoCarreiraController } from '../controllers/PlanoCarreiraController';

const roteador = Router();
const planoCarreira = new PlanoCarreiraController();

roteador.get('/', planoCarreira.listarTodos.bind(planoCarreira));
roteador.get('/:id', planoCarreira.buscarPorId.bind(planoCarreira));
roteador.post('/', planoCarreira.criar.bind(planoCarreira));
roteador.put('/:id', planoCarreira.atualizar.bind(planoCarreira));
roteador.delete('/:id', planoCarreira.remover.bind(planoCarreira));

export default roteador;
