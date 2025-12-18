export interface CicloDesempenho {
  id?: number;
  nome: string;
  data_inicio: string; // ISO string ou 'YYYY-MM-DD'
  data_fim: string;    // ISO string ou 'YYYY-MM-DD'
  descricao?: string;
  criado_por?: number;
  created_at?: string;
  updated_at?: string;
}