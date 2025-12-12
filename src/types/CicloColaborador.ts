export interface CicloColaborador {
  id?: number;
  cicloId: number; // FK para ciclo_desempenho
  colaboradorId: number; // FK para colaborador
  recomendacaoExperiencia?: string;
  statusExperiencia?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
