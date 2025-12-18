import PontuacaoRepository from '../repositories/PontuacaoRepository';
import { Pontuacao } from '../types/Pontuacao';

class PontuacaoService {
    async create(pontuacao: Pontuacao) {
        return PontuacaoRepository.create(pontuacao);
    }

    async findAll() {
        return PontuacaoRepository.findAll();
    }

    async findById(id: number) {
        return PontuacaoRepository.findById(id);
    }

    async update(id: number, patch: Partial<Pontuacao>) {
        return PontuacaoRepository.update(id, patch);
    }

    async delete(id: number) {
        return PontuacaoRepository.delete(id);
    }
}

export default new PontuacaoService();
