import { Request, Response } from 'express';
import NineBoxService from '../services/NineBoxService';

class NineBoxController {
    async create(req: Request, res: Response) {
        const nineBox = await NineBoxService.create(req.body);
        res.status(201).json(nineBox);
    }

    async findAll(req: Request, res: Response) {
        const nineBoxes = await NineBoxService.findAll();
        res.json(nineBoxes);
    }

    async findById(req: Request, res: Response) {
        const nineBox = await NineBoxService.findById(Number(req.params.id));
        if (!nineBox) return res.status(404).json({ message: 'NineBox não encontrado' });
        res.json(nineBox);
    }

    async update(req: Request, res: Response) {
        const nineBox = await NineBoxService.update(Number(req.params.id), req.body);
        res.json(nineBox);
    }

    async delete(req: Request, res: Response) {
        await NineBoxService.delete(Number(req.params.id));
        res.status(204).send();
    }
}

export default new NineBoxController();
