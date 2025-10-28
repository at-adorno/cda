/*
Este arquivo agora concentra as funções de setup (conexão/migração) e a lógica de interação (o Menu).
TypeScript
src/index.ts
*/
import pool from './database/db.js';
import * as fs from 'fs/promises';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { userRepository } from './repositories/UserRepository.js';
import { postRepository } from './repositories/PostRepository.js';

const INIT_SCHEMA_PATH = './src/schema/init.sql';
const rl = readline.createInterface({ input, output });

// --- FUNÇÕES DE LÓGICA DE NEGÓCIO ---
async function handleCreateUser() {
    // ... (Lógica de criação de usuário usando userRepository.create)
    console.log("\n--- [1] Criação de Novo Usuário ---");
    try {
        const name = await rl.question('Digite o nome do usuário: ');
        const email = await rl.question('Digite o email do usuário: ');
        if (!name || !email) {
            console.log("Nome e email são obrigatórios. Operação cancelada.");
            return;
        }
        const newUser = await userRepository.create(name, email);
        console.log(`\nUsuário criado com sucesso! ID: ${newUser.id}, Nome: ${newUser.name}`);
    } catch (error) {
        console.error("\nErro durante a criação do usuário:", error);
    }
}

async function handleCreatePost() {
    // ... (Lógica de criação de post usando postRepository.create e listando usuários)
    console.log("\n--- [2] Criação de Novo Post ---");
    try {
        const users = await userRepository.findAll();
        if (users.length === 0) {
            console.log("Não há usuários. Crie um usuário primeiro.");
            return;
        }
        console.log("Usuários disponíveis:");
        users.forEach(u => console.log(`ID: ${u.id}, Nome: ${u.name}`));
        const userIdStr = await rl.question('Digite o ID do usuário autor do Post: ');
        const userId = parseInt(userIdStr);
        if (isNaN(userId) || !users.some(u => u.id === userId)) {
            console.log("ID inválido. Operação cancelada.");
            return;
        }
        const title = await rl.question('Digite o título do Post: ');
        const content = await rl.question('Digite o conteúdo do Post: ');
        const newPost = await postRepository.create(userId, title, content);
        console.log(`\nPost criado com sucesso! ID: ${newPost.id}, Título: ${newPost.title}, Autor ID: ${newPost.user_id}`);
    } catch (error) {
        console.error("\nErro durante a criação do Post:", error);
    }
}

async function handleListPosts() {
    // ... (Lógica de listagem de posts usando postRepository.findAll e JOIN)
    console.log("\n--- [4] Lista de Todos os Posts ---");
    try {
        const posts = await postRepository.findAll();
        if (posts.length === 0) {
            console.log("Nenhum Post cadastrado.");
            return;
        }
        posts.forEach(p => {
            console.log("-------------------------------------------");
            console.log(`ID: ${p.id} | Título: ${p.title}`);
            console.log(`Autor: ${p.author_name} (ID: ${p.user_id})`);
            console.log(`Criado em: ${p.created_at.toLocaleString()}`);
        });
        console.log("-------------------------------------------");
    } catch (error) {
        console.error("\nErro ao listar Posts:", error);
    }
}

async function showMenu() {
    let running = true;
    while (running) {
        console.log("\n-------------------------------------------");
        console.log("MENU PRINCIPAL - Teste de Repositórios");
        console.log("-------------------------------------------");
        console.log("[1] Criar Novo Usuário");
        console.log("[2] Criar Novo Post");
        console.log("[3] Listar Todos os Usuários");
        console.log("[4] Listar Todos os Posts");
        console.log("[0] Sair");
        console.log("-------------------------------------------");
        const choice = await rl.question('Digite sua opção: ');
        switch (choice) {
            case '1':
                await handleCreateUser();
                break;
            case '2':
                await handleCreatePost();
                break;
            case '3':
                const users = await userRepository.findAll();
                console.log("\n--- Lista de Usuários ---");
                if (users.length === 0) {
                    console.log("Nenhum usuário cadastrado.");
                } else {
                    users.forEach(u => console.log(`ID: ${u.id} | Nome: ${u.name} | Email: ${u.email}`));
                }
                break;
            case '4':
                await handleListPosts();
                break;
            case '0':
                running = false;
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

// --- FUNÇÃO DE SETUP ---
async function runSchemaMigration() {
    try {
        console.log("Verificando e criando o esquema do banco de dados...");
        const schemaSql = await fs.readFile(INIT_SCHEMA_PATH, { encoding: 'utf-8' });
        await pool.query(schemaSql);
        console.log("Esquema criado/verificado com sucesso!");
    } catch (err) {
        console.error("Erro ao rodar a migração do esquema:", err);
        throw err;
    }
}

async function startApplication() {
    try {
        const client = await pool.connect();
        client.release();
        console.log("Conexão inicial com o PostgreSQL bem-sucedida!");
        await runSchemaMigration();
        await showMenu();
    } catch (err) {
        console.error("Falha crítica: A aplicação não pode iniciar.", err);
        process.exit(1);
    } finally {
        rl.close();
        pool.end();
        console.log("\nAplicação encerrada.");
    }
}

startApplication();