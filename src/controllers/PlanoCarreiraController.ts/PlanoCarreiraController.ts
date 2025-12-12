import { Request, Response } from 'express';
import PlanoCarreiraService from '../services/PlanoCarreiraService';

class PlanoCarreiraController {
  private planoCarreiraService = new PlanoCarreiraService();

  listarTodos = (req: Request, res: Response) => {
    const planosCarreira = this.planoCarreiraService.listarTodos();
    res.json(planosCarreira);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const planoCarreira = this.planoCarreiraService.buscarPorId(Number(id));
    if (!planoCarreira) {
      return res.status(404).json({ erro: 'Plano de Carreira não encontrado' });
    }
    res.json(planoCarreira);
  };

  criar = (req: Request, res: Response) => {
    const { titulo, descricao } = req.body;
    const novoPlanoCarreira = this.planoCarreiraService.criar({
      titulo,
      descricao,
    });
    res.status(201).json(novoPlanoCarreira);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const atualizado = this.planoCarreiraService.atualizar(Number(id), {
      titulo,
      descricao,
    });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Plano de Carreira não encontrado' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.planoCarreiraService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Plano de Carreira não encontrado' });
    }
    res.status(204).send();
  };
}

export default new PlanoCarreiraController();
