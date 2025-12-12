import { NineBox } from '../types/NineBox';
import { NineBoxRepository } from '../repositories/NineBoxRepository';

const repositorio = new NineBoxRepository();

export class NineBoxService {
  async listarTodos() {
    return repositorio.listar();
  }

  async buscarPorId(id: number) {
    const nineBox = await repositorio.buscarPorId(id);
    if (!nineBox) throw new Error('NINE_BOX_NAO_ENCONTRADO');
    return nineBox;
  }

  async buscarPorColaboradorId(colaboradorId: number) {
    return repositorio.buscarPorColaboradorId(colaboradorId);
  }

  async buscarPorCicloId(cicloId: number) {
    return repositorio.buscarPorCicloId(cicloId);
  }

  async buscarPorQuadrante(quadrante: string) {
    return repositorio.buscarPorQuadrante(quadrante);
  }

  async criar(dados: NineBox) {
    return repositorio.criar(dados);
  }

  async atualizar(id: number, dados: Partial<NineBox>) {
    const nineBox = await repositorio.buscarPorId(id);
    if (!nineBox) throw new Error('NINE_BOX_NAO_ENCONTRADO');
    
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('NINE_BOX_NAO_ENCONTRADO');
    return atualizado;
  }

  async remover(id: number) {
    return repositorio.remover(id);
  }
}
