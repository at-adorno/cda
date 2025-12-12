import { Usuario } from '../types/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

const repositorio = new UsuarioRepository();

export const usuarioService = {
  async listarTodos() {
    return repositorio.listarTodos();
feat: adicionar UsuarioService com padrão em português
  async obterPorId(id: number) {
    const usuario = await repositorio.buscarPorId(id);
    if (!usuario) throw new Error('USUARIO_NAO_ENCONTRADO');
    return usuario;
  },

  async obterPorEmail(email: string) {
    const usuario = await repositorio.buscarPorEmail(email);
    if (!usuario) throw new Error('USUARIO_NAO_ENCONTRADO');
    return usuario;
  },

  async criar(dados: Usuario) {
    const usuarioExistente = await repositorio.buscarPorEmail(dados.email);
    if (usuarioExistente) throw new Error('EMAIL_JA_REGISTRADO');
    return repositorio.criar(dados);
  },

  async atualizar(id: number, dados: Partial<Usuario>) {
    const atualizado = await repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error('USUARIO_NAO_ENCONTRADO');
    return atualizado;
  },

  async remover(id: number) {
    await repositorio.remover(id);
  },
};
