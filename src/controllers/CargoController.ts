import { Request, Response } from 'express';
import CargoService from '../services/CargoService';

class CargoController {
  private cargoService = new CargoService();

  listarTodos = (req: Request, res: Response) => {
    const cargos = this.cargoService.listarTodos();
    res.json(cargos);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const cargo = this.cargoService.buscarPorId(Number(id));
    if (!cargo) {
      return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.json(cargo);
  };

  criar = (req: Request, res: Response) => {
    const { nome, descricao, departamento, salarioBase, ativo } = req.body;
    const novoCargo = this.cargoService.criar({
      nome,
      descricao,
      departamento,
      salarioBase,
      ativo
    });
    res.status(201).json(novoCargo);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, descricao, departamento, salarioBase, ativo } = req.body;
    const atualizado = this.cargoService.atualizar(Number(id), {
      nome,
      descricao,
      departamento,
      salarioBase,
      ativo
    });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.cargoService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.status(204).send();
  };
}

export default new CargoController();
