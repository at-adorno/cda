/*
Script para verificar se as tabelas definidas em `src/scripts/banco.sql` foram criadas.
Roda consultas `SELECT to_regclass('public.<table>')` para cada tabela e reporta presença/ausência.
*/

import pool from '../config/db.ts';

const tables = [
  'perfil',
  'cargo',
  'usuario',
  'colaborador',
  'ciclo_desempenho',
  'ciclo_colaborador',
  'competencia',
  'meta',
  'avaliacao',
  'pontuacao',
  'nine_box',
  'plano_carreira',
  'colaborador_trilha',
  'colaborador_import',
];

async function main() {
  try {
    console.log('Verificando existência das tabelas no schema public...');
    let missing: string[] = [];
    for (const t of tables) {
      try {
        const res = await pool.query("SELECT to_regclass('public." + t + "') as found");
        const found = res.rows[0]?.found;
        if (found) {
          console.log(`OK: ${t}`);
        } else {
          console.log(`MISSING: ${t}`);
          missing.push(t);
        }
      } catch (err) {
        console.error(`Erro consultando tabela ${t}:`, err);
        missing.push(t);
      }
    }

    if (missing.length > 0) {
      console.log('\nResultado: Há tabelas faltando.');
      console.log('Tabelas faltando:', missing.join(', '));
      process.exitCode = 2;
    } else {
      console.log('\nResultado: Todas as tabelas encontradas.');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
