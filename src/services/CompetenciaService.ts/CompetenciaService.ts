import { Competencia } from '../types/Competencia';
import { CompetenciaRepository } from '../repositories/CompetenciaRepository';

const repositorio = new CompetenciaRepository();

export class CompetenciaService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const competencia = await repositorio.buscarPorId(id);
    if (!competencia) throw new Error('COMPETENCIA_NAO_ENCONTRADA');
    return competencia;
  }

  async criar(dados: Competencia) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Competencia>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('COMPETENCIA_NAO_ENCONTRADA');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
