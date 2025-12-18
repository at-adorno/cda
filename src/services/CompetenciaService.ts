import CompetenciaRepository from '../repositories/CompetenciaRepository';
import { Competencia } from '../types/Competencia';

export default class CompetenciaService {
  private repo = new CompetenciaRepository();

  async list(): Promise<Competencia[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Competencia | null> {
    return this.repo.findById(id);
  }

  async create(data: Partial<Competencia>): Promise<Competencia> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<Competencia>): Promise<Competencia | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
