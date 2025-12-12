export interface Cargo {
  id?: number;
  nome: string;
  descricao: string;
  departamento: string;
  salarioBase: number;
  ativo: boolean;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
