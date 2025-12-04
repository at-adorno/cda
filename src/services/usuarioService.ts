import { usuarioRepository } from '../repositories/UsuarioRepository.js';

export const usuarioService = {
  async createUsuario(data: { email: string; nome?: string; perfil_id?: number | null; senha_hash?: string | null }) {
    if (!data.email) throw new Error('email é obrigatório');
    const created = await usuarioRepository.create(data.email, data.nome ?? null, data.perfil_id ?? null, data.senha_hash ?? null);
    return created;
  },

  async listUsuarios() {
    return usuarioRepository.findAll();
  },

  async getUsuario(id: number) {
    return usuarioRepository.findById(id);
  },

  async updateUsuario(id: number, patch: any) {
    return usuarioRepository.update(id, patch);
  },

  async deleteUsuario(id: number) {
    return usuarioRepository.delete(id);
  },
};
