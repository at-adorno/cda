import { Colaborador } from '../types/Colaborador';
import { colaboradorRepository } from '../repositories/ColaboradorRepository';

export const colaboradorService = {
  async listarTodos(): Promise<Colaborador[]> {
    return colaboradorRepository.listarTodos();
  },

  async obterPorId(id: number): Promise<Colaborador> {
    const colaborador = await colaboradorRepository.obterPorId(id);
    if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return colaborador;
  },

  async criar(dados: Colaborador): Promise<Colaborador> {
    const existente = dados.usuario_id ? await colaboradorRepository.obterPorUsuarioId(dados.usuario_id) : null;
    if (existente) throw new Error('USUARIO_JA_VINCULADO');
    return colaboradorRepository.criar(dados);
  },

  async atualizar(id: number, dados: Partial<Colaborador>): Promise<Colaborador> {
    const atualizado = await colaboradorRepository.atualizar(id, dados);
    if (!atualizado) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return atualizado;
  },

  async remover(id: number): Promise<void> {
    await colaboradorRepository.remover(id);
  },

  async obterUltimaAvaliacaoENineBox(id: number): Promise<any> {
    const resultado = await colaboradorRepository.obterUltimaAvaliacaoENineBox(id);
    if (!resultado) {
      throw new Error('AVALIACAO_NAO_ENCONTRADA');
    }
    return resultado;
  },
};