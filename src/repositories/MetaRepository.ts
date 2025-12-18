import db from '../config/db';
import { Meta } from '../types/Meta';

export default class MetaRepository {
  async findAll(): Promise<Meta[]> {
    const { rows } = await db.query('SELECT * FROM meta');
    return rows;
  }

  async findById(id: number): Promise<Meta | null> {
    const { rows } = await db.query('SELECT * FROM meta WHERE id=$1', [id]);
    return rows[0] || null;
  }

  async create(data: Partial<Meta>): Promise<Meta> {
    const { titulo, descricao, peso, prazo } = data;
    const { rows } = await db.query(
      `INSERT INTO meta (titulo, descricao, peso, prazo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titulo, descricao || null, peso ?? 1, prazo || null]
    );
    return rows[0];
  }

  async update(id: number, data: Partial<Meta>): Promise<Meta | null> {
    const { titulo, descricao, peso, prazo } = data;
    const { rows } = await db.query(
      `UPDATE meta SET titulo=$1, descricao=$2, peso=$3, prazo=$4, updated_at=now()
       WHERE id=$5 RETURNING *`,
      [titulo, descricao || null, peso ?? 1, prazo || null, id]
    );
    return rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM meta WHERE id=$1', [id]);
  }
}
