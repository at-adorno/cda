import { Pontuacao } from '../types/Pontuacao';

export class PontuacaoRepository {
  private pontuacoes: Pontuacao[] = [];
  private nextId = 1;

  listar(): Pontuacao[] {
    return this.pontuacoes;
  }

  buscarPorId(id: number): Pontuacao | undefined {
    return this.pontuacoes.find(p => p.id === id);
  }

  buscarPorColaboradorId(colaboradorId: number): Pontuacao[] {
    return this.pontuacoes.filter(p => p.colaboradorId === colaboradorId);
  }

  buscarPorCicloId(cicloId: number): Pontuacao[] {
    return this.pontuacoes.filter(p => p.cicloId === cicloId);
  }

  calcularTotalPorColaborador(colaboradorId: number): number {
    return this.pontuacoes
      .filter(p => p.colaboradorId === colaboradorId && p.status === 'aprovado')
      .reduce((total, p) => total + p.valor, 0);
  }

  criar(pontuacao: Pontuacao): Pontuacao {
    const novaPontuacao = {
      ...pontuacao,
      id: this.nextId++,
      dataCriacao: new Date()
    };
    this.pontuacoes.push(novaPontuacao);
    return novaPontuacao;
  }

  atualizar(id: number, pontuacao: Partial<Pontuacao>): Pontuacao | undefined {
    const index = this.pontuacoes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pontuacoes[index] = {
        ...this.pontuacoes[index],
        ...pontuacao,
        dataAtualizacao: new Date()
      };
      return this.pontuacoes[index];
    }
    return undefined;
  }

  remover(id: number): boolean {
    const index = this.pontuacoes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pontuacoes.splice(index, 1);
      return true;
    }
    return false;
  }
}
