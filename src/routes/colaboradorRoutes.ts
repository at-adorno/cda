import { Router } from 'express';
import { ColaboradorController } from '../controllers/ColaboradorController';

const roteador = Router();
const controlador = new ColaboradorController();

roteador.get('/', controlador.obterTodos.bind(controlador));
roteador.get('/:id', controlador.obterPorId.bind(controlador));
roteador.post('/', controlador.criar.bind(controlador));
roteador.put('/:id', controlador.atualizar.bind(controlador));
roteador.delete('/:id', controlador.remover.bind(controlador));

// Rota para obter a avaliação completa de um colaborador em um ciclo específico
roteador.get('/:id/avaliacoes/:cicloId/completa', controlador.obterAvaliacaoCompleta.bind(controlador));

// Rota para obter detalhes das competências de um colaborador em um ciclo específico
roteador.get('/:id/competencias/:cicloId/detalhes', controlador.obterCompetenciasDetalhes.bind(controlador));


export default roteador;
