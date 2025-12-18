import GestorRepository from '../repositories/GestorRepository';
import { Gestor } from '../types/Gestor';

class GestorService {
    async create(gestor: Gestor) {
        return GestorRepository.create(gestor);
    }

    async findAll() {
        return GestorRepository.findAll();
    }

    async findById(id: number) {
        return GestorRepository.findById(id);
    }

    async update(id: number, patch: Partial<Gestor>) {
        return GestorRepository.update(id, patch);
    }

    async delete(id: number) {
        return GestorRepository.delete(id);
    }
}

export default new GestorService();
