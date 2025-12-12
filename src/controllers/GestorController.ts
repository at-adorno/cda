import { Request, Response } from 'express';
import gestorService from '../services/GestorService';

class GestorController {
  // CRUD Básico
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const gestores = await gestorService.listarGestores();
      res.status(200).json({ success: true, gestores });
    } catch (erro) {
      res.status(500).json({ success: false, erro: (erro as Error).message });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gestor = await gestorService.obterGestorCompleto(Number(id));
      res.status(200).json({ success: true, gestor });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const novoGestor = await gestorService.criarGestor(req.body);
      res.status(201).json({ success: true, gestor: novoGestor });
    } catch (erro) {
      res.status(400).json({ success: false, erro: (erro as Error).message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gestorAtualizado = await gestorService.atualizarGestor(Number(id), req.body);
      res.status(200).json({ success: true, gestor: gestorAtualizado });
    } catch (erro) {
      res.status(400).json({ success: false, erro: (erro as Error).message });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await gestorService.deletarGestor(Number(id));
      res.status(204).send();
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  // Endpoints de Análise - Múltiplos Colaboradores
  async obterDashboard(req: Request, res: Response): Promise<void> {
    try {
      const { gestorId, cicloId } = req.params;
      const dashboard = await gestorService.obterDashboard(Number(gestorId), Number(cicloId));
      res.status(200).json({ success: true, dashboard });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  async obterColaboradoresPorQuadrante(req: Request, res: Response): Promise<void> {
    try {
      const { gestorId, cicloId, quadrante } = req.params;
      const colaboradores = await gestorService.obterColaboradoresPorQuadrante(
        Number(gestorId),
        Number(cicloId),
        quadrante,
      );
      res.status(200).json({
        success: true,
        quadrante,
        total: colaboradores.length,
        colaboradores,
      });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  async obterColaboradoresPorStatusAlerta(req: Request, res: Response): Promise<void> {
    try {
      const { gestorId, cicloId } = req.params;
      const { status } = req.query;

      if (!status || typeof status !== 'string') {
        res.status(400).json({ success: false, erro: 'Status de alerta é obrigatório' });
        return;
      }

      const colaboradores = await gestorService.obterColaboradoresPorAlerta(
        Number(gestorId),
        Number(cicloId),
        status,
      );
      res.status(200).json({
        success: true,
        statusAlerta: status,
        total: colaboradores.length,
        colaboradores,
      });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  async obterComparativoEquipe(req: Request, res: Response): Promise<void> {
    try {
      const { gestorId, cicloId } = req.params;
      const comparativo = await gestorService.obterComparativoEquipe(Number(gestorId), Number(cicloId));
      res.status(200).json({ success: true, comparativo });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }

  async obterSucessoresPotenciais(req: Request, res: Response): Promise<void> {
    try {
      const { gestorId, cicloId } = req.params;
      const { cargo } = req.query;

      const sucessores = await gestorService.obterSucessoresPotenciais(
        Number(gestorId),
        Number(cicloId),
        cargo as string | undefined,
      );
      res.status(200).json({
        success: true,
        total: sucessores.length,
        sucessores,
      });
    } catch (erro) {
      res.status(404).json({ success: false, erro: (erro as Error).message });
    }
  }
}

export default new GestorController();