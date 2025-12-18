import AvaliacaoRepository from '../repositories/AvaliacaoRepository';
import { Avaliacao } from '../types/Avaliacao';

class AvaliacaoService {
    async create(avaliacao: Avaliacao) {
        return AvaliacaoRepository.create(avaliacao);
    }

    async findAll() {
        return AvaliacaoRepository.findAll();
    }

    async findById(id: number) {
        return AvaliacaoRepository.findById(id);
    }

    async update(id: number, patch: Partial<Avaliacao>) {
        return AvaliacaoRepository.update(id, patch);
    }

    async delete(id: number) {
        return AvaliacaoRepository.delete(id);
    }
}

export default new AvaliacaoService();
