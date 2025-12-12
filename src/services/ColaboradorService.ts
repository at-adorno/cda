import { Colaborador } from '../types/Colaborador';
import { ColaboradorRepository } from '../repositories/ColaboradorRepository';

const repositorio = new ColaboradorRepository();

export class ColaboradorService {
  async listarTodos() {
    return repositorio.listarTodos();
  }

  async buscarPorId(id: number) {
    const colaborador = await repositorio.buscarPorId(id);
    if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return colaborador;
  }

  async criar(dados: Colaborador) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Colaborador>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    await repositorio.remover(id);
  }
}
