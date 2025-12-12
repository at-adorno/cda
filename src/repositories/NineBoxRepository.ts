import { NineBox } from '../types/NineBox';

export class NineBoxRepository {
  private nineBoxes: NineBox[] = [];
  private nextId = 1;

  listar(): NineBox[] {
    return this.nineBoxes;
  }

  buscarPorId(id: number): NineBox | undefined {
    return this.nineBoxes.find(n => n.id === id);
  }

  buscarPorColaboradorId(colaboradorId: number): NineBox[] {
    return this.nineBoxes.filter(n => n.colaboradorId === colaboradorId);
  }

  buscarPorCicloId(cicloId: number): NineBox[] {
    return this.nineBoxes.filter(n => n.cicloId === cicloId);
  }

  buscarPorQuadrante(quadrante: string): NineBox[] {
    return this.nineBoxes.filter(n => n.quadrante === quadrante);
  }

  criar(nineBox: NineBox): NineBox {
    const quadrante = this.calcularQuadrante(nineBox.potencial, nineBox.desempenho);
    const novoNineBox = {
      ...nineBox,
      id: this.nextId++,
      quadrante,
      dataCriacao: new Date()
    };
    this.nineBoxes.push(novoNineBox);
    return novoNineBox;
  }

  atualizar(id: number, nineBox: Partial<NineBox>): NineBox | undefined {
    const index = this.nineBoxes.findIndex(n => n.id === id);
    if (index !== -1) {
      const atual = this.nineBoxes[index];
      const potencial = nineBox.potencial || atual.potencial;
      const desempenho = nineBox.desempenho || atual.desempenho;
      const quadrante = this.calcularQuadrante(potencial, desempenho);

      this.nineBoxes[index] = {
        ...this.nineBoxes[index],
        ...nineBox,
        quadrante,
        dataAtualizacao: new Date()
      };
      return this.nineBoxes[index];
    }
    return undefined;
  }

  remover(id: number): boolean {
    const index = this.nineBoxes.findIndex(n => n.id === id);
    if (index !== -1) {
      this.nineBoxes.splice(index, 1);
      return true;
    }
    return false;
  }

  private calcularQuadrante(potencial: string, desempenho: string): string {
    if (potencial === 'alto' && desempenho === 'alto') return 'Estrela (High Potential, High Performer)';
    if (potencial === 'alto' && desempenho === 'medio') return 'Promissor (High Potential, Medium Performer)';
    if (potencial === 'alto' && desempenho === 'baixo') return 'Questionável (High Potential, Low Performer)';
    if (potencial === 'medio' && desempenho === 'alto') return 'Desempenho Sólido (Medium Potential, High Performer)';
    if (potencial === 'medio' && desempenho === 'medio') return 'Consistente (Medium Potential, Medium Performer)';
    if (potencial === 'medio' && desempenho === 'baixo') return 'Desenvolvimento Necessário (Medium Potential, Low Performer)';
    if (potencial === 'baixo' && desempenho === 'alto') return 'Especialista (Low Potential, High Performer)';
    if (potencial === 'baixo' && desempenho === 'medio') return 'Manutenção (Low Potential, Medium Performer)';
    return 'Saída (Low Potential, Low Performer)';
  }
}
