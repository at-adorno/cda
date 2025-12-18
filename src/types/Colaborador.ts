export interface Colaborador {
  id?: number;
  usuario_id?: number | null;
  nome: string;
  cargo_id?: number | null;
  gestor_id?: number | null;
  matricula: string;
  ativo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
