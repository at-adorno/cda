import type { Request, Response } from 'express';
import { cicloDesempenhoService } from '../services/CicloDesempenhoService';

export const cicloDesempenhoController = {
  async listarTodos(req: Request, res: Response) {
    try {
      const ciclos = await cicloDesempenhoService.listarTodos();
      return res.json(ciclos);
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao listar ciclos de desempenho' });
    }
  },

  async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ciclo = await cicloDesempenhoService.obterPorId(id);
      return res.json(ciclo);
    } catch (erro: any) {
      return res.status(404).json({ erro: erro.message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const dados = req.body;
      const criado = await cicloDesempenhoService.criar(dados);
      return res.status(201).json(criado);
    } catch (erro: any) {
      return res.status(400).json({ erro: erro.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const patch = req.body;
      const atualizado = await cicloDesempenhoService.atualizar(id, patch);
      return res.json(atualizado);
    } catch (erro: any) {
      return res.status(404).json({ erro: erro.message });
    }
  },

  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await cicloDesempenhoService.remover(id);
      return res.status(204).send();
    } catch (erro: any) {
      return res.status(500).json({ erro: erro.message });
    }
  },
};
