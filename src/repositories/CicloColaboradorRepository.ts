import { CicloColaborador } from '../types/CicloColaborador';

class CicloColaboradorRepository {
  private ciclosColaboradores: CicloColaborador[] = [];
  private proximoId = 1;

  listar(): CicloColaborador[] {
    return this.ciclosColaboradores;
  }

  buscarPorId(id: number): CicloColaborador | undefined {
    return this.ciclosColaboradores.find(cc => cc.id === id);
  }

  buscarPorCicloId(cicloId: number): CicloColaborador[] {
    return this.ciclosColaboradores.filter(cc => cc.cicloId === cicloId);
  }

  buscarPorColaboradorId(colaboradorId: number): CicloColaborador[] {
    return this.ciclosColaboradores.filter(cc => cc.colaboradorId === colaboradorId);
  }

  criar(cicloColaborador: Omit<CicloColaborador, 'id'>): CicloColaborador {
    const novoCC: CicloColaborador = {
      ...cicloColaborador,
      id: this.proximoId++,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };
    this.ciclosColaboradores.push(novoCC);
    return novoCC;
  }

  atualizar(id: number, cicloColaborador: Partial<Omit<CicloColaborador, 'id'>>): CicloColaborador | undefined {
    const index = this.ciclosColaboradores.findIndex(cc => cc.id === id);
    if (index === -1) return undefined;

    const ccAtualizado: CicloColaborador = {
      ...this.ciclosColaboradores[index],
      ...cicloColaborador,
      id,
      atualizadoEm: new Date(),
    };
    this.ciclosColaboradores[index] = ccAtualizado;
    return ccAtualizado;
  }

  remover(id: number): boolean {
    const index = this.ciclosColaboradores.findIndex(cc => cc.id === id);
    if (index === -1) return false;
    this.ciclosColaboradores.splice(index, 1);
    return true;
  }
}

export default new CicloColaboradorRepository();
