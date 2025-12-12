import { Gestor, ColaboradorAvaliacao, DashboardGestor, FiltroColaboradores } from '../types/Gestor';

class GestorRepository {
  private gestores: Gestor[] = [
    {
      id: 1,
      usuarioId: 1,
      nomeGestor: 'Carlos Silva',
      departamento: 'Tecnologia',
      equipeIds: [10, 11, 12, 13],
      ativo: true,
      criadoEm: new Date('2024-01-01'),
      atualizadoEm: new Date('2024-01-01'),
    },
    {
      id: 2,
      usuarioId: 2,
      nomeGestor: 'Maria Santos',
      departamento: 'Recursos Humanos',
      equipeIds: [14, 15, 16],
      ativo: true,
      criadoEm: new Date('2024-01-01'),
      atualizadoEm: new Date('2024-01-01'),
    },
  ];

  private colaboradorAvaliacoes: ColaboradorAvaliacao[] = [
    {
      id: 10,
      nome: 'João Silva',
      cargo: 'Developer Senior',
      scoreMerito: 85,
      scorePotencial: 78,
      competenciasMedia: 4.3,
      quadrante: 'ALTO_DESEMPENHO_ALTO_POTENCIAL',
      status: 'ATIVO',
    },
    {
      id: 11,
      nome: 'Ana Costa',
      cargo: 'Analista',
      scoreMerito: 65,
      scorePotencial: 75,
      competenciasMedia: 3.8,
      quadrante: 'BAIXO_DESEMPENHO_ALTO_POTENCIAL',
      status: 'ATIVO',
    },
    {
      id: 12,
      nome: 'Pedro Oliveira',
      cargo: 'Developer Junior',
      scoreMerito: 45,
      scorePotencial: 50,
      competenciasMedia: 2.5,
      quadrante: 'BAIXO_DESEMPENHO_BAIXO_POTENCIAL',
      status: 'ATIVO',
    },
  ];

  // Obter gestor por ID
  async obterGestorPorId(id: number): Promise<Gestor | undefined> {
    return this.gestores.find(g => g.id === id);
  }

  // Listar todos os gestores
  async listarGestores(): Promise<Gestor[]> {
    return this.gestores;
  }

  // Criar novo gestor
  async criarGestor(gestor: Gestor): Promise<Gestor> {
    const novoGestor: Gestor = {
      ...gestor,
      id: Math.max(...this.gestores.map(g => g.id || 0)) + 1,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };
    this.gestores.push(novoGestor);
    return novoGestor;
  }

  // Atualizar gestor
  async atualizarGestor(id: number, dadosAtualizacao: Partial<Gestor>): Promise<Gestor | undefined> {
    const gestor = this.gestores.find(g => g.id === id);
    if (!gestor) return undefined;

    const gestorAtualizado: Gestor = {
      ...gestor,
      ...dadosAtualizacao,
      atualizadoEm: new Date(),
    };

    const index = this.gestores.findIndex(g => g.id === id);
    this.gestores[index] = gestorAtualizado;
    return gestorAtualizado;
  }

  // Deletar gestor
  async deletarGestor(id: number): Promise<boolean> {
    const index = this.gestores.findIndex(g => g.id === id);
    if (index === -1) return false;
    this.gestores.splice(index, 1);
    return true;
  }

  // Obter colaboradores de um gestor
  async obterColaboradoresGestor(gestorId: number): Promise<ColaboradorAvaliacao[]> {
    const gestor = await this.obterGestorPorId(gestorId);
    if (!gestor) throw new Error('GESTOR_NAO_ENCONTRADO');

    return this.colaboradorAvaliacoes.filter(c => gestor.equipeIds?.includes(c.id));
  }

  // Filtrar colaboradores por quadrante
  async filtrarPorQuadrante(gestorId: number, cicloId: number, quadrante: string): Promise<ColaboradorAvaliacao[]> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    return colaboradores.filter(c => c.quadrante === quadrante);
  }

  // Filtrar colaboradores por status de alerta
  async filtrarPorStatusAlerta(gestorId: number, cicloId: number, status: string): Promise<ColaboradorAvaliacao[]> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    const nivelScore = {
      'CRITICO': [0, 50],
      'ATENCAO': [50, 70],
      'BOM': [70, 85],
      'EXCELENTE': [85, 100],
    }[status] || [0, 100];

    return colaboradores.filter(c => c.scoreMerito >= nivelScore[0] && c.scoreMerito < nivelScore[1]);
  }

  // Obter dashboard do gestor
  async obterDashboardGestor(gestorId: number, cicloId: number): Promise<DashboardGestor> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    
    const mediaMerito = colaboradores.reduce((sum, c) => sum + c.scoreMerito, 0) / colaboradores.length;
    const mediaPotencial = colaboradores.reduce((sum, c) => sum + c.scorePotencial, 0) / colaboradores.length;

    const distribuicao = {
      altoDesempenhoAltoPotencial: colaboradores.filter(c => c.quadrante === 'ALTO_DESEMPENHO_ALTO_POTENCIAL').length,
      altoDesempenhoBaixoPotencial: colaboradores.filter(c => c.quadrante === 'ALTO_DESEMPENHO_BAIXO_POTENCIAL').length,
      baixoDesempenhoAltoPotencial: colaboradores.filter(c => c.quadrante === 'BAIXO_DESEMPENHO_ALTO_POTENCIAL').length,
      baixoDesempenhoBaixoPotencial: colaboradores.filter(c => c.quadrante === 'BAIXO_DESEMPENHO_BAIXO_POTENCIAL').length,
    };

    const alertas = {
      critico: colaboradores.filter(c => c.scoreMerito < 50).length,
      atencao: colaboradores.filter(c => c.scoreMerito >= 50 && c.scoreMerito < 70).length,
    };

    return {
      gestorId,
      cicloId,
      equipe: {
        total: colaboradores.length,
        mediaMerito,
        mediaPotencial,
        distribuicaoQuadrantes: distribuicao,
      },
      alertas,
    };
  }

  // Obter colaboradores com avaliação pendente
  async obterColaboradoresPendentes(gestorId: number, cicloId: number): Promise<ColaboradorAvaliacao[]> {
    // Simula colaboradores que ainda não foram avaliados
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    return colaboradores.filter(c => c.status !== 'AVALIADO');
  }

  // Obter competências da equipe - análise agregada
  async obterAnaliseCompetenciasEquipe(gestorId: number, cicloId: number): Promise<any> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    const mediaEquipe = colaboradores.reduce((sum, c) => sum + c.competenciasMedia, 0) / colaboradores.length;

    return {
      gestorId,
      cicloId,
      mediaEquipe,
      fortes: colaboradores.filter(c => c.competenciasMedia >= 4.0),
      fracas: colaboradores.filter(c => c.competenciasMedia < 3.0),
    };
  }

  // Obter sucessores potenciais
  async obterSucessoresPotenciais(gestorId: number, cicloId: number, cargo?: string): Promise<ColaboradorAvaliacao[]> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    return colaboradores.filter(
      c => c.quadrante === 'ALTO_DESEMPENHO_ALTO_POTENCIAL' && (!cargo || c.cargo === cargo),
    );
  }

  // Comparativo equipe vs empresa
  async obterComparativoEquipe(gestorId: number, cicloId: number): Promise<any> {
    const colaboradores = await this.obterColaboradoresGestor(gestorId);
    const mediaEquipeMerito = colaboradores.reduce((sum, c) => sum + c.scoreMerito, 0) / colaboradores.length;
    const mediaEmpresaMerito = 75; // Simulado

    return {
      gestorId,
      cicloId,
      equipe: {
        mediaMerito: mediaEquipeMerito,
        total: colaboradores.length,
      },
      empresa: {
        mediaMerito: mediaEmpresaMerito,
      },
      performance: mediaEquipeMerito > mediaEmpresaMerito ? 'ACIMA_MEDIA' : 'ABAIXO_MEDIA',
    };
  }
}

export default new GestorRepository();
