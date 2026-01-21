# Ciclo de Desempenho Automatizado (CDA)

> Sistema automatizado para gestão de ciclos de desempenho, avaliações de colaboradores e planejamento de carreira.

![Versão do Projeto](https://img.shields.io/badge/version-1.0.0-blue)
![Licença](https://img.shields.io/badge/license-ISC-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-informational)

---

##  Sobre o Projeto

O **Ciclo de Desempenho Automatizado (CDA)** é uma plataforma web que transforma o processo manual de avaliação de desempenho em um fluxo de trabalho digital, integrado e eficiente. O sistema foi projetado para que gestores, analistas de RH e colaboradores trabalhem de forma sincronizada e transparente.

### Principais Funcionalidades

- **Gestão de Ciclos de Desempenho**: Crie e gerencie ciclos de avaliação anuais ou de experiência.
- **Avaliações Flexíveis**: Suporte para autoavaliação e avaliação do gestor.
- **Matriz Nine Box**: Posicionamento automático de colaboradores na matriz de desempenho vs. potencial.
- **Cálculo de Mérito**: Lógica para cálculo de pontuações e mérito.
- **Planos de Carreira**: Estruturação de trilhas de desenvolvimento para os colaboradores.
- **Painéis e Relatórios**: Visualização de dados de desempenho para gestores e RH.
- **Gestão de Colaboradores**: Cadastro e gerenciamento de usuários, cargos e perfis.

---

## 🛠️ Stack Tecnológico

- **Backend**: Node.js, Express.js, TypeScript
- **Banco de Dados**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Gerenciador de Pacotes**: npm
- **Ambiente de Execução**: ts-node

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### 1. Pré-requisitos

- **Node.js**: Versão 18 ou superior.
- **npm**: Geralmente instalado junto com o Node.js.
- **PostgreSQL**: Versão 12 ou superior.
- **Git**: Para clonar o repositório.

### 2. Clone o Repositório

```bash
git clone https://github.com/at-adorno/cda.git
cd cda
```

### 3. Instale as Dependências

Este comando instalará todas as dependências do backend listadas no `package.json`.

```bash
npm install
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto. Este arquivo armazenará suas credenciais de banco de dados de forma segura.

**Exemplo de arquivo `.env`:**
```dotenv
# Credenciais do Banco de Dados PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=cda_db
DB_PASSWORD=sua_senha_secreta
DB_PORT=5432
```
> **Aviso**: Certifique-se de que o arquivo `.env` esteja listado no seu `.gitignore` para evitar que segredos sejam enviados ao repositório.

### 5. Configure o Banco de Dados

Você precisará de um cliente PostgreSQL (como `psql` ou DBeaver) para executar os scripts.

**a. Crie o Banco de Dados:**
Primeiro, crie a base de dados que você configurou no arquivo `.env` (ex: `cda_db`).

```sql
CREATE DATABASE cda_db;
```

**b. Crie a Estrutura das Tabelas (DDL):**
Execute o script `banco.sql` para criar todas as tabelas, tipos e relações.

```bash
# Exemplo de execução via psql
psql -U seu_usuario -d cda_db -f src/scripts/banco.sql
```

**c. Popule o Banco com Dados de Teste (DML):**
Execute o script `popula_banco.sql` para inserir dados de teste, incluindo 10 usuários, ciclos, avaliações, etc.

```bash
# Exemplo de execução via psql
psql -U seu_usuario -d cda_db -f src/scripts/popula_banco.sql
```

**d. (Opcional) Limpando o Banco de Dados:**
Se precisar apagar todos os dados para recomeçar, utilize o script `limpar_banco.sql`.

```bash
# Exemplo de execução via psql
psql -U seu_usuario -d cda_db -f src/scripts/limpar_banco.sql
```

### 6. Execute a Aplicação

Com o banco de dados configurado, inicie o servidor da API.

```bash
npm start
```

O servidor será iniciado na porta `4000` (ou na porta definida em `process.env.PORT`). Você verá a mensagem: `API server listening on http://localhost:4000`.

### 7. Acesse as Páginas Web

As páginas HTML estão na pasta `public/`. Após iniciar o servidor, você pode acessá-las diretamente pelo navegador. Por exemplo:
- **Página Inicial**: `http://localhost:4000/`
- **Cadastro de Usuário**: `http://localhost:4000/pages/cadastro-usuario.html`
- **Consulta de Avaliação**: `http://localhost:4000/pages/consulta-avaliacao.html`
- **Painel de Desempenho**: `http://localhost:4000/pages/desempenho-usuario.html`
- **Relatório de Avaliações**: `http://localhost:4000/pages/relatorio-avaliacoes.html`

---

## 📝 Scripts Disponíveis no Projeto

- **`npm start`**: Inicia o servidor da aplicação em modo de desenvolvimento com `ts-node-dev`.
- **`npm run build`**: Compila o código TypeScript para JavaScript.
- **`npm run test-db`**: Executa um script para testar a conexão com o banco de dados.
- **`npm run check-schema`**: Roda um script que verifica a consistência do esquema do banco.

---

## 📁 Estrutura de Pastas

```
cda/
├── .env
├── CONTRIBUTING.md
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── docs/
│   ├── apoio/
│   ├── api.md
│   ├── casos_de_uso.png
│   ├── cronograma.md
│   ├── DAS_Ciclo_de_Desenvolvimento_Automatizado.md
│   ├── Diagrama der
│   ├── requisitos.md
│   └── Sistema-de-Ciclo-de-Desempenho-Automatizado.pdf
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── cadastro-usuario.js
│   │   ├── consulta-avaliacao.js
│   │   ├── desempenho-usuario.js
│   │   └── relatorio-avaliacoes.js
│   └── pages/
│       ├── cadastro-usuario.html
│       ├── consulta-avaliacao.html
│       ├── desempenho-usuario.html
│       └── relatorio-avaliacoes.html
└── src/
    ├── app.ts
    ├── config/
    │   └── db.ts
    ├── controllers/
    │   ├── AvaliacaoController.ts
    │   ├── CargoController.ts
    │   ├── CicloColaboradorController.ts
    │   ├── CicloDesempenhoController.ts
    │   ├── ColaboradorController.ts
    │   ├── CompetenciaController.ts
    │   ├── GestorController.ts
    │   ├── MetaController.ts
    │   ├── NineBoxController.ts
    │   ├── PerfilController.ts
    │   ├── PlanoCarreiraController.ts
    │   ├── PontuacaoController.ts
    │   └── UsuarioController.ts
    ├── repositories/
    │   ├── AvaliacaoRepository.ts
    │   ├── CargoRepository.ts
    │   ├── CicloColaboradorRepository.ts
    │   ├── CicloDesempenhoRepository.ts
    │   ├── ColaboradorRepository.ts
    │   ├── CompetenciaRepository.ts
    │   ├── GestorRepository.ts
    │   ├── MetaRepository.ts
    │   ├── NineBoxRepository.ts
    │   ├── PerfilRepository.ts
    │   ├── PlanoCarreiraRepository.ts
    │   ├── PontuacaoRepository.ts
    │   └── UsuarioRepository.ts
    ├── routes/
    │   ├── avaliacaoRoute.ts
    │   ├── cargoRoute.ts
    │   ├── cicloColaboradorRoutes.ts
    │   ├── cicloDesempenhoRoutes.ts
    │   ├── colaboradorRoutes.ts
    │   ├── competenciaRoutes.ts
    │   ├── gestorRoutes.ts
    │   ├── metaRoutes.ts
    │   ├── nineBoxRoutes.ts
    │   ├── perfilRoutes.ts
    │   ├── planoCarreiraRoutes.ts
    │   ├── pontuacaoRoutes.ts
    │   └── usuarioRoutes.ts
    ├── scripts/
    │   ├── banco.sql
    │   ├── check-schema.ts
    │   ├── limpar_banco.sql
    │   ├── popula_banco.sql
    │   └── test-db-connection.ts
    ├── services/
    │   ├── AvaliacaoService.ts
    │   ├── CargoService.ts
    │   ├── CicloColaboradorService.ts
    │   ├── CicloDesempenhoService.ts
    │   ├── ColaboradorService.ts
    │   ├── CompetenciaService.ts
    │   ├── GestorService.ts
    │   ├── MetaService.ts
    │   ├── NineBoxService.ts
    │   ├── PerfilService.ts
    │   ├── PlanoCarreiraService.ts
    │   ├── PontuacaoService.ts
    │   └── UsuarioService.ts
    └── types/
        ├── Avaliacao.ts
        ├── Cargo.ts
        ├── CicloColaborador.ts
        ├── CicloDesempenho.ts
        ├── Colaborador.ts
        ├── Competencia.ts
        ├── Gestor.ts
        ├── Meta.ts
        ├── NineBox.ts
        ├── Perfil.ts
        ├── PlanoCarreira.ts
        ├── Pontuacao.ts
        ├── shims-js.d.ts
        └── Usuario.ts
```

---

## 📚 Rotas da API

A API é o núcleo do sistema, servindo os dados para as páginas web. Os endpoints RESTful seguem os padrões de mercado.

Para uma documentação detalhada da API, incluindo exemplos de requisição e resposta, consulte o arquivo:
[**docs/api.md**](./docs/api.md)

Para uma lista completa de endpoints disponíveis, consulte o arquivo:
[**docs/apoio/endpoints_completos.md**](./docs/apoio/endpoints_completos.md)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Este projeto segue um fluxo de trabalho estruturado. Para mais detalhes sobre como contribuir, padrões de commit e processo de Pull Request, leia o nosso **[GUIA DE CONTRIBUIÇÃO](./CONTRIBUTING.md)**.

---

## 📄 Licença

Este projeto está licenciado sob a **ISC License**. Veja o `package.json` para mais detalhes.