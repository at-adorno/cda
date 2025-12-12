import { PlanoCarreira } from '../types/PlanoCarreira';
class PlanoCarreiraRepository {
  private planosCarreira: PlanoCarreira[] = [];
  private proximoId = 1;
  listar(): PlanoCarreira[] { return this.planosCarreira; }
  buscarPorId(id: number): PlanoCarreira | undefined { return this.planosCarreira.find(p => p.id === id); }
  criar(plano: Omit<PlanoCarreira, 'id' | 'criadoEm' | 'atualizadoEm'>): PlanoCarreira {
    const novoP: PlanoCarreira = { ...plano, id: this.proximoId++, criadoEm: new Date(), atualizadoEm: new Date() };
    this.planosCarreira.push(novoP);
    return novoP;
  }
  atualizar(id: number, plano: Partial<Omit<PlanoCarreira, 'id' | 'criadoEm'>>): PlanoCarreira | undefined {
    const index = this.planosCarreira.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    const pAtualizado: PlanoCarreira = { ...this.planosCarreira[index], ...plano, id, atualizadoEm: new Date() };
    this.planosCarreira[index] = pAtualizado;
    return pAtualizado;
  }
  remover(id: number): boolean {
    const index = this.planosCarreira.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.planosCarreira.splice(index, 1);
    return true;
  }
}
export default new PlanoCarreiraRepository();
