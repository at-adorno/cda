export interface Usuario {
  id?: number;
  email: string;
  nome?: string;
  perfil_id: number;
  senha_hash?: string;
  created_at?: Date;
  updated_at?: Date;
}