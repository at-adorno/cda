import { PlanoCarreira } from '../types/PlanoCarreira';
import { PlanoCarreiraRepository } from '../repositories/PlanoCarreiraRepository';

const repositorio = new PlanoCarreiraRepository();

export class PlanoCarreiraService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const planoCarreira = await repositorio.buscarPorId(id);
    if (!planoCarreira) throw new Error('PLANO_CARREIRA_NAO_ENCONTRADO');
    return planoCarreira;
  }

  async criar(dados: PlanoCarreira) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<PlanoCarreira>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('PLANO_CARREIRA_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
