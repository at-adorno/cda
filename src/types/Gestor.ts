export interface Gestor {
  id?: number;
  usuarioId: number; // FK para Usuario
  nomeGestor?: string;
  departamento?: string;
  equipeIds?: number[]; // Array de IDs de colaboradores sob supervisão
  ativo?: boolean;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

// Interfaces para respostas de endpoints
export interface DashboardGestor {
  gestorId: number;
  cicloId: number;
  equipe: {
    total: number;
    mediaMerito: number;
    mediaPotencial: number;
    distribuicaoQuadrantes: {
      altoDesempenhoAltoPotencial: number;
      altoDesempenhoAltoPotencial: number;
      altoDesempenhoAltoPotencial: number;
      baixoDesempenhoBaixoPotencial: number;
    };
  };
  alertas: {
    critico: number;
    atencao: number;
  };
}

export interface ColaboradorAvaliacao {
  id: number;
  nome: string;
  cargo: string;
  scoreMerito: number;
  scorePotencial: number;
  competenciasMedia: number;
  quadrante: string;
  status: string;
}

export interface FiltroColaboradores {
  quadrante?: string;
  statusAlerta?: 'CRITICO' | 'ATENCAO' | 'BOM' | 'EXCELENTE';
  pendentes?: boolean;
  cicloId: number;
}
