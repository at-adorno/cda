import { Request, Response } from 'express';
import PontuacaoService from '../services/PontuacaoService';

class PontuacaoController {
    async create(req: Request, res: Response) {
        const pontuacao = await PontuacaoService.create(req.body);
        res.status(201).json(pontuacao);
    }

    async findAll(req: Request, res: Response) {
        const pontuacoes = await PontuacaoService.findAll();
        res.json(pontuacoes);
    }

    async findById(req: Request, res: Response) {
        const pontuacao = await PontuacaoService.findById(Number(req.params.id));
        if (!pontuacao) return res.status(404).json({ message: 'Pontuação não encontrada' });
        res.json(pontuacao);
    }

    async update(req: Request, res: Response) {
        const pontuacao = await PontuacaoService.update(Number(req.params.id), req.body);
        res.json(pontuacao);
    }

    async delete(req: Request, res: Response) {
        await PontuacaoService.delete(Number(req.params.id));
        res.status(204).send();
    }
}

export default new PontuacaoController();
