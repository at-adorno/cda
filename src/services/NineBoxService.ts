import NineBoxRepository from '../repositories/NineBoxRepository';
import { NineBox } from '../types/NineBox';

class NineBoxService {
    async create(nineBox: NineBox) {
        return NineBoxRepository.create(nineBox);
    }

    async findAll() {
        return NineBoxRepository.findAll();
    }

    async findById(id: number) {
        return NineBoxRepository.findById(id);
    }

    async update(id: number, patch: Partial<NineBox>) {
        return NineBoxRepository.update(id, patch);
    }

    async delete(id: number) {
        return NineBoxRepository.delete(id);
    }
}

export default new NineBoxService();
