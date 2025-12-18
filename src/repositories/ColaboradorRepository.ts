import db from '../config/db';
import { Colaborador } from '../types/Colaborador';

const tableName = 'colaborador';

export const colaboradorRepository = {
  async findAll(): Promise<Colaborador[]> {
    const { rows } = await db.query(`SELECT * FROM ${tableName}`);
    return rows;
  },

  async findById(id: number): Promise<Colaborador | null> {
    const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async findByUsuarioId(usuario_id: number): Promise<Colaborador | null> {
    const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE usuario_id = $1`, [usuario_id]);
    return rows[0] || null;
  },

  async create(colaborador: Colaborador): Promise<Colaborador> {
    const query = `
      INSERT INTO ${tableName} 
        (usuario_id, nome, cargo_id, gestor_id, matricula, ativo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [
      colaborador.usuario_id ?? null,
      colaborador.nome,
      colaborador.cargo_id ?? null,
      colaborador.gestor_id ?? null,
      colaborador.matricula,
      colaborador.ativo ?? true,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async update(id: number, patch: Partial<Colaborador>): Promise<Colaborador | null> {
    const fields = [];
    const values: any[] = [];
    let idx = 1;

    for (const key in patch) {
      fields.push(`${key} = $${idx}`);
      values.push((patch as any)[key]);
      idx++;
    }

    if (fields.length === 0) return await this.findById(id);

    values.push(id);
    const query = `UPDATE ${tableName} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const { rows } = await db.query(query, values);
    return rows[0] || null;
  },

  async delete(id: number): Promise<void> {
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
  },
};