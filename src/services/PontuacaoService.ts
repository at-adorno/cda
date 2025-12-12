import { Pontuacao } from '../types/Pontuacao';
import { PontuacaoRepository } from '../repositories/PontuacaoRepository';

const repositorio = new PontuacaoRepository();

export class PontuacaoService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const pontuacao = await repositorio.buscarPorId(id);
    if (!pontuacao) throw new Error('PONTUACAO_NAO_ENCONTRADA');
    return pontuacao;
  }

  async buscarPorColaboradorId(colaboradorId: number) {
    return repositorio.buscarPorColaboradorId(colaboradorId);
  }

  async buscarPorCicloId(cicloId: number) {
    return repositorio.buscarPorCicloId(cicloId);
  }

  async calcularTotalPorColaborador(colaboradorId: number) {
    return repositorio.calcularTotalPorColaborador(colaboradorId);
  }

  async criar(dados: Pontuacao) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Pontuacao>) {
    const pontuacao = await repositorio.buscarPorId(id);
    if (!pontuacao) throw new Error('PONTUACAO_NAO_ENCONTRADA');
    
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('PONTUACAO_NAO_ENCONTRADA');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
