import { Cargo } from '../types/Cargo';

export class CargoRepository {
  private cargos: Cargo[] = [];
  private nextId = 1;

  listar(): Cargo[] {
    return this.cargos;
  }

  buscarPorId(id: number): Cargo | undefined {
    return this.cargos.find(c => c.id === id);
  }

  criar(cargo: Cargo): Cargo {
    const novoCargo = {
      ...cargo,
      id: this.nextId++,
      dataCriacao: new Date()
    };
    this.cargos.push(novoCargo);
    return novoCargo;
  }

  atualizar(id: number, cargo: Partial<Cargo>): Cargo | undefined {
    const index = this.cargos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cargos[index] = {
        ...this.cargos[index],
        ...cargo,
        dataAtualizacao: new Date()
      };
      return this.cargos[index];
    }
    return undefined;
  }

  remover(id: number): boolean {
    const index = this.cargos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cargos.splice(index, 1);
      return true;
    }
    return false;
  }
}
