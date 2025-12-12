import { Router } from 'express';
import { AvaliacaoController } from '../controllers/AvaliacaoController';

const roteador = Router();
const avaliacao = new AvaliacaoController();

roteador.get('/', avaliacao.listarTodos.bind(avaliacao));
roteador.get('/:id', avaliacao.buscarPorId.bind(avaliacao));
roteador.get('/colaborador/:colaboradorId', avaliacao.buscarPorColaboradorId.bind(avaliacao));
roteador.get('/ciclo/:cicloId', avaliacao.buscarPorCicloId.bind(avaliacao));
roteador.post('/', avaliacao.criar.bind(avaliacao));
roteador.put('/:id', avaliacao.atualizar.bind(avaliacao));
roteador.delete('/:id', avaliacao.remover.bind(avaliacao));

export default roteador;
