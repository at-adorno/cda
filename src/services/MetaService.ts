import MetaRepository from '../repositories/MetaRepository';
import { Meta } from '../types/Meta';

export default class MetaService {
  private repo = new MetaRepository();

  async list(): Promise<Meta[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Meta | null> {
    return this.repo.findById(id);
  }

  async create(data: Partial<Meta>): Promise<Meta> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<Meta>): Promise<Meta | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
