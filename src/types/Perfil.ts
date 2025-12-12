export interface Perfil {
  id?: number;
  nome: string;
  descricao: string;
  permissoes: string[];
  ativo: boolean;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
