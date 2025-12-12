import { Request, Response } from 'express';
import NineBoxService from '../services/NineBoxService';

class NineBoxController {
  private nineBoxService = new NineBoxService();

  listarTodos = (req: Request, res: Response) => {
    const nineBoxes = this.nineBoxService.listarTodos();
    res.json(nineBoxes);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const nineBox = this.nineBoxService.buscarPorId(Number(id));
    if (!nineBox) {
      return res.status(404).json({ erro: 'Nine Box não encontrado' });
    }
    res.json(nineBox);
  };

  buscarPorColaboradorId = (req: Request, res: Response) => {
    const { colaboradorId } = req.params;
    const nineBoxes = this.nineBoxService.buscarPorColaboradorId(Number(colaboradorId));
    res.json(nineBoxes);
  };

  buscarPorCicloId = (req: Request, res: Response) => {
    const { cicloId } = req.params;
    const nineBoxes = this.nineBoxService.buscarPorCicloId(Number(cicloId));
    res.json(nineBoxes);
  };

  buscarPorQuadrante = (req: Request, res: Response) => {
    const { quadrante } = req.params;
    const nineBoxes = this.nineBoxService.buscarPorQuadrante(quadrante);
    res.json(nineBoxes);
  };

  criar = (req: Request, res: Response) => {
    const { colaboradorId, cicloId, potencial, desempenho, recomendacao, planoDesenvolvimento } = req.body;
    const novoNineBox = this.nineBoxService.criar({
      colaboradorId,
      cicloId,
      potencial,
      desempenho,
      recomendacao,
      planoDesenvolvimento,
      quadrante: ''
    });
    res.status(201).json(novoNineBox);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const dados = req.body;
    const atualizado = this.nineBoxService.atualizar(Number(id), dados);
    if (!atualizado) {
      return res.status(404).json({ erro: 'Nine Box não encontrado' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.nineBoxService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Nine Box não encontrado' });
    }
    res.status(204).send();
  };
}

export default new NineBoxController();
