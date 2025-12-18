import { usuarioRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../types/Usuario';

export const usuarioService = {
  async listarTodos(): Promise<Usuario[]> {
    return usuarioRepository.listarTodos();
  },

  async obterPorId(id: number): Promise<Usuario> {
    const usuario = await usuarioRepository.buscarPorId(id);
    if (!usuario) throw new Error('USUARIO_NAO_ENCONTRADO');
    return usuario;
  },

  async obterPorEmail(email: string): Promise<Usuario> {
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error('USUARIO_NAO_ENCONTRADO');
    return usuario;
  },

  async criar(dados: Usuario): Promise<Usuario> {
    const usuarioExistente = await usuarioRepository.buscarPorEmail(dados.email);
    if (usuarioExistente) throw new Error('EMAIL_JA_REGISTRADO');
    return usuarioRepository.criar(dados);
  },

  async atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario> {
    const atualizado = await usuarioRepository.atualizar(id, dados);
    if (!atualizado) throw new Error('USUARIO_NAO_ENCONTRADO');
    return atualizado;
  },

  async remover(id: number): Promise<void> {
    const usuario = await usuarioRepository.buscarPorId(id);
    if (!usuario) throw new Error('USUARIO_NAO_ENCONTRADO');
    await usuarioRepository.remover(id);
  },
};