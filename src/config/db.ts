/*
Este arquivo configura e exporta o Pool (Singleton), lendo as credenciais de forma segura.
TypeScript
src/config/db.ts
*/

import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {rejectUnauthorized: false}
});

pool.on('connect', () => {
    console.log('Pool de Conexões PostgreSQL criado.');
});

pool.on('error', (err) => {
    console.error('Erro inesperado no pool de conexões:', err);
});

export default pool;