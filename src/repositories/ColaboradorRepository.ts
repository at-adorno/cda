import { pool } from '../config/db';
import { Colaborador } from '../types/Colaborador';

export class ColaboradorRepository {
  async listarTodos(): Promise<Colaborador[]> {
    const resultado = await pool.query('SELECT * FROM colaboradores ORDER BY nome');
    return resultado.rows;
  }

  async buscarPorId(id: number): Promise<Colaborador | null> {
    const resultado = await pool.query('SELECT * FROM colaboradores WHERE id = $1', [id]);
    return resultado.rows[0] ?? null;
  }

  async criar(dados: Colaborador): Promise<Colaborador> {
    const query = `INSERT INTO colaboradores (matricula, nome, lotacao, cargo, email, ativo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const valores = [dados.matricula, dados.nome, dados.lotacao, dados.cargo, dados.email, dados.ativo ?? true];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }

  async atualizar(id: number, dados: Partial<Colaborador>): Promise<Colaborador | null> {
    const resultado = await pool.query(`UPDATE colaboradores SET matricula = COALESCE($1, matricula), nome = COALESCE($2, nome), lotacao = COALESCE($3, lotacao), cargo = COALESCE($4, cargo), email = COALESCE($5, email), ativo = COALESCE($6, ativo) WHERE id = $7 RETURNING *;`, [dados.matricula ?? null, dados.nome ?? null, dados.lotacao ?? null, dados.cargo ?? null, dados.email ?? null, dados.ativo ?? null, id]);
    return resultado.rows[0] ?? null;
  }

  async remover(id: number): Promise<void> {
    await pool.query('DELETE FROM colaboradores WHERE id = $1', [id]);
  }
}
