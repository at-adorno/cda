import db from '../config/db';
import { Gestor } from '../types/Gestor';

class GestorRepository {
    async create(gestor: Gestor): Promise<Gestor> {
        const query = `
            INSERT INTO colaborador (usuario_id, nome, cargo_id, gestor_id, matricula, ativo)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`;
        const values = [
            gestor.usuario_id,
            gestor.nome,
            gestor.cargo_id,
            gestor.gestor_id,
            gestor.matricula,
            gestor.ativo ?? true
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findAll(): Promise<Gestor[]> {
        const { rows } = await db.query('SELECT * FROM colaborador WHERE gestor_id IS NULL');
        return rows;
    }

    async findById(id: number): Promise<Gestor | null> {
        const { rows } = await db.query('SELECT * FROM colaborador WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<Gestor>): Promise<Gestor> {
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
        const query = `UPDATE colaborador SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM colaborador WHERE id = $1', [id]);
    }
}

export default new GestorRepository();
