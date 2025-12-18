import db from '../config/db';
import { Competencia } from '../types/Competencia';

export default class CompetenciaRepository {
  async findAll(): Promise<Competencia[]> {
    const { rows } = await db.query('SELECT * FROM competencia');
    return rows;
  }

  async findById(id: number): Promise<Competencia | null> {
    const { rows } = await db.query('SELECT * FROM competencia WHERE id=$1', [id]);
    return rows[0] || null;
  }

  async create(data: Partial<Competencia>): Promise<Competencia> {
    const { nome, descricao, peso } = data;
    const { rows } = await db.query(
      `INSERT INTO competencia (nome, descricao, peso)
       VALUES ($1, $2, $3) RETURNING *`,
      [nome, descricao || null, peso ?? 1]
    );
    return rows[0];
  }

  async update(id: number, data: Partial<Competencia>): Promise<Competencia | null> {
    const { nome, descricao, peso } = data;
    const { rows } = await db.query(
      `UPDATE competencia SET nome=$1, descricao=$2, peso=$3, updated_at=now()
       WHERE id=$4 RETURNING *`,
      [nome, descricao || null, peso ?? 1, id]
    );
    return rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM competencia WHERE id=$1', [id]);
  }
}