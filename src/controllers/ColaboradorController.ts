import { Request, Response } from 'express';
import ColaboradorService from '../services/ColaboradorService';

class ColaboradorController {
  private colaboradorService = new ColaboradorService();

  listarTodos = (req: Request, res: Response) => {
    const colaboradores = this.colaboradorService.listarTodos();
    res.json(colaboradores);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const colaborador = this.colaboradorService.buscarPorId(Number(id));
    if (!colaborador) {
      return res.status(404).json({ erro: 'Colaborador não encontrado' });
    }
    res.json(colaborador);
  };

  criar = (req: Request, res: Response) => {
    const { nome, email, departamento } = req.body;
    const novoColaborador = this.colaboradorService.criar({
      nome,
      email,
      departamento,
    });
    res.status(201).json(novoColaborador);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, departamento } = req.body;
    const colaboradorAtualizado = this.colaboradorService.atualizar(
      Number(id),
      { nome, email, departamento }
    );
    if (!colaboradorAtualizado) {
      return res.status(404).json({ erro: 'Colaborador não encontrado' });
    }
    res.json(colaboradorAtualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const sucesso = this.colaboradorService.remover(Number(id));
    if (!sucesso) {
      return res.status(404).json({ erro: 'Colaborador não encontrado' });
    }
    res.json({ mensagem: 'Colaborador removido com sucesso' });
  };
}

export default new ColaboradorController();
