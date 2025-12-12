export interface Pontuacao {
  id?: number;
  colaboradorId: number;
  cicloId: number;
  tipo: 'bonus' | 'penalidade' | 'premiacao' | 'ajuste';
  descricao: string;
  valor: number;
  motivo: string;
  aprovador: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
