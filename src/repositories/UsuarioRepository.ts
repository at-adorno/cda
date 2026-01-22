import db from '../config/db';
import { Usuario } from '../types/Usuario';

export const usuarioRepository = {
  async listarTodos(): Promise<Usuario[]> {
    const { rows } = await db.query('SELECT * FROM usuario');
    return rows;
  },

  async buscarPorId(id: number): Promise<Usuario | null> {
    const { rows } = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const { rows } = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return rows[0] || null;
  },

  async criar(dados: Usuario): Promise<Usuario> {
    const { email, nome, perfil_id, senha_hash } = dados;
    const { rows } = await db.query(
      `INSERT INTO usuario (email, nome, perfil_id, senha_hash) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, nome ?? null, perfil_id, senha_hash ?? null]
    );
    return rows[0];
  },

  async atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario | null> {
    const usuarioExistente = await this.buscarPorId(id);
    if (!usuarioExistente) return null;

    const updated = {
      email: dados.email ?? usuarioExistente.email,
      nome: dados.nome ?? usuarioExistente.nome,
      perfil_id: dados.perfil_id ?? usuarioExistente.perfil_id,
      senha_hash: dados.senha_hash ?? usuarioExistente.senha_hash,
    };

    const { rows } = await db.query(
      `UPDATE usuario SET email=$1, nome=$2, perfil_id=$3, senha_hash=$4, updated_at=now() 
       WHERE id=$5 RETURNING *`,
      [updated.email, updated.nome, updated.perfil_id, updated.senha_hash, id]
    );
    return rows[0];
  },

  async remover(id: number): Promise<void> {
    await db.query('DELETE FROM usuario WHERE id=$1', [id]);
  },
};
