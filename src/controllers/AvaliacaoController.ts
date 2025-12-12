import { Request, Response } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';

class AvaliacaoController {
  private avaliacaoService = new AvaliacaoService();

  listarTodos = (req: Request, res: Response) => {
    const avaliacoes = this.avaliacaoService.listarTodos();
    res.json(avaliacoes);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const avaliacao = this.avaliacaoService.buscarPorId(Number(id));
    if (!avaliacao) {
      return res.status(404).json({ erro: 'Avaliação não encontrada' });
    }
    res.json(avaliacao);
  };

  buscarPorColaboradorId = (req: Request, res: Response) => {
    const { colaboradorId } = req.params;
    const avaliacoes = this.avaliacaoService.buscarPorColaboradorId(Number(colaboradorId));
    res.json(avaliacoes);
  };

  buscarPorCicloId = (req: Request, res: Response) => {
    const { cicloId } = req.params;
    const avaliacoes = this.avaliacaoService.buscarPorCicloId(Number(cicloId));
    res.json(avaliacoes);
  };

  criar = (req: Request, res: Response) => {
    const { colaboradorId, cicloId, avaliador, notas, desempenho, comportamento, pontualidade, qualidade, status } = req.body;
    const novaAvaliacao = this.avaliacaoService.criar({
      colaboradorId,
      cicloId,
      avaliador,
      notas,
      desempenho,
      comportamento,
      pontualidade,
      qualidade,
      status,
      media: 0
    });
    res.status(201).json(novaAvaliacao);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const dados = req.body;
    const atualizado = this.avaliacaoService.atualizar(Number(id), dados);
    if (!atualizado) {
      return res.status(404).json({ erro: 'Avaliação não encontrada' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.avaliacaoService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Avaliação não encontrada' });
    }
    res.status(204).send();
  };
}

export default new AvaliacaoController();
