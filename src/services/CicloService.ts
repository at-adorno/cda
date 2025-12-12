import CicloRepository from '../repositories/CicloRepository';
import { CicloDesempenho } from '.././types/CicloDesempenho/Ciclo';

class CicloService {
  private cicloRepository = new CicloRepository();

  listarTodos(): Ciclo[] {
    return this.cicloRepository.listar();
  }

  buscarPorId(id: number): Ciclo | undefined {
    return this.cicloRepository.buscarPorId(id);
  }

  criar(ciclo: Omit<Ciclo, 'id'>): Ciclo {
    return this.cicloRepository.criar(ciclo);
  }

  atualizar(id: number, ciclo: Partial<Omit<Ciclo, 'id'>>): Ciclo | undefined {
    return this.cicloRepository.atualizar(id, ciclo);
  }

  remover(id: number): boolean {
    return this.cicloRepository.remover(id);
  }
}

export default new CicloService();
