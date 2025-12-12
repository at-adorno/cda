import { Router } from 'express';
import { CicloController } from '../controllers/CicloController';

const roteador = Router();
const controlador = new CicloController();

roteador.get('/', controlador.obterTodos.bind(controlador));
roteador.get('/:id', controlador.obterPorId.bind(controlador));
roteador.post('/', controlador.criar.bind(controlador));
roteador.put('/:id', controlador.atualizar.bind(controlador));
roteador.delete('/:id', controlador.remover.bind(controlador));
roteador.patch('/:id/encerrar', controlador.encerrar.bind(controlador));

export default roteador;
