import { Meta } from '../types/Meta';
class MetaRepository {
  private metas: Meta[] = [];
  private proximoId = 1;
  listar(): Meta[] { return this.metas; }
  buscarPorId(id: number): Meta | undefined { return this.metas.find(m => m.id === id); }
  criar(meta: Omit<Meta, 'id' | 'criadoEm' | 'atualizadoEm'>): Meta {
    const novaM: Meta = { ...meta, id: this.proximoId++, criadoEm: new Date(), atualizadoEm: new Date() };
    this.metas.push(novaM);
    return novaM;
  }
  atualizar(id: number, meta: Partial<Omit<Meta, 'id' | 'criadoEm'>>): Meta | undefined {
    const index = this.metas.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    const mAtualizada: Meta = { ...this.metas[index], ...meta, id, atualizadoEm: new Date() };
    this.metas[index] = mAtualizada;
    return mAtualizada;
  }
  remover(id: number): boolean {
    const index = this.metas.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.metas.splice(index, 1);
    return true;
  }
}
export default new MetaRepository();
