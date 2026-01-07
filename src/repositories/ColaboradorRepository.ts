import db from '../config/db';
import { Colaborador } from '../types/Colaborador';

const tableName = 'colaborador';

export const colaboradorRepository = {
  async listarTodos(): Promise<Colaborador[]> {
    const { rows } = await db.query(`SELECT * FROM ${tableName}`);
    return rows;
  },

  async obterPorId(id: number): Promise<Colaborador | null> {
    const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async obterPorUsuarioId(usuario_id: number): Promise<Colaborador | null> {
    const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE usuario_id = $1`, [usuario_id]);
    return rows[0] || null;
  },

  async criar(colaborador: Colaborador): Promise<Colaborador> {
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

  async atualizar(id: number, patch: Partial<Colaborador>): Promise<Colaborador | null> {
    const fields = [];
    const values: any[] = [];
    let idx = 1;

    for (const key in patch) {
      fields.push(`${key} = $${idx}`);
      values.push((patch as any)[key]);
      idx++;
    }

    if (fields.length === 0) return await this.obterPorId(id);

    values.push(id);
    const query = `UPDATE ${tableName} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const { rows } = await db.query(query, values);
    return rows[0] || null;
  },

  async remover(id: number): Promise<void> {
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
  },

  async obterUltimaAvaliacaoENineBox(colaboradorId: number): Promise<any | null> {
    const query = `
      SELECT
        c.nome as colaborador_nome,
        a.id as avaliacao_id,
        a.tipo as avaliacao_tipo,
        a.status as avaliacao_status,
        a.pontuacao_merito,
        a.data_envio,
        a.comentario as avaliacao_comentario,
        nb.id as nine_box_id,
        nb.posicao_x_potencial,
        nb.posicao_y_desempenho,
        nb.score_final_merito,
        cd.nome as ciclo_nome,
        cd.data_inicio as ciclo_data_inicio,
        cd.data_fim as ciclo_data_fim
      FROM
        public.colaborador c
      JOIN
        public.ciclo_colaborador cc ON c.id = cc.colaborador_id
      JOIN
        public.ciclo_desempenho cd ON cc.ciclo_id = cd.id
      LEFT JOIN
        public.avaliacao a ON cc.id = a.ciclo_colaborador_id
      LEFT JOIN
        public.nine_box nb ON cc.id = nb.ciclo_colaborador_id
      WHERE
        c.id = $1
      ORDER BY
        cd.data_fim DESC, a.data_envio DESC
      LIMIT 1;
    `;
    const { rows } = await db.query(query, [colaboradorId]);
    return rows[0] || null;
  },
};