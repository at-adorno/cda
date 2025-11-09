# Guia de Instalação e Configuração
## Sistema de Ciclo de Desempenho

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

### Software Necessário

1. **Node.js** (versão 18 ou superior)
   - Download: https://nodejs.org/
   - Verificar instalação: `node --version`

2. **PostgreSQL** (versão 14 ou superior)
   - Download: https://www.postgresql.org/download/
   - Verificar instalação: `psql --version`

3. **Redis** (versão 6 ou superior)
   - Windows: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
   - Linux/Mac: https://redis.io/docs/getting-started/
   - Verificar instalação: `redis-cli --version`

4. **Git**
   - Download: https://git-scm.com/downloads
   - Verificar instalação: `git --version`

5. **Editor de Código** (recomendado)
   - VS Code: https://code.visualstudio.com/

---

## Passo 1: Clonar o Repositório

```bash
# Clone o repositório do projeto
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd ciclo-desempenho-backend
```

---

## Passo 2: Instalar Dependências

```bash
# Instalar todas as dependências do projeto
npm install

# OU se preferir usar yarn
yarn install
```

### Principais Dependências

O projeto utiliza as seguintes bibliotecas principais:

- **express**: Framework web
- **typescript**: Linguagem TypeScript
- **pg**: Cliente PostgreSQL
- **redis**: Cliente Redis
- **bull**: Gerenciamento de filas
- **dotenv**: Gerenciamento de variáveis de ambiente
- **cors**: Habilitar CORS
- **express-validator**: Validação de dados
- **swagger-ui-express**: Documentação da API

---

## Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ciclo_desempenho
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha_postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development

# JWT (para autenticação)
JWT_SECRET=seu_secret_super_secreto_aqui
JWT_EXPIRATION=24h

# Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=text/csv,application/vnd.ms-excel
```

---

## Passo 4: Configurar o Banco de Dados PostgreSQL

### 4.1 Iniciar o PostgreSQL

**Windows:**
```bash
# O PostgreSQL geralmente inicia automaticamente após a instalação
# Caso contrário, inicie pelo menu Iniciar
```

**Linux/Mac:**
```bash
# Iniciar o serviço
sudo service postgresql start

# OU
sudo systemctl start postgresql
```

### 4.2 Criar o Banco de Dados

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Dentro do psql, criar o banco
CREATE DATABASE ciclo_desempenho;

# Sair do psql
\q
```

### 4.3 Executar Scripts SQL

```bash
# Executar script de criação das tabelas
psql -U postgres -d ciclo_desempenho -f scripts/create-database.sql

# Executar script de massa de testes
psql -U postgres -d ciclo_desempenho -f scripts/massa-de-testes.sql
```

**Alternativa pelo código:**

Se preferir, você pode criar um arquivo `setup-database.ts` na pasta `/src/scripts`:

```typescript
import { Pool } from 'pg';
import * as fs from 'fs';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

async function setupDatabase() {
  const createScript = fs.readFileSync('scripts/create-database.sql', 'utf8');
  const massaScript = fs.readFileSync('scripts/massa-de-testes.sql', 'utf8');
  
  await pool.query(createScript);
  await pool.query(massaScript);
  
  console.log('Banco de dados configurado com sucesso!');
  await pool.end();
}

setupDatabase();
```

---

## Passo 5: Configurar o Redis

### 5.1 Iniciar o Redis

**Windows:**
```bash
# Se instalou via WSL ou Docker
redis-server
```

**Linux:**
```bash
sudo service redis-server start
```

**Mac:**
```bash
brew services start redis
```

### 5.2 Verificar Funcionamento

```bash
# Testar conexão
redis-cli ping

# Deve retornar: PONG
```

---

## Passo 6: Compilar o Projeto TypeScript

```bash
# Compilar TypeScript para JavaScript
npm run build

# Isso criará a pasta /dist com os arquivos compilados
```

---

## Passo 7: Iniciar o Servidor

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Modo Produção

```bash
npm run build
npm start
```

---

## Passo 8: Verificar Funcionamento

### 8.1 Testar API

Abra seu navegador ou Postman e acesse:

```
http://localhost:3000/api/health
```

Deve retornar algo como:
```json
{
  "status": "OK",
  "timestamp": "2025-11-11T18:00:00.000Z",
  "database": "connected",
  "redis": "connected"
}
```

### 8.2 Acessar Documentação Swagger

```
http://localhost:3000/api-docs
```

### 8.3 Acessar Tela do Colaborador

```
http://localhost:3000/colaborador
```

---

## Passo 9: Ferramentas Recomendadas

### Para Testar APIs

1. **Postman**
   - Download: https://www.postman.com/downloads/
   - Importar coleção de endpoints do projeto

2. **Insomnia**
   - Download: https://insomnia.rest/download
   - Alternativa ao Postman

### Para Gerenciar PostgreSQL

1. **pgAdmin**
   - Download: https://www.pgadmin.org/download/
   - Interface gráfica para PostgreSQL

2. **DBeaver**
   - Download: https://dbeaver.io/download/
   - Cliente universal de banco de dados

### Para Gerenciar Redis

1. **RedisInsight**
   - Download: https://redis.com/redis-enterprise/redis-insight/
   - Interface gráfica para Redis

---

## Solução de Problemas Comuns

### Erro: "Cannot connect to PostgreSQL"

**Solução:**
1. Verificar se o PostgreSQL está rodando
2. Conferir as credenciais no arquivo `.env`
3. Verificar se o banco `ciclo_desempenho` foi criado

### Erro: "Redis connection failed"

**Solução:**
1. Verificar se o Redis está rodando: `redis-cli ping`
2. Conferir host e porta no arquivo `.env`
3. Reiniciar o serviço Redis

### Erro: "Port 3000 already in use"

**Solução:**
1. Alterar a porta no arquivo `.env`
2. OU matar o processo que está usando a porta:
   - Linux/Mac: `lsof -ti:3000 | xargs kill -9`
   - Windows: `netstat -ano | findstr :3000` e depois `taskkill /PID <pid> /F`

### Erro de Permissão no PostgreSQL

**Solução:**
```sql
-- Conectar como superusuário
psql -U postgres

-- Dar permissões ao usuário
GRANT ALL PRIVILEGES ON DATABASE ciclo_desempenho TO seu_usuario;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO seu_usuario;
```

---

## Estrutura de Comandos NPM

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

---

## Próximos Passos

1. ✅ Ambiente configurado
2. ✅ Banco de dados criado
3. ✅ Servidor rodando
4. 📝 Começar a implementar os endpoints
5. 📝 Testar os fluxos das personas
6. 📝 Documentar no Swagger
7. 📝 Criar telas simples

---

## Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `/docs`
2. Verifique os logs do servidor
3. Entre em contato com a equipe do projeto

---

## Checklist de Instalação

- [ ] Node.js instalado
- [ ] PostgreSQL instalado e rodando
- [ ] Redis instalado e rodando
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Banco de dados criado
- [ ] Scripts SQL executados
- [ ] Projeto compilado (`npm run build`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Endpoints testados
- [ ] Swagger acessível

**Parabéns! Seu ambiente está pronto para desenvolvimento! 🎉**
