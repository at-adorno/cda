import pool from '../config/db.ts';

export const usuarioRepository = {
  async create(email: string, nome: string | null, perfil_id: number | null, senha_hash: string | null) {
    const res = await pool.query(
      `INSERT INTO usuario(email, nome, perfil_id, senha_hash, created_at)
       VALUES($1, $2, $3, $4, NOW()) RETURNING id, email, nome, perfil_id, created_at`,
      [email, nome, perfil_id, senha_hash]
    );
    return res.rows[0];
  },

  async findAll() {
    const res = await pool.query('SELECT id, email, nome, perfil_id, created_at FROM usuario ORDER BY id');
    return res.rows;
  },

  async findById(id: number) {
    const res = await pool.query('SELECT id, email, nome, perfil_id, created_at FROM usuario WHERE id = $1', [id]);
    return res.rows[0];
  },

  async update(id: number, patch: { email?: string; nome?: string; perfil_id?: number | null; senha_hash?: string | null }) {
    // Build dynamic SET clause
    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (patch.email !== undefined) {
      sets.push(`email = $${idx++}`);
      values.push(patch.email);
    }
    if (patch.nome !== undefined) {
      sets.push(`nome = $${idx++}`);
      values.push(patch.nome);
    }
    if (patch.perfil_id !== undefined) {
      sets.push(`perfil_id = $${idx++}`);
      values.push(patch.perfil_id);
    }
    if (patch.senha_hash !== undefined) {
      sets.push(`senha_hash = $${idx++}`);
      values.push(patch.senha_hash);
    }
    if (sets.length === 0) return null;
    values.push(id);
    const sql = `UPDATE usuario SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING id, email, nome, perfil_id, created_at, updated_at`;
    const res = await pool.query(sql, values);
    return res.rows[0];
  },

  async delete(id: number) {
    const res = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING id', [id]);
    return res.rows[0];
  },
};
