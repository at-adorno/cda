import { Meta } from '../types/Meta';
import { MetaRepository } from '../repositories/MetaRepository';

const repositorio = new MetaRepository();

export class MetaService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const meta = await repositorio.buscarPorId(id);
    if (!meta) throw new Error('META_NAO_ENCONTRADA');
    return meta;
  }

  async criar(dados: Meta) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Meta>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('META_NAO_ENCONTRADA');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
