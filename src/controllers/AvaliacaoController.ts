import { Request, Response } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';

class AvaliacaoController {
    async create(req: Request, res: Response) {
        const avaliacao = await AvaliacaoService.create(req.body);
        res.status(201).json(avaliacao);
    }

    async findAll(req: Request, res: Response) {
        const avaliacoes = await AvaliacaoService.findAll();
        res.json(avaliacoes);
    }

    async findById(req: Request, res: Response) {
        const avaliacao = await AvaliacaoService.findById(Number(req.params.id));
        if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' });
        res.json(avaliacao);
    }

    async update(req: Request, res: Response) {
        const avaliacao = await AvaliacaoService.update(Number(req.params.id), req.body);
        res.json(avaliacao);
    }

    async delete(req: Request, res: Response) {
        await AvaliacaoService.delete(Number(req.params.id));
        res.status(204).send();
    }
}

export default new AvaliacaoController();
