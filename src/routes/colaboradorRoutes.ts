import { Router } from 'express';
import { ColaboradorController } from '../controllers/ColaboradorController';

const roteador = Router();
const controlador = new ColaboradorController();

roteador.get('/', controlador.obterTodos.bind(controlador));
roteador.get('/:id', controlador.obterPorId.bind(controlador));
roteador.post('/', controlador.criar.bind(controlador));
roteador.put('/:id', controlador.atualizar.bind(controlador));
roteador.delete('/:id', controlador.remover.bind(controlador));

export default roteador;
