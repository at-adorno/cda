# Estrutura de Pastas do Projeto

## Sistema de Ciclo de Desempenho - Backend Node.js + TypeScript

```
ciclo-desempenho-backend/
│
├── src/
│   ├── config/                      # Configurações gerais
│   │   ├── database.ts              # Configuração PostgreSQL
│   │   ├── redis.ts                 # Configuração Redis
│   │   ├── env.ts                   # Variáveis de ambiente
│   │   └── swagger.ts               # Configuração Swagger
│   │
│   ├── models/                      # Entidades e interfaces
│   │   ├── Usuario.ts
│   │   ├── Colaborador.ts
│   │   ├── Ciclo.ts
│   │   ├── Competencia.ts
│   │   ├── Meta.ts
│   │   ├── Avaliacao.ts
│   │   └── ResultadoCiclo.ts
│   │
│   ├── repositories/                # Camada de acesso a dados
│   │   ├── UsuarioRepository.ts
│   │   ├── ColaboradorRepository.ts
│   │   ├── CicloRepository.ts
│   │   ├── CompetenciaRepository.ts
│   │   ├── MetaRepository.ts
│   │   ├── AvaliacaoRepository.ts
│   │   └── ResultadoCicloRepository.ts
│   │
│   ├── services/                    # Lógica de negócio
│   │   ├── UsuarioService.ts
│   │   ├── ColaboradorService.ts
│   │   ├── CicloService.ts
│   │   ├── AvaliacaoService.ts
│   │   ├── CalculoMeritoService.ts  # Cálculos de mérito
│   │   ├── NineBoxService.ts        # Lógica Nine Box
│   │   └── RelatorioService.ts      # Geração de relatórios
│   │
│   ├── controllers/                 # Controladores das rotas
│   │   ├── UsuarioController.ts
│   │   ├── ColaboradorController.ts
│   │   ├── CicloController.ts
│   │   ├── AvaliacaoController.ts
│   │   ├── GestorController.ts      # Endpoints do gestor
│   │   ├── RHController.ts          # Endpoints do RH
│   │   └── ImportacaoController.ts  # Upload CSV
│   │
│   ├── routes/                      # Definição de rotas
│   │   ├── index.ts                 # Agregador de rotas
│   │   ├── usuarioRoutes.ts
│   │   ├── colaboradorRoutes.ts
│   │   ├── cicloRoutes.ts
│   │   ├── avaliacaoRoutes.ts
│   │   ├── gestorRoutes.ts
│   │   └── rhRoutes.ts
│   │
│   ├── middlewares/                 # Middlewares
│   │   ├── auth.ts                  # Autenticação JWT
│   │   ├── errorHandler.ts          # Tratamento de erros
│   │   ├── validation.ts            # Validação de dados
│   │   └── upload.ts                # Upload de arquivos
│   │
│   ├── jobs/                        # Filas e processamento assíncrono
│   │   ├── queue.ts                 # Configuração da fila Redis
│   │   ├── CalculoMeritoJob.ts      # Job de cálculo de mérito
│   │   └── RelatorioJob.ts          # Job de geração de relatórios
│   │
│   ├── utils/                       # Utilitários
│   │   ├── dateHelper.ts            # Helpers de data
│   │   ├── csvParser.ts             # Parser de CSV
│   │   ├── logger.ts                # Sistema de logs
│   │   └── validators.ts            # Validadores customizados
│   │
│   ├── types/                       # Definições de tipos TypeScript
│   │   ├── index.d.ts
│   │   └── express.d.ts             # Extensões do Express
│   │
│   ├── database/                    # Scripts de banco
│   │   ├── migrations/              # Migrations
│   │   └── seeds/                   # Seeds (dados iniciais)
│   │
│   ├── app.ts                       # Configuração do Express
│   └── server.ts                    # Inicialização do servidor
│
├── public/                          # Arquivos estáticos
│   └── index.html                   # Página de consulta colaborador
│
├── tests/                           # Testes (opcional)
│   ├── unit/
│   └── integration/
│
├── docs/                            # Documentação
│   ├── api/                         # Documentação da API
│   ├── fluxos/                      # Diagramas de fluxo
│   ├── README.md                    # README principal
│   ├── INSTALACAO.md                # Guia de instalação
│   └── CONFIGURACAO.md              # Guia de configuração
│
├── scripts/                         # Scripts auxiliares
│   ├── create-database.sql          # Script de criação do banco
│   ├── massa-de-testes.sql          # Massa de testes
│   └── queries-gestor.sql           # Queries dos endpoints
│
├── .env.example                     # Exemplo de variáveis de ambiente
├── .gitignore                       # Arquivos ignorados pelo Git
├── package.json                     # Dependências do projeto
├── tsconfig.json                    # Configuração TypeScript
├── nodemon.json                     # Configuração Nodemon
└── README.md                        # Documentação principal

```

## Descrição das Principais Pastas

### `/src/config`
Contém todas as configurações do projeto, incluindo conexões com banco de dados, Redis, variáveis de ambiente e documentação Swagger.

### `/src/models`
Define as interfaces e tipos que representam as entidades do sistema. Corresponde às tabelas do banco de dados.

### `/src/repositories`
Camada responsável pela comunicação direta com o banco de dados. Implementa operações CRUD e queries específicas.

### `/src/services`
Contém toda a lógica de negócio do sistema. Processa regras, validações e orquestra chamadas aos repositories.

### `/src/controllers`
Recebe as requisições HTTP, chama os services apropriados e retorna as respostas. Camada mais externa da API.

### `/src/routes`
Define os endpoints da API e mapeia para os controllers correspondentes.

### `/src/middlewares`
Funções intermediárias que processam requisições antes de chegarem aos controllers (autenticação, validação, etc.).

### `/src/jobs`
Implementa processamento assíncrono usando filas Redis para tarefas demoradas (cálculos, relatórios).

### `/src/utils`
Funções auxiliares reutilizáveis em todo o projeto.

### `/public`
Arquivos estáticos servidos diretamente pelo Express (HTML, CSS, JS do frontend).

### `/docs`
Documentação do projeto, incluindo guias de instalação, configuração e uso da API.

### `/scripts`
Scripts SQL e outros scripts auxiliares para setup e manutenção do projeto.

## Fluxo de uma Requisição

```
Cliente → Route → Middleware → Controller → Service → Repository → Database
```

**Resposta:**
```
Database → Repository → Service → Controller → Cliente
```

## Convenções de Nomenclatura

- **Arquivos**: PascalCase para classes (Ex: `UsuarioService.ts`)
- **Pastas**: kebab-case ou camelCase (Ex: `middlewares` ou `user-modules`)
- **Classes**: PascalCase (Ex: `class UsuarioService`)
- **Funções/Métodos**: camelCase (Ex: `calcularMerito()`)
- **Constantes**: UPPER_SNAKE_CASE (Ex: `MAX_RETRY_ATTEMPTS`)
- **Interfaces**: PascalCase com prefixo "I" opcional (Ex: `IUsuario` ou `Usuario`)

## Arquivos de Configuração Importantes

### `package.json`
```json
{
  "name": "ciclo-desempenho-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### `.env.example`
```
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ciclo_desempenho
DATABASE_USER=postgres
DATABASE_PASSWORD=

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_aqui
JWT_EXPIRATION=24h
```
