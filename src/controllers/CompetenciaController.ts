import { Request, Response } from 'express';
import CompetenciaService from '../services/CompetenciaService';

class CompetenciaController {
  private competenciaService = new CompetenciaService();

  listarTodos = (req: Request, res: Response) => {
    const competencias = this.competenciaService.listarTodos();
    res.json(competencias);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const competencia = this.competenciaService.buscarPorId(Number(id));
    if (!competencia) {
      return res.status(404).json({ erro: 'Competência não encontrada' });
    }
    res.json(competencia);
  };

  criar = (req: Request, res: Response) => {
    const { nome, descricao } = req.body;
    const novaCompetencia = this.competenciaService.criar({
      nome,
      descricao,
    });
    res.status(201).json(novaCompetencia);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const atualizado = this.competenciaService.atualizar(Number(id), {
      nome,
      descricao,
    });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Competência não encontrada' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.competenciaService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Competência não encontrada' });
    }
    res.status(204).send();
  };
}

export default new CompetenciaController();
