/*
Script de teste para verificar a conexão com o PostgreSQL usando o Pool exportado em src/config/db.ts
Roda uma query simples `SELECT NOW()` e fecha o pool.
TypeScript
*/

import pool from '../config/db.ts';

const { DB_HOST, DB_USER, DB_DATABASE, DB_PORT, DB_PASSWORD } = process.env;

function printConnectionVars() {
    console.log('--- Variáveis de conexão (debug) ---');
    console.log('DB_HOST:', DB_HOST);
    console.log('DB_USER:', DB_USER);
    console.log('DB_DATABASE:', DB_DATABASE);
    console.log('DB_PORT:', DB_PORT);
    if (process.env.SHOW_DB_PASSWORD === '1') {
        console.log('DB_PASSWORD:', DB_PASSWORD);
    } else {
        console.log('DB_PASSWORD: (oculta) — defina SHOW_DB_PASSWORD=1 para revelar');
    }
    console.log('-------------------------------------');
}

async function main() {
    try {
        printConnectionVars();
        console.log('Iniciando teste de conexão com o banco...');
        const res = await pool.query('SELECT NOW()');
        console.log('Conexão OK — resultado:', res.rows[0]);
    } catch (err) {
        console.error('Erro ao conectar/consultar o banco:', err);
        process.exitCode = 1;
    } finally {
        try {
            await pool.end();
            console.log('Pool encerrado.');
        } catch (e) {
            // ignorar erro no fechamento
        }
    }
}

main();
