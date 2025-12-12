import { Avaliacao } from '../types/Avaliacao';
import { AvaliacaoRepository } from '../repositories/AvaliacaoRepository';

const repositorio = new AvaliacaoRepository();

export class AvaliacaoService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const avaliacao = await repositorio.buscarPorId(id);
    if (!avaliacao) throw new Error('AVALIACAO_NAO_ENCONTRADA');
    return avaliacao;
  }

  async buscarPorColaboradorId(colaboradorId: number) {
    return repositorio.buscarPorColaboradorId(colaboradorId);
  }

  async buscarPorCicloId(cicloId: number) {
    return repositorio.buscarPorCicloId(cicloId);
  }

  async criar(dados: Avaliacao) {
    const media = (dados.desempenho + dados.comportamento + dados.pontualidade + dados.qualidade) / 4;
    return repositorio.criar({
      ...dados,
      media
    });
  }

  async atualizar(id: number, dados: Partial<Avaliacao>) {
    const avaliacao = await repositorio.buscarPorId(id);
    if (!avaliacao) throw new Error('AVALIACAO_NAO_ENCONTRADA');
    
    const dadosAtualizados = { ...dados };
    if (dados.desempenho || dados.comportamento || dados.pontualidade || dados.qualidade) {
      const d = dados.desempenho || avaliacao.desempenho;
      const c = dados.comportamento || avaliacao.comportamento;
      const p = dados.pontualidade || avaliacao.pontualidade;
      const q = dados.qualidade || avaliacao.qualidade;
      dadosAtualizados.media = (d + c + p + q) / 4;
    }

    const atualizado = await repositorio.atualizar(id, dadosAtualizados);
    if (!atualizado) throw new Error('AVALIACAO_NAO_ENCONTRADA');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
