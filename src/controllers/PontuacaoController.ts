import { Request, Response } from 'express';
import PontuacaoService from '../services/PontuacaoService';

class PontuacaoController {
  private pontuacaoService = new PontuacaoService();

  listarTodos = (req: Request, res: Response) => {
    const pontuacoes = this.pontuacaoService.listarTodos();
    res.json(pontuacoes);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const pontuacao = this.pontuacaoService.buscarPorId(Number(id));
    if (!pontuacao) {
      return res.status(404).json({ erro: 'Pontuação não encontrada' });
    }
    res.json(pontuacao);
  };

  buscarPorColaboradorId = (req: Request, res: Response) => {
    const { colaboradorId } = req.params;
    const pontuacoes = this.pontuacaoService.buscarPorColaboradorId(Number(colaboradorId));
    res.json(pontuacoes);
  };

  buscarPorCicloId = (req: Request, res: Response) => {
    const { cicloId } = req.params;
    const pontuacoes = this.pontuacaoService.buscarPorCicloId(Number(cicloId));
    res.json(pontuacoes);
  };

  calcularTotalPorColaborador = (req: Request, res: Response) => {
    const { colaboradorId } = req.params;
    const total = this.pontuacaoService.calcularTotalPorColaborador(Number(colaboradorId));
    res.json({ colaboradorId: Number(colaboradorId), totalPontuacao: total });
  };

  criar = (req: Request, res: Response) => {
    const { colaboradorId, cicloId, tipo, descricao, valor, motivo, aprovador, status } = req.body;
    const novaPontuacao = this.pontuacaoService.criar({
      colaboradorId,
      cicloId,
      tipo,
      descricao,
      valor,
      motivo,
      aprovador,
      status
    });
    res.status(201).json(novaPontuacao);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const dados = req.body;
    const atualizado = this.pontuacaoService.atualizar(Number(id), dados);
    if (!atualizado) {
      return res.status(404).json({ erro: 'Pontuação não encontrada' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.pontuacaoService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Pontuação não encontrada' });
    }
    res.status(204).send();
  };
}

export default new PontuacaoController();
