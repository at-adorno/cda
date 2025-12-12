import { Request, Response } from 'express';
import { CicloService } from '../services/CicloService';

const servico = new CicloService();

export class CicloController {
  async obterTodos(req: Request, res: Response) {
    const ciclos = await servico.listarTodos();
    return res.json(ciclos);
  }

  async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ciclo = await servico.buscarPorId(id);
      return res.json(ciclo);
    } catch (erro: any) {
      if (erro.message === 'CICLO_NAO_ENCONTRADO') return res.status(404).json({ mensagem: 'Ciclo não encontrado' });
      return res.status(500).json({ mensagem: 'Erro ao buscar ciclo' });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const ciclo = await servico.criar(req.body);
      return res.status(201).json(ciclo);
    } catch (erro: any) {
      if (erro.message === 'DATA_FIM_INVALIDA') return res.status(400).json({ mensagem: 'Data fim deve ser após a data início' });
      return res.status(400).json({ mensagem: 'Erro ao criar ciclo', detalhes: erro.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ciclo = await servico.atualizar(id, req.body);
      return res.json(ciclo);
    } catch (erro: any) {
      if (erro.message === 'CICLO_NAO_ENCONTRADO') return res.status(404).json({ mensagem: 'Ciclo não encontrado' });
      if (erro.message === 'DATA_FIM_INVALIDA') return res.status(400).json({ mensagem: 'Data fim deve ser após a data início' });
      return res.status(500).json({ mensagem: 'Erro ao atualizar ciclo' });
    }
  }

  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await servico.remover(id);
      return res.status(204).send();
    } catch (erro: any) {
      return res.status(500).json({ mensagem: 'Erro ao remover ciclo' });
    }
  }

  async encerrar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ciclo = await servico.encerrar(id);
      return res.json(ciclo);
    } catch (erro: any) {
      if (erro.message === 'CICLO_NAO_ENCONTRADO') return res.status(404).json({ mensagem: 'Ciclo não encontrado' });
      return res.status(500).json({ mensagem: 'Erro ao encerrar ciclo' });
    }
  }
}
