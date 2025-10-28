/*
Este arquivo agora tem a responsabilidade de buscar (findAll) e criar (create) usuários, interagindo apenas com o banco de dados.
TypeScript
src/repositories/UserRepository.ts
*/

import pool from '../database/db.js';

interface User {
    id: number;
    name: string;
    email: string;
}

class UserRepository {
    async findAll(): Promise<User[]> {
        const queryText = `SELECT id, name, email FROM users ORDER BY id;`;
        const result = await pool.query(queryText);
        return result.rows as User[];
    }

    async create(name: string, email: string): Promise<User> {
        const queryText = `
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            RETURNING id, name, email;
        `;
        const result = await pool.query(queryText, [name, email]);
        return result.rows[0];
    }
}

export const userRepository = new UserRepository();