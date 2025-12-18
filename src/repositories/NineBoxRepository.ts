import db from '../config/db';
import { NineBox } from '../types/NineBox';

class NineBoxRepository {
    async create(nineBox: NineBox): Promise<NineBox> {
        const query = `
            INSERT INTO nine_box (
                ciclo_colaborador_id, posicao_x_potencial, posicao_y_desempenho,
                score_competencias, score_metas, score_final_merito, elegivel_carreira
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`;
        const values = [
            nineBox.ciclo_colaborador_id,
            nineBox.posicao_x_potencial,
            nineBox.posicao_y_desempenho,
            nineBox.score_competencias,
            nineBox.score_metas,
            nineBox.score_final_merito,
            nineBox.elegivel_carreira
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findAll(): Promise<NineBox[]> {
        const { rows } = await db.query('SELECT * FROM nine_box');
        return rows;
    }

    async findById(id: number): Promise<NineBox | null> {
        const { rows } = await db.query('SELECT * FROM nine_box WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<NineBox>): Promise<NineBox> {
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
        const query = `UPDATE nine_box SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM nine_box WHERE id = $1', [id]);
    }
}

export default new NineBoxRepository();
