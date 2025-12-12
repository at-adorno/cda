import { Avaliacao } from '../types/Avaliacao';

export class AvaliacaoRepository {
  private avaliacoes: Avaliacao[] = [];
  private nextId = 1;

  listar(): Avaliacao[] {
    return this.avaliacoes;
  }

  buscarPorId(id: number): Avaliacao | undefined {
    return this.avaliacoes.find(a => a.id === id);
  }

  buscarPorColaboradorId(colaboradorId: number): Avaliacao[] {
    return this.avaliacoes.filter(a => a.colaboradorId === colaboradorId);
  }

  buscarPorCicloId(cicloId: number): Avaliacao[] {
    return this.avaliacoes.filter(a => a.cicloId === cicloId);
  }

  criar(avaliacao: Avaliacao): Avaliacao {
    const novaAvaliacao = {
      ...avaliacao,
      id: this.nextId++,
      dataCriacao: new Date()
    };
    this.avaliacoes.push(novaAvaliacao);
    return novaAvaliacao;
  }

  atualizar(id: number, avaliacao: Partial<Avaliacao>): Avaliacao | undefined {
    const index = this.avaliacoes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.avaliacoes[index] = {
        ...this.avaliacoes[index],
        ...avaliacao,
        dataAtualizacao: new Date()
      };
      return this.avaliacoes[index];
    }
    return undefined;
  }

  remover(id: number): boolean {
    const index = this.avaliacoes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.avaliacoes.splice(index, 1);
      return true;
    }
    return false;
  }
}
