import { CicloColaborador } from '../types/CicloColaborador';
import cicloColaboradorRepository from '../repositories/CicloColaboradorRepository';

class CicloColaboradorService {
  obterTodos(): CicloColaborador[] {
    return cicloColaboradorRepository.listar();
  }

  obterPorId(id: number): CicloColaborador | undefined {
    return cicloColaboradorRepository.buscarPorId(id);
  }

  obterPorCicloId(cicloId: number): CicloColaborador[] {
    return cicloColaboradorRepository.buscarPorCicloId(cicloId);
  }

  obterPorColaboradorId(colaboradorId: number): CicloColaborador[] {
    return cicloColaboradorRepository.buscarPorColaboradorId(colaboradorId);
  }

  criar(cicloColaborador: Omit<CicloColaborador, 'id' | 'criadoEm' | 'atualizadoEm'>): CicloColaborador {
    return cicloColaboradorRepository.criar(cicloColaborador);
  }

  atualizar(id: number, cicloColaborador: Partial<Omit<CicloColaborador, 'id' | 'criadoEm' | 'atualizadoEm'>>): CicloColaborador | undefined {
    return cicloColaboradorRepository.atualizar(id, cicloColaborador);
  }

  remover(id: number): boolean {
    return cicloColaboradorRepository.remover(id);
  }
}

export default new CicloColaboradorService();
