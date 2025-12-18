import { Perfil } from '../types/Perfil';
import { PerfilRepository } from '../repositories/PerfilRepository';

const repositorio = new PerfilRepository();

export class PerfilService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const perfil = await repositorio.buscarPorId(id);
    if (!perfil) throw new Error('PERFIL_NAO_ENCONTRADO');
    return perfil;
  }

  async criar(dados: Perfil) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Perfil>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('PERFIL_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}