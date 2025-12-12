export interface Ciclo {
  id?: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  status: 'planejamento' | 'em_progresso' | 'encerrado';
  descricao?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
