import type { Request, Response } from 'express';
import { usuarioService } from '../services/UsuarioService';

export const usuarioController = {
  async criar(req: Request, res: Response) {
    try {
      const dados = req.body;
      const criado = await usuarioService.criar(dados);
      return res.status(201).json(criado);
    } catch (erro: any) {
      return res.status(400).json({ erro: erro.message || 'Erro ao criar usuário' });
    }
  },

  async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodos();
      return res.json(usuarios);
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },

  async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
refactor: corrigir UsuarioController com padrão em português      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.json(usuario);
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao obter usuário' });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;
      const atualizado = await usuarioService.atualizar(id, dados);
      if (!atualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.json(atualizado);
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  },

  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await usuarioService.remover(id);
      return res.status(204).send();
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao remover usuário' });
    }
  },
};
