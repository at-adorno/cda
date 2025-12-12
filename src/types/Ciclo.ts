export interface Ciclo {
  id?: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  descricao?: string;
  criadoPor?: number; // FK para usuario_id
  criadoEm?: Date;
  atualizadoEm?: Date;
}
