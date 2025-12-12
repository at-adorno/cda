import { Colaborador } from '../types/Colaborador';
import { ColaboradorRepository } from '../repositories/ColaboradorRepository';

const repositorio = new ColaboradorRepository();

export class ColaboradorService {
  async listarTodos() {
    return repositorio.listarTodos();
  }

  async buscarPorId(id: number) {
    const colaborador = await repositorio.buscarPorId(id);
    if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return colaborador;
  }

  async criar(dados: Colaborador) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<Colaborador>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    await repositorio.remover(id);
  }

  async obterAvaliacaoCompleta(colaboradorId: number, cicloId: number): Promise<any> {
    const colaborador = await this.repositorio.buscarPorId(colaboradorId);
    if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
    return {
      id: Math.random(),
      colaboradorId,
      nome: colaborador.nome,
      cargo: colaborador.cargo,
      ciclo: cicloId,
      scoreMerito: 82.4,
      scorePotencial: 77,
      quadranteNineBox: 'ALTO_DESEMPENHO_ALTO_POTENCIAL',
      feedback: 'Desempenho excepcional!',
      avaliadoEm: new Date(),
      gestorId: 3,
      gestorNome: 'Roberto Silva',
      competenciasMedia: 4.3,
      metasAtingidas: 4,
      metasTotal: 5,
      percentualConclusao: 80,
    };
  };

async obterCompetenciasDetalhes = (colaboradorId: number, cicloId: number) => {
  const colaborador = this.colaboradorService.buscarPorId(colaboradorId);
  if (!colaborador) throw new Error('COLABORADOR_NAO_ENCONTRADO');
  
  return {
    colaboradorId,
    ciclo: cicloId,
    competencias: [
      {
        id: 1,
        nome: 'Comunicação',
        nota: 4,
        feedback: 'Expressa ideias com clareza',
        benchmarkEquipe: 4.2,
        percentil: '85º',
        status: 'FORTE',
      },
      {
        id: 2,
        nome: 'Liderança',
        nota: 5,
        feedback: 'Demonstra liderança natural',
        benchmarkEquipe: 3.1,
        percentil: '95º',
        status: 'MUITO_FORTE',
      },
    ],
    mediaGeral: 4.0,
    fortes: ['Comunicação', 'Liderança'],
    fracas: ['Adaptabilidade'],
  };
};


}

