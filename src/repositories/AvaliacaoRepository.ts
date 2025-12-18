import db from '../config/db';
import { Avaliacao } from '../types/Avaliacao';

class AvaliacaoRepository {
    async create(avaliacao: Avaliacao): Promise<Avaliacao> {
        const query = `
            INSERT INTO avaliacao (ciclo_colaborador_id, avaliador_id, tipo, status, pontuacao_merito, data_envio, comentario)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
        const values = [
            avaliacao.ciclo_colaborador_id,
            avaliacao.avaliador_id,
            avaliacao.tipo,
            avaliacao.status,
            avaliacao.pontuacao_merito || null,
            avaliacao.data_envio || null,
            avaliacao.comentario || null
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findAll(): Promise<Avaliacao[]> {
        const { rows } = await db.query('SELECT * FROM avaliacao');
        return rows;
    }

    async findById(id: number): Promise<Avaliacao | null> {
        const { rows } = await db.query('SELECT * FROM avaliacao WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<Avaliacao>): Promise<Avaliacao> {
        const fields = [];
        const values = [];
        let i = 1;

        for (const key in patch) {
            fields.push(`${key} = $${i}`);
            // @ts-ignore
            values.push(patch[key]);
            i++;
        }
        values.push(id);
        const query = `UPDATE avaliacao SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM avaliacao WHERE id = $1', [id]);
    }
}

export default new AvaliacaoRepository();
