import { Request, Response } from 'express';
import { usuarioService } from '../services/UsuarioService';

export const usuarioController = {
  async criar(req: Request, res: Response) {
    try {
      const criado = await usuarioService.criar(req.body);
      return res.status(201).json(criado);
    } catch (erro: any) {
      return res.status(400).json({ erro: erro.message });
    }
  },

  async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodos();
      return res.json(usuarios);
    } catch (erro: any) {
      return res.status(500).json({ erro: erro.message });
    }
  },

  async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const usuario = await usuarioService.obterPorId(id);
      return res.json(usuario);
    } catch (erro: any) {
      if (erro.message === 'USUARIO_NAO_ENCONTRADO') return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.status(500).json({ erro: erro.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const atualizado = await usuarioService.atualizar(id, req.body);
      return res.json(atualizado);
    } catch (erro: any) {
      if (erro.message === 'USUARIO_NAO_ENCONTRADO') return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.status(500).json({ erro: erro.message });
    }
  },

  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await usuarioService.remover(id);
      return res.status(204).send();
    } catch (erro: any) {
      if (erro.message === 'USUARIO_NAO_ENCONTRADO') return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.status(500).json({ erro: erro.message });
    }
  },
};