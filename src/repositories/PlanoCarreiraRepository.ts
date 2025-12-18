import db from '../config/db';
import { PlanoCarreira } from '../types/PlanoCarreira';

export default class PlanoCarreiraRepository {
  async findAll(): Promise<PlanoCarreira[]> {
    const { rows } = await db.query('SELECT * FROM plano_carreira');
    return rows;
  }

  async findById(id: number): Promise<PlanoCarreira | null> {
    const { rows } = await db.query('SELECT * FROM plano_carreira WHERE id=$1', [id]);
    return rows[0] || null;
  }

  async create(data: Partial<PlanoCarreira>): Promise<PlanoCarreira> {
    const { nome, descricao, versao, publicado } = data;
    const { rows } = await db.query(
      `INSERT INTO plano_carreira (nome, descricao, versao, publicado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, descricao || null, versao || null, publicado ?? false]
    );
    return rows[0];
  }

  async update(id: number, data: Partial<PlanoCarreira>): Promise<PlanoCarreira | null> {
    const { nome, descricao, versao, publicado } = data;
    const { rows } = await db.query(
      `UPDATE plano_carreira SET nome=$1, descricao=$2, versao=$3, publicado=$4, updated_at=now()
       WHERE id=$5 RETURNING *`,
      [nome, descricao || null, versao || null, publicado ?? false, id]
    );
    return rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM plano_carreira WHERE id=$1', [id]);
  }
}
