import { Router } from 'express';
import { PontuacaoController } from '../controllers/PontuacaoController';

const roteador = Router();
const pontuacao = new PontuacaoController();

roteador.get('/', pontuacao.listarTodos.bind(pontuacao));
roteador.get('/:id', pontuacao.buscarPorId.bind(pontuacao));
roteador.get('/colaborador/:colaboradorId', pontuacao.buscarPorColaboradorId.bind(pontuacao));
roteador.get('/ciclo/:cicloId', pontuacao.buscarPorCicloId.bind(pontuacao));
roteador.get('/total/colaborador/:colaboradorId', pontuacao.calcularTotalPorColaborador.bind(pontuacao));
roteador.post('/', pontuacao.criar.bind(pontuacao));
roteador.put('/:id', pontuacao.atualizar.bind(pontuacao));
roteador.delete('/:id', pontuacao.remover.bind(pontuacao));

export default roteador;
