import { Router } from 'express';
import { CompetenciaController } from '../controllers/CompetenciaController';

const roteador = Router();
const competencia = new CompetenciaController();

roteador.get('/', competencia.listarTodos.bind(competencia));
roteador.get('/:id', competencia.buscarPorId.bind(competencia));
roteador.post('/', competencia.criar.bind(competencia));
roteador.put('/:id', competencia.atualizar.bind(competencia));
roteador.delete('/:id', competencia.remover.bind(competencia));

export default roteador;
