import { Colaborador } from '../types/Colaborador';
import { colaboradorRepository } from '../repositories/ColaboradorRepository';

export const colaboradorService = {
  async listarTodos(): Promise<Colaborador[]> {
    return colaboradorRepository.findAll();
  },

  async obterPorId(id: number): Promise<Colaborador> {
    const colaborador = await colaboradorRepository.findById(id);
    if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return colaborador;
  },

  async criar(dados: Colaborador): Promise<Colaborador> {
    const existente = dados.usuario_id ? await colaboradorRepository.findByUsuarioId(dados.usuario_id) : null;
    if (existente) throw new Error('USUARIO_JA_VINCULADO');
    return colaboradorRepository.create(dados);
  },

  async atualizar(id: number, dados: Partial<Colaborador>): Promise<Colaborador> {
    const atualizado = await colaboradorRepository.update(id, dados);
    if (!atualizado) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return atualizado;
  },

  async remover(id: number): Promise<void> {
    await colaboradorRepository.delete(id);
  },
};