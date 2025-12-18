import { CicloDesempenho } from '../types/CicloDesempenho';
import { cicloDesempenhoRepository } from '../repositories/CicloDesempenhoRepository';

export const cicloDesempenhoService = {
  async listarTodos() {
    return cicloDesempenhoRepository.findAll();
  },

  async obterPorId(id: number) {
    const ciclo = await cicloDesempenhoRepository.findById(id);
    if (!ciclo) throw new Error('CICLO_NAO_ENCONTRADO');
    return ciclo;
  },

  async criar(dados: CicloDesempenho) {
    const existente = await cicloDesempenhoRepository.findByNome(dados.nome);
    if (existente) throw new Error('NOME_JA_EXISTE');
    return cicloDesempenhoRepository.create(dados);
  },

  async atualizar(id: number, patch: Partial<CicloDesempenho>) {
    const atualizado = await cicloDesempenhoRepository.update(id, patch);
    if (!atualizado) throw new Error('CICLO_NAO_ENCONTRADO');
    return atualizado;
  },

  async remover(id: number) {
    await cicloDesempenhoRepository.delete(id);
  },
};