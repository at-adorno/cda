import { Request, Response } from 'express';
import CompetenciaService from '../services/CompetenciaService';

const service = new CompetenciaService();

export default class CompetenciaController {
  static async list(req: Request, res: Response) {
    const competencias = await service.list();
    res.json(competencias);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const competencia = await service.getById(id);
    if (!competencia) return res.status(404).json({ message: 'Competência não encontrada' });
    res.json(competencia);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const competencia = await service.create(data);
    res.status(201).json(competencia);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const competencia = await service.update(id, data);
    if (!competencia) return res.status(404).json({ message: 'Competência não encontrada' });
    res.json(competencia);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  }
}
