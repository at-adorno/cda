import PlanoCarreiraRepository from '../repositories/PlanoCarreiraRepository';
import { PlanoCarreira } from '../types/PlanoCarreira';

export default class PlanoCarreiraService {
  private repo = new PlanoCarreiraRepository();

  async list(): Promise<PlanoCarreira[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<PlanoCarreira | null> {
    return this.repo.findById(id);
  }

  async create(data: Partial<PlanoCarreira>): Promise<PlanoCarreira> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<PlanoCarreira>): Promise<PlanoCarreira | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
