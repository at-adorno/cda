import { Router } from 'express';
import cicloColaboradorController from '../controllers/CicloColaboradorController';

const roteador = Router();
const controlador = cicloColaboradorController;

roteador.get('/', controlador.obterTodos.bind(controlador));
roteador.get('/:id', controlador.obterPorId.bind(controlador));
roteador.get('/ciclo/:cicloId', controlador.obterPorCicloId.bind(controlador));
roteador.get('/colaborador/:colaboradorId', controlador.obterPorColaboradorId.bind(controlador));
roteador.post('/', controlador.criar.bind(controlador));
roteador.put('/:id', controlador.atualizar.bind(controlador));
roteador.delete('/:id', controlador.remover.bind(controlador));

export default roteador;
