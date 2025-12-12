import { Request, Response } from 'express';
import PerfilService from '../services/PerfilService';

class PerfilController {
  private perfilService = new PerfilService();

  listarTodos = (req: Request, res: Response) => {
    const perfis = this.perfilService.listarTodos();
    res.json(perfis);
  };

  buscarPorId = (req: Request, res: Response) => {
    const { id } = req.params;
    const perfil = this.perfilService.buscarPorId(Number(id));
    if (!perfil) {
      return res.status(404).json({ erro: 'Perfil não encontrado' });
    }
    res.json(perfil);
  };

  criar = (req: Request, res: Response) => {
    const { nome, descricao, permissoes, ativo } = req.body;
    const novoPerfil = this.perfilService.criar({
      nome,
      descricao,
      permissoes,
      ativo
    });
    res.status(201).json(novoPerfil);
  };

  atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, descricao, permissoes, ativo } = req.body;
    const atualizado = this.perfilService.atualizar(Number(id), {
      nome,
      descricao,
      permissoes,
      ativo
    });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Perfil não encontrado' });
    }
    res.json(atualizado);
  };

  remover = (req: Request, res: Response) => {
    const { id } = req.params;
    const removido = this.perfilService.remover(Number(id));
    if (!removido) {
      return res.status(404).json({ erro: 'Perfil não encontrado' });
    }
    res.status(204).send();
  };
}

export default new PerfilController();
