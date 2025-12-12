import { Competencia } from '../types/Competencia';
class CompetenciaRepository {
  private competencias: Competencia[] = [];
  private proximoId = 1;
  listar(): Competencia[] { return this.competencias; }
  buscarPorId(id: number): Competencia | undefined { return this.competencias.find(c => c.id === id); }
  criar(competencia: Omit<Competencia, 'id' | 'criadoEm' | 'atualizadoEm'>): Competencia {
    const novaC: Competencia = { ...competencia, id: this.proximoId++, criadoEm: new Date(), atualizadoEm: new Date() };
    this.competencias.push(novaC);
    return novaC;
  }
  atualizar(id: number, competencia: Partial<Omit<Competencia, 'id' | 'criadoEm'>>): Competencia | undefined {
    const index = this.competencias.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    const cAtualizada: Competencia = { ...this.competencias[index], ...competencia, id, atualizadoEm: new Date() };
    this.competencias[index] = cAtualizada;
    return cAtualizada;
  }
  remover(id: number): boolean {
    const index = this.competencias.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.competencias.splice(index, 1);
    return true;
  }
}
export default new CompetenciaRepository();
