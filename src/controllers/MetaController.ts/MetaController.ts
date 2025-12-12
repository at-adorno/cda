import { Request, Response } from 'express';
import MetaService from '../services/MetaService';

class MetaController {
  private metaService = new MetaService();

  listarTodos = (req: Request, res: Response) => {
    const metas = this.metaService.listarTodos();
    res.json(metas);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const meta = this.metaService.buscarPorId(Number(id));
    if (!meta) {
      return res.status(404).json({ erro: 'Meta não encontrada' });
    }
    res.json(meta);
  };

  criar = (req: Request, res: Response) => {
    const { titulo, descricao } = req.body;
    const novaMeta = this.metaService.criar({
      titulo,
      descricao,
    });
    res.status(201).json(novaMeta);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const atualizado = this.metaService.atualizar(Number(id), {
      titulo,
      descricao,
    });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Meta não encontrada' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.metaService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Meta não encontrada' });
    }
    res.status(204).send();
  };
}

export default new MetaController();
