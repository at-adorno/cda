# Ciclo de Desempenho Automatizado (CDA)

> Sistema automatizado para gestão de ciclos de desempenho, avaliações de colaboradores e planejamento de carreira.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)

---

## 📋 Sobre o Projeto

O **Ciclo de Desempenho Automatizado (CDA)** é uma plataforma que transforma o processo manual de avaliação de desempenho em um fluxo automatizado e integrado. O sistema permite que gestores, analistas de RH e colaboradores trabalhem de forma sincronizada para:

- ✅ Automatizar o ciclo de avaliação de desempenho
- ✅ Calcular mérito e progressão de carreira
- ✅ Posicionar colaboradores na matriz Nine Box
- ✅ Gerar relatórios estratégicos de sucessão
- ✅ Oferecer transparência aos colaboradores sobre seu plano de carreira

### Problema Resolvido

Antes: Processo manual em planilhas, 30% de divergências, falta de histórico  
Depois: Sistema integrado, cálculos automatizados, rastreabilidade completa

---

## 🎯 Metas de Sucesso (MVP)

- [x] Banco de dados funcionando com todas as tabelas
- [ ] Pelo menos 7 dos 9 endpoints do gestor implementados
- [ ] Tela do colaborador exibindo dados reais
- [ ] Importação de CSV funcional para pelo menos uma entidade
- [ ] Cálculo de mérito funcionando corretamente
- [ ] Sistema rodando sem erros críticos

---

## 👥 Equipe do Projeto

| Nome | Papel | Responsabilidades |
|------|-------|-------------------|
| Wanessa Karen | Modeladora de Dados | Modelagem de BD, DER, scripts SQL |
| Alessandra Santos | Desenvolvedora de Rotas | Endpoints da API, controllers |
| Andre Tavares | Lógica de Negócio | Services, regras de negócio |
| Diciane Alves | Documentação | Swagger, README, manuais |

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime:** Node.js 18+
- **Linguagem:** TypeScript 5.9
- **Framework:** Express.js (em desenvolvimento)
- **Banco de Dados:** PostgreSQL 12+

### Ferramentas de Desenvolvimento
- **CLI:** ts-node
- **Versionamento:** Git
- **Documentação:** Swagger (planejado)
- **Gerenciamento de Dependências:** npm

### Dependências Principais
```json
{
  "pg": "^8.16.3",
  "typescript": "^5.9.3",
  "dotenv": "^17.2.3",
  "ts-node": "^10.9.2"
}
```

---

## 📁 Estrutura de Pastas

```
cda/
├── src/
│   ├── index.ts                 # Entrada principal da aplicação
│   ├── database/
│   │   └── db.ts               # Configuração da conexão PostgreSQL
│   ├── repositories/
│   │   ├── UserRepository.ts    # Acesso a dados de usuários
│   │   └── PostRepository.ts    # Acesso a dados de posts
│   └── schema/
│       └── init.sql            # Script de inicialização do banco
├── docs/
│   ├── requisitos.md           # Documento de requisitos funcionais/não-funcionais
│   ├── DAS_Ciclo_de_Desenvolvimento_Automatizado.md  # Definição de arquitetura
│   ├── cronograma.md           # Timeline do projeto
│   └── apoio/                  # Documentos de suporte
│       ├── diagrama_classes.md
│       ├── estrutura-pastas.md
│       ├── guia-instalacao.md
│       ├── create_database.sql
│       └── queries_endpoints_gestor.sql
├── package.json
├── tsconfig.json
├── CONTRIBUTING.md             # Guia de contribuição
└── README.md                   # Este arquivo
```

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- PostgreSQL 12+
- Git

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/at-adorno/cda.git
   cd cda
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais do PostgreSQL
   ```

4. **Execute a aplicação:**
   ```bash
   npm start
   ```

A aplicação iniciará em modo interativo com um menu de opções.

---

## 📝 Scripts Disponíveis

```bash
# Iniciar a aplicação
npm start

# Rodar testes (não configurado)
npm test
```

### Testar Conexão com o Banco

Um script utilitário foi adicionado para verificar rapidamente a conexão com o PostgreSQL usando o pool definido em `src/config/db.ts`.

- **Comando:**

```bash
npm run test-db
```

- **O que ele faz:**
   - Lê variáveis em `.env` (veja abaixo).
   - Imprime as variáveis de conexão (senha oculta por padrão).
   - Executa `SELECT NOW()` para validar a conexão e encerra o pool.

- **Mostrar senha (apenas para debug):**

```bash
SHOW_DB_PASSWORD=1 npm run test-db
```

- **Variáveis necessárias no `.env`:**

```dotenv
# Exemplo mínimo (.env)
DB_USER=seu_usuario
DB_HOST=seu_host_do_postgres
DB_DATABASE=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```

- **Observações de segurança:**
   - Não comite o arquivo `.env` no repositório. Adicione-o ao `.gitignore` se ainda não estiver.
   - Use `DATABASE_URL` em serviços/CI quando suportado, mas evite expor segredos em logs.


---

## 💾 Banco de Dados

### Inicialização

O banco de dados é inicializado automaticamente ao executar a aplicação através do arquivo `src/schema/init.sql`.

### Conectar ao PostgreSQL

```bash
psql -U seu_usuario -d cda
```

### Arquivo de Setup

Consulte `docs/apoio/create_database.sql` para criação manual do banco.

---

## 🏗️ Arquitetura

### Padrão Repository

A aplicação utiliza o padrão **Repository** para abstração da camada de dados:

```
UserRepository → Queries SQL → PostgreSQL
PostRepository → Queries SQL → PostgreSQL
```

### Componentes Principais

- **`index.ts`**: Menu interativo e orquestração
- **`repositories/`**: Acesso a dados (queries)
- **`database/db.ts`**: Pool de conexões PostgreSQL

---

## 📚 Requisitos do Projeto

### Requisitos Funcionais Principais

1. **Gestão de Ciclo e Onboarding**
   - Manutenção de ciclos de desempenho (CRUD)
   - Cadastro de colaboradores
   - Validação de preenchimento mínimo

2. **Cálculo e Progressão Automatizada**
   - Cálculo automático de mérito
   - Posicionamento na matriz Nine Box
   - Identificação de elegibilidade para plano de carreira

3. **Painéis e Relatórios**
   - Painel de acompanhamento para gestores
   - Relatórios de sucessão estratégica para RH

4. **Experiência do Colaborador**
   - Acesso a feedback e performance (web responsivo)
   - Visualização do plano de carreira

5. **Administração de Sistemas**
   - Gestão de perfis de usuário
   - Controle de permissões

Veja `docs/requisitos.md` para detalhes completos.

---

## 🔒 Segurança e Conformidade

- ✅ Conformidade com LGPD (Lei Geral de Proteção de Dados)
- ✅ Dados sensíveis com criptografia AES-256 em repouso
- ✅ TLS 1.2+ em trânsito
- ⚠️ Nunca faça commit de `.env` ou senhas
- ✅ Use `.env.example` como referência

---

## 📖 Contribuindo

Este projeto segue um fluxo de trabalho colaborativo estruturado.

**Leia [CONTRIBUTING.md](./CONTRIBUTING.md) para:**
- Processo de branches (`feature/`, `fix/`, `docs/`)
- Padrão de commits em português
- Processo de Pull Requests
- Code Style com TypeScript e Prettier
- Estrutura de pastas e convenção de nomes

---

## 📅 Timeline e Documentação

- **Cronograma do Projeto:** [docs/cronograma.md](./docs/cronograma.md)
- **Documentação de Arquitetura:** [docs/DAS_Ciclo_de_Desenvolvimento_Automatizado.md](./docs/DAS_Ciclo_de_Desenvolvimento_Automatizado.md)
- **Guia de Instalação:** [docs/apoio/guia-instalacao.md](./docs/apoio/guia-instalacao.md)

---

## 📞 Suporte e Dúvidas

- 📧 Abra uma **Issue** no GitHub
- 💬 Utilize o grupo do WhatsApp ou Discord
- 📋 Registre pendências como Issues no repositório

---

## 📄 Licença

Este projeto está licenciado sob a **ISC License** - veja o arquivo `package.json` para detalhes.

---

## 🎓 Referências

- [LGPD - Lei Geral de Proteção de Dados](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

**Bom trabalho e boas contribuições! 🚀**
