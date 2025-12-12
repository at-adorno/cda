export interface Avaliacao {
  id?: number;
  colaboradorId: number;
  cicloId: number;
  avaliador: string;
  notas: string;
  desempenho: number;
  comportamento: number;
  pontualidade: number;
  qualidade: number;
  media: number;
  status: 'pendente' | 'em_andamento' | 'concluida';
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
