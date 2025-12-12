import { pool } from '../config/db';
import { Ciclo } from '../types/Ciclo';

export class CicloRepository {
  async listarTodos(): Promise<Ciclo[]> {
    const resultado = await pool.query('SELECT * FROM ciclos ORDER BY data_inicio DESC');
    return resultado.rows.map(row => this.mapearDoBD(row));
  }

  async buscarPorId(id: number): Promise<Ciclo | null> {
    const resultado = await pool.query('SELECT * FROM ciclos WHERE id = $1', [id]);
    if (!resultado.rows[0]) return null;
    return this.mapearDoBD(resultado.rows[0]);
  }

  async criar(dados: Ciclo): Promise<Ciclo> {
    const query = `INSERT INTO ciclos (nome, data_inicio, data_fim, status, descricao, criado_em, atualizado_em) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *;`;
    const valores = [dados.nome, dados.dataInicio, dados.dataFim, dados.status ?? 'planejamento', dados.descricao || null];
    const resultado = await pool.query(query, valores);
    return this.mapearDoBD(resultado.rows[0]);
  }

  async atualizar(id: number, dados: Partial<Ciclo>): Promise<Ciclo | null> {
    const resultado = await pool.query(`UPDATE ciclos SET nome = COALESCE($1, nome), data_inicio = COALESCE($2, data_inicio), data_fim = COALESCE($3, data_fim), status = COALESCE($4, status), descricao = COALESCE($5, descricao), atualizado_em = NOW() WHERE id = $6 RETURNING *;`, [dados.nome ?? null, dados.dataInicio ?? null, dados.dataFim ?? null, dados.status ?? null, dados.descricao ?? null, id]);
    if (!resultado.rows[0]) return null;
    return this.mapearDoBD(resultado.rows[0]);
  }

  async remover(id: number): Promise<void> {
    await pool.query('DELETE FROM ciclos WHERE id = $1', [id]);
  }

  private mapearDoBD(linha: any): Ciclo {
    return {
      id: linha.id,
      nome: linha.nome,
      dataInicio: linha.data_inicio,
      dataFim: linha.data_fim,
      status: linha.status,
      descricao: linha.descricao,
      criadoEm: linha.criado_em,
      atualizadoEm: linha.atualizado_em,
    };
  }
}
