export interface PlanoCarreira {
  id: number;
  nome: string;
  descricao?: string;
  versao?: string;
  publicado: boolean;
  created_at?: Date;
  updated_at?: Date;
}
