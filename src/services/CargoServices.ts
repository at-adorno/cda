import { Cargo } from '../types/Cargo';
import { CargoRepository } from '../repositories/CargoRepository';

const repositorio = new CargoRepository();

export class CargoService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const cargo = await repositorio.buscarPorId(id);
    if (!cargo) throw new Error('CARGO_NAO_ENCONTRADO');
    return cargo;
  }

  async criar(dados: Cargo) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Cargo>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('CARGO_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
