/*
Este arquivo gerencia a tabela posts, incluindo a lógica para o JOIN na busca.
TypeScript
src/repositories/PostRepository.ts
*/

import pool from '../database/db.js';

interface PostWithAuthor {
    id: number;
    user_id: number;
    author_name: string;
    title: string;
    content: string;
    created_at: Date;
}

class PostRepository {
    async create(userId: number, title: string, content: string): Promise<any> {
        const queryText = `
            INSERT INTO posts (user_id, title, content)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, title, content;
        `;
        const result = await pool.query(queryText, [userId, title, content]);
        return result.rows[0];
    }

    async findAll(): Promise<PostWithAuthor[]> {
        const queryText = `
            SELECT
                p.id,
                p.user_id,
                p.title,
                p.content,
                p.created_at,
                u.name AS author_name
            FROM posts p
            JOIN users u ON u.id = p.user_id
            ORDER BY p.created_at DESC;
        `;
        const result = await pool.query(queryText);
        return result.rows as PostWithAuthor[];
    }
}

export const postRepository = new PostRepository();