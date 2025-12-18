import db from '../config/db';
import { CicloDesempenho } from '../types/CicloDesempenho';

export const cicloDesempenhoRepository = {
  async findAll(): Promise<CicloDesempenho[]> {
    const result = await db.query('SELECT * FROM ciclo_desempenho ORDER BY id');
    return result.rows;
  },

  async findById(id: number): Promise<CicloDesempenho | null> {
    const result = await db.query('SELECT * FROM ciclo_desempenho WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async findByNome(nome: string): Promise<CicloDesempenho | null> {
    const result = await db.query('SELECT * FROM ciclo_desempenho WHERE nome = $1', [nome]);
    return result.rows[0] || null;
  },

  async create(dados: CicloDesempenho): Promise<CicloDesempenho> {
    const result = await db.query(
      `INSERT INTO ciclo_desempenho (nome, data_inicio, data_fim, descricao, criado_por)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [dados.nome, dados.data_inicio, dados.data_fim, dados.descricao, dados.criado_por]
    );
    return result.rows[0];
  },

  async update(id: number, patch: Partial<CicloDesempenho>): Promise<CicloDesempenho | null> {
    const fields = [];
    const values: any[] = [];
    let i = 1;

    for (const key in patch) {
      fields.push(`${key} = $${i}`);
      values.push((patch as any)[key]);
      i++;
    }
    if (fields.length === 0) return await this.findById(id);

    values.push(id);
    const result = await db.query(
      `UPDATE ciclo_desempenho SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM ciclo_desempenho WHERE id = $1', [id]);
  },
};