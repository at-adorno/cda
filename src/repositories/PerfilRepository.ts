import db from '../config/db';
import { Perfil } from '../types/Perfil';

export class PerfilRepository {
  async listar(): Promise<Perfil[]> {
    const { rows } = await db.query('SELECT * FROM perfil ORDER BY id');
    return rows;
  }

  async buscarPorId(id: number): Promise<Perfil | undefined> {
    const { rows } = await db.query('SELECT * FROM perfil WHERE id = $1', [id]);
    return rows[0];
  }

  async criar(perfil: Perfil): Promise<Perfil> {
    const { nome, descricao, permissoes, ativo } = perfil;
    const { rows } = await db.query(
      `INSERT INTO perfil (nome, descricao, permissoes, ativo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, descricao, permissoes, ativo ?? true]
    );
    return rows[0];
  }

  async atualizar(id: number, perfil: Partial<Perfil>): Promise<Perfil | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const key of Object.keys(perfil)) {
      // @ts-ignore
      const value = perfil[key as keyof Perfil];
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
      }
    }

    if (fields.length === 0) return this.buscarPorId(id);

    values.push(id);
    const query = `UPDATE perfil SET ${fields.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async remover(id: number): Promise<boolean> {
    const { rowCount } = await db.query('DELETE FROM perfil WHERE id = $1', [id]);
    return (rowCount || 0) > 0;
  }
}
