export interface NineBox {
  id?: number;
  colaboradorId: number;
  cicloId: number;
  potencial: 'alto' | 'medio' | 'baixo';
  desempenho: 'alto' | 'medio' | 'baixo';
  quadrante: string;
  recomendacao: string;
  planoDesenvolvimento: string;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
