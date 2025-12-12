export interface PlanoCarreira {
  id: number;
  nome: string;
  descricao?: string;
  versao?: string;
  publicado: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}
