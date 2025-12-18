import CargoRepository from '../repositories/CargoRepository';
import { Cargo } from '../types/Cargo';

export default class CargoService {
  private repo = new CargoRepository();

  async list(): Promise<Cargo[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Cargo | null> {
    return this.repo.findById(id);
  }

  async create(data: Partial<Cargo>): Promise<Cargo> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<Cargo>): Promise<Cargo | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
