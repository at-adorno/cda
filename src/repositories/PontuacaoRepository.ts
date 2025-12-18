import db from '../config/db';
import { Pontuacao } from '../types/Pontuacao';

class PontuacaoRepository {
    async create(pontuacao: Pontuacao): Promise<Pontuacao> {
        const query = `
            INSERT INTO pontuacao (avaliacao_id, competencia_id, meta_id, nota, comentario, peso_aplicado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const values = [
            pontuacao.avaliacao_id,
            pontuacao.competencia_id || null,
            pontuacao.meta_id || null,
            pontuacao.nota,
            pontuacao.comentario || null,
            pontuacao.peso_aplicado || 1
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findAll(): Promise<Pontuacao[]> {
        const { rows } = await db.query('SELECT * FROM pontuacao');
        return rows;
    }

    async findById(id: number): Promise<Pontuacao | null> {
        const { rows } = await db.query('SELECT * FROM pontuacao WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<Pontuacao>): Promise<Pontuacao> {
        const fields: string[] = [];
        const values: any[] = [];
        let i = 1;

        for (const key in patch) {
            fields.push(`${key} = $${i}`);
            // @ts-ignore
            values.push(patch[key]);
            i++;
        }

        values.push(id);
        const query = `UPDATE pontuacao SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM pontuacao WHERE id = $1', [id]);
    }
}

export default new PontuacaoRepository();
