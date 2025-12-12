import { Router } from 'express';
import { NineBoxController } from '../controllers/NineBoxController';

const roteador = Router();
const nineBox = new NineBoxController();

roteador.get('/', nineBox.listarTodos.bind(nineBox));
roteador.get('/:id', nineBox.buscarPorId.bind(nineBox));
roteador.get('/colaborador/:colaboradorId', nineBox.buscarPorColaboradorId.bind(nineBox));
roteador.get('/ciclo/:cicloId', nineBox.buscarPorCicloId.bind(nineBox));
roteador.get('/quadrante/:quadrante', nineBox.buscarPorQuadrante.bind(nineBox));
roteador.post('/', nineBox.criar.bind(nineBox));
roteador.put('/:id', nineBox.atualizar.bind(nineBox));
roteador.delete('/:id', nineBox.remover.bind(nineBox));

export default roteador;
