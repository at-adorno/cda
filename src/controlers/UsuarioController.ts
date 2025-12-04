import type { Request, Response } from 'express';
import { usuarioService } from '../services/usuarioService.js';

export const UsuarioController = {
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const created = await usuarioService.createUsuario(payload);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao criar usuário' });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listUsuarios();
      res.json(usuarios);
    } catch (err: any) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const usuario = await usuarioService.getUsuario(id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (err: any) {
      res.status(500).json({ error: 'Erro ao obter usuário' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = await usuarioService.updateUsuario(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Usuário não encontrado ou sem campos para atualizar' });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao atualizar usuário' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = await usuarioService.deleteUsuario(id);
      if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ deleted: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  },
};
