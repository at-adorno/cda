***

# Plano de Projeto – Ciclo de Desempenho Automatizado (MVP)

## 1. Informações Gerais

- **Nome:** Sistema de Ciclo de Desempenho Automatizado – MVP
- **Instituição:** Curso de Desenvolvimento Backend com JavaScript/TypeScript
- **Duração:** 3 meses (12 semanas / 24 encontros)
- **Frequência:** 2 encontros semanais
- **Data de Início:** Outubro 2025
- **Público-Alvo:** Alunos iniciantes em desenvolvimento backend

***

## 2. Equipe do Projeto

| Nome       | Papel                   | Responsabilidades                                     |
|------------|-------------------------|-------------------------------------------------------|
| Wanessa    | Modeladora de Dados     | Modelagem do banco de dados, criação do DER, scripts  |
| Alessandra | Desenvolvedora de Rotas | Endpoints da API, controllers, integração             |
| Andre      | Lógica de Negócio       | Services, regras de negócio, algoritmos               |
| Diciane    | Integração e Testes     | Testes unitários, integração, E2E                     |
| Isabella   | Documentação            | Swagger, README, manuais de uso                       |

***

## 3. Contexto e Objetivo

**Problemas:**
- Processo manual e fragmentado em planilhas
- 30% de divergências nas avaliações
- Sobrecarga dos gestores
- Falta de histórico consolidado
- Atrasos em promoções
- Baixa visibilidade ao colaborador

**Objetivo do MVP:**
- API REST para automatizar o ciclo de avaliações:
    - Gestão de colaboradores e usuários
    - Gestão dos ciclos de avaliação
    - Autoavaliação e avaliação pelo gestor
    - Cálculo automático de mérito
    - Visualização Nine Box (estática)
    - Notificações via e-mail
    - Dashboards e histórico básico

***

## 4. Escopo e Decisões do MVP

- Importação de dados via CSV (sem integração com folha de pagamento)
- Autenticação JWT simples
- Nine Box estático (automação futura só na documentação)
- Notificações apenas por e-mail (sem push)
- Fórmula de mérito: **(Autoavaliação × 0.3) + (Gestor × 0.7)**
- Foco no essencial, robustez no básico

***

## 5. Requisitos Funcionais

### RF1: Gestão do Ciclo de Avaliação

- **RF1.1** Importação de Colaboradores via CSV  
  Sistema deve permitir importação em lote de colaboradores por arquivo CSV.

- **RF1.2** Criação de Ciclo de Avaliação  
  RH pode criar ciclos informando período, participantes e critérios.

- **RF1.3** Distribuição Automática de Formulários  
  Sistema envia notificações por email aos participantes quando o ciclo inicia.

- **RF1.4** Autoavaliação  
  Colaborador preenche formulário de autoavaliação.

- **RF1.5** Avaliação do Gestor  
  Gestor avalia subordinados utilizando o mesmo formulário.

- **RF1.6** Fechamento do Ciclo  
  RH fecha o ciclo após conclusão de todas as avaliações.

***

### RF2: Cálculo de Mérito

- **RF2.1** Algoritmo de Cálculo Simples  
  Calcular mérito usando média ponderada:  
  **(Autoavaliação × 0.3) + (Gestor × 0.7)**

- **RF2.2** Visualização Nine Box Estática  
  Exibir matriz Nine Box posicionando colaboradores pelo resultado do cálculo.  
  _Movimentação automática/documentada apenas para o futuro._

- **RF2.3** Histórico de Avaliações  
  Armazenar e exibir histórico das avaliações do colaborador.

***

### RF3: Painéis e Dashboards

- **RF3.1** Painel do Gestor  
  Dashboard com visão da equipe, status das avaliações e métricas.

- **RF3.2** Painel do Colaborador  
  Visualização do próprio desempenho, histórico e feedback.

***

### RF4: Notificações e Comunicação

- **RF4.1** Notificações por Email  
  Envio de emails de início de ciclo, lembretes de prazo, conclusão de avaliação.

***

## 6. Requisitos Não Funcionais

- **RNF1** Autenticação via JWT (expiração 24h)
- **RNF2** Senhas com hash bcrypt (custo 10)
- **RNF3** Controle de acesso por role (RH, Gestor, Colaborador)
- **RNF4** APIs com tempo de resposta < 500ms
- **RNF5** Suportar até 500 usuários simultâneos
- **RNF6** Disponibilidade em horário comercial (8h-18h)
- **RNF7** APIs RESTful padrão HTTP
- **RNF8** Documentação completa da API via Swagger/OpenAPI
- **RNF9** Código seguindo Clean Code e arquitetura em camadas
- **RNF10** Cobertura mínima de 60% de testes unitários em services

***

## 7. Modelo de Dados (DER)

**Principais Entidades do Sistema**
1. **USUARIOS (users)**
   - id: SERIAL PRIMARY KEY
   - email: VARCHAR(255) UNIQUE NOT NULL
   - senha_hash: VARCHAR(255) NOT NULL
   - nome: VARCHAR(255) NOT NULL
   - role: ENUM('RH', 'GESTOR', 'COLABORADOR') NOT NULL
   - ativo: BOOLEAN DEFAULT TRUE

2. **COLABORADORES (employees)**
   - id: SERIAL PRIMARY KEY
   - usuario_id: INTEGER REFERENCES users(id)
   - matricula: VARCHAR(50) UNIQUE NOT NULL
   - nome_completo: VARCHAR(255) NOT NULL
   - cargo: VARCHAR(100)
   - departamento: VARCHAR(100)
   - gestor_id: INTEGER REFERENCES employees(id) NULL
   - data_admissao: DATE
   - ativo: BOOLEAN DEFAULT TRUE

3. **CICLOS_AVALIACAO (evaluation_cycles)**
   - id: SERIAL PRIMARY KEY
   - nome: VARCHAR(255) NOT NULL
   - descricao: TEXT
   - data_inicio: DATE NOT NULL
   - data_fim: DATE NOT NULL
   - status: ENUM('PLANEJAMENTO', 'ATIVO', 'FECHADO') DEFAULT 'PLANEJAMENTO'
   - peso_autoavaliacao: DECIMAL(3,2) DEFAULT 0.30
   - peso_avaliacao_gestor: DECIMAL(3,2) DEFAULT 0.70
   - criado_por: INTEGER REFERENCES users(id)

4. **CRITERIOS_AVALIACAO (evaluation_criteria)**
   - id: SERIAL PRIMARY KEY
   - ciclo_id: INTEGER REFERENCES evaluation_cycles(id)
   - nome: VARCHAR(255) NOT NULL
   - descricao: TEXT
   - peso: DECIMAL(3,2) DEFAULT 1.00
   - ordem: INTEGER

5. **AVALIACOES (evaluations)**
   - id: SERIAL PRIMARY KEY
   - ciclo_id: INTEGER REFERENCES evaluation_cycles(id)
   - colaborador_id: INTEGER REFERENCES employees(id)
   - tipo: ENUM('AUTOAVALIACAO', 'AVALIACAO_GESTOR') NOT NULL
   - avaliador_id: INTEGER REFERENCES users(id)
   - status: ENUM('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA') DEFAULT 'PENDENTE'
   - data_inicio: TIMESTAMP
   - data_conclusao: TIMESTAMP
   - UNIQUE(ciclo_id, colaborador_id, tipo)

6. **RESPOSTAS_AVALIACAO (evaluation_answers)**
   - id: SERIAL PRIMARY KEY
   - avaliacao_id: INTEGER REFERENCES evaluations(id)
   - criterio_id: INTEGER REFERENCES evaluation_criteria(id)
   - nota: DECIMAL(3,2) CHECK (nota >= 0 AND nota <= 10)
   - comentario: TEXT
   - UNIQUE(avaliacao_id, criterio_id)

7. **RESULTADOS_FINAIS (final_results)**
   - id: SERIAL PRIMARY KEY
   - ciclo_id: INTEGER REFERENCES evaluation_cycles(id)
   - colaborador_id: INTEGER REFERENCES employees(id)
   - nota_autoavaliacao: DECIMAL(4,2)
   - nota_avaliacao_gestor: DECIMAL(4,2)
   - nota_final: DECIMAL(4,2)
   - quadrante_ninebox: INTEGER CHECK (quadrante_ninebox BETWEEN 1 AND 9)
   - observacoes: TEXT
   - UNIQUE(ciclo_id, colaborador_id)

8. **NOTIFICACOES (notifications)**
   - id: SERIAL PRIMARY KEY
   - usuario_id: INTEGER REFERENCES users(id)
   - tipo: VARCHAR(100) NOT NULL
   - assunto: VARCHAR(255) NOT NULL
   - mensagem: TEXT NOT NULL
   - enviada: BOOLEAN DEFAULT FALSE
   - data_envio: TIMESTAMP

***

**Relacionamentos principais:**
- COLABORADORES → USUARIOS (1:1)
- COLABORADORES → COLABORADORES (N:1 - gestor)
- CICLOS_AVALIACAO → CRITERIOS_AVALIACAO (1:N)
- AVALIACOES → RESPOSTAS_AVALIACAO (1:N)
- CICLOS_AVALIACAO + COLABORADORES → RESULTADOS_FINAIS (N:M pelo ciclo)

***

## 8. Arquitetura do Sistema e Stack

### Stack Tecnológica

- **Backend:** Node.js 18+, TypeScript 5.0+, Express.js 4.18+, TypeORM 0.3+
- **Banco de Dados:** PostgreSQL 12+
- **Principais bibliotecas:**
    - jsonwebtoken (JWT)
    - bcrypt (hash de senhas)
    - nodemailer (envio de emails)
    - joi (validação)
    - swagger-ui-express (documentação)
    - winston (logs)
    - jest + supertest (testes)

***

### Arquitetura em Camadas

**Padrão: MVC / Service Layer**

```
Routes → Controllers → Services → Repositories → Database
           ↓                 ↓
      Middlewares       Lógica de negócio
```

- **Routes:** Definição dos endpoints da API.
- **Controllers:** Recepção das requisições, validação e chamada dos services.
- **Services:** Lógica de negócio, regras e orchestration.
- **Repositories:** Acesso ao banco de dados.
- **Entities:** Definição das estruturas TypeORM, relacionamento das tabelas.
- **Middlewares:** Autenticação JWT, autorização por role, validação, tratamento de erros, logs.

***

## 9. Cronograma do Projeto

### Divisão em Sprints (2 semanas cada)

| Sprint  | Objetivo da Sprint                           | Principais Entregas                      |
|---------|----------------------------------------------|------------------------------------------|
| **1**   | Setup e Fundamentos                         | Ambiente, estrutura, DER, SQL, README    |
| **2**   | Autenticação e Cadastros básicos             | Auth, CRUD usuários/colaboradores, CSV   |
| **3**   | Gestão de Ciclo de Avaliação                 | Ciclos, avaliações, autoavaliação, gestor|
| **4**   | Cálculo de Mérito                            | Algoritmo, consolidação, histórico       |
| **5**   | Painéis e Notificações                       | Dashboards, NineBox, emails automáticos  |
| **6**   | Testes e Documentação final                  | Testes E2E, manuais, apresentação        |

***

### Fases detalhadas por entregável:

#### **Sprint 1:**
- Setup do ambiente (Node.js, TypeScript, PostgreSQL, VSCode)
- Estrutura de pastas do projeto (MVC, services, repositories)
- Modelagem de dados (DER, dicionário de dados)
- Scripts SQL de criação.
- README inicial

#### **Sprint 2:**
- Serviço de autenticação (JWT + bcrypt)
- Rotas de autenticação (/auth/login, /auth/register)
- CRUD de usuários e colaboradores
- Importação de colaboradores via CSV
- Testes unitários; documentação inicial Swagger

#### **Sprint 3:**
- CRUD de ciclos de avaliação
- Serviço e rotas de avaliações: autoavaliação e avaliação do gestor
- Testes de integração
- Documentação APIs dos ciclos

#### **Sprint 4:**
- Algoritmo de cálculo de mérito
- Consolidação dos resultados
- Histórico de avaliações
- Testes do cálculo e documentação do algoritmo

#### **Sprint 5:**
- Dashboard do gestor e colaborador
- Visualização Nine Box
- Sistema de notificações por email
- Integração com serviço de email
- Testes e documentação dos dashboards

#### **Sprint 6:**
- Testes end-to-end
- Testes de carga (simples)
- Documentação final Swagger/OpenAPI
- Manual de instalação/uso
- Correção de bugs e apresentação do MVP

***

## 10. Distribuição de Tarefas por Integrante

| Integrante  | Qtde de Tarefas | Foco Principal         |
|-------------|-----------------|-----------------------|
| Andre       | 13              | Services/lógica       |
| Alessandra  | 8               | Rotas/controllers     |
| Isabella    | 7               | Documentação          |
| Diciane     | 6               | Testes (unit, int, E2E)|
| Wanessa     | 2               | Modelagem inicial     |
| Todos       | 3               | Setup/manual/apresentação|

***


## 11. Dependências e Integrações

### Dependências de Produção (Principais bibliotecas NPM)
| Biblioteca            | Versão    | Finalidade                              |
|-----------------------|-----------|-----------------------------------------|
| express               | ^4.18.0   | Framework web Node.js                   |
| typescript            | ^5.0.0    | Tipagem estática                        |
| typeorm               | ^0.3.17   | ORM                                     |
| pg                    | ^8.11.0   | Cliente PostgreSQL                      |
| jsonwebtoken          | ^9.0.0    | Autenticação JWT                        |
| bcrypt                | ^5.1.0    | Hash de senhas                          |
| joi                   | ^17.9.0   | Validação de dados                      |
| nodemailer            | ^6.9.0    | Envio de emails                         |
| csv-parse             | ^5.4.0    | Importação de arquivos CSV              |
| swagger-ui-express    | ^5.0.0    | Interface e documentação API            |
| winston               | ^3.10.0   | Sistema de logs                         |
| dotenv                | ^16.3.0   | Variáveis de ambiente                   |
| cors                  | ^2.8.5    | Cross-Origin Resource Sharing           |
| helmet                | ^7.0.0    | Headers de segurança HTTP               |
| express-rate-limit    | ^6.10.0   | Limite de requisições                   |

### Dependências de Desenvolvimento

| Biblioteca         | Versão    | Finalidade                        |
|--------------------|-----------|-----------------------------------|
| jest               | ^29.6.0   | Framework de testes unitários     |
| supertest          | ^6.3.0    | Testes de integração HTTP         |
| @types/node        | ^20.4.0   | Tipos TypeScript para Node.js     |
| @types/express     | ^4.17.17  | Tipos TypeScript para Express     |
| eslint             | ^8.45.0   | Linter JavaScript/TypeScript      |
| prettier           | ^3.0.0    | Formatação de código              |
| ts-node-dev        | ^2.0.0    | Hot reload desenvolvimento        |

### Integrações Externas

- **Servidor SMTP** (Gmail, SendGrid ou Mailtrap para testes)
- **Configuração:** credenciais no arquivo `.env`
- **Banco de Dados PostgreSQL** (local ou cloud)
- **Connection string** configurada no `.env`

***


## 12. Estratégia de Testes

### Níveis de Teste

1. **Testes Unitários**
   - Cobertura mínima de 60% na camada de services
   - Foco: lógica de negócio, funções utilitárias
   - Framework: Jest

2. **Testes de Integração**
   - Foco: fluxos completos entre controllers, services e repositories

3. **Testes E2E (End-to-End)**
   - Foco: fluxo completo do usuário, ciclo de avaliação, da inscrição à visualização do resultado

4. **Testes de Carga (básico)**
   - Meta: até 100 usuários simultâneos
   - Ferramenta sugerida: Artillery, K6 ou similar

### Principais Cenários de Teste

- Autenticação JWT (login, token, permissão por role)
- Importação de CSV: validação, erros e sucesso
- Execução completa do ciclo de avaliação
- Cálculo correto do mérito
- Dashboard de gestor e colaborador
- Controle de acesso (somente perfis autorizados por ação)

### Responsáveis
- Testes unitários e integração: Diciane (com apoio de Andre)
- E2E: Diciane
- Testes de carga: Diciane (Sprint 6)

***

## 13. Documentação do Projeto

### Documentação Técnica

- **README.md**
  - Descrição do projeto e objetivo
  - Requisitos de sistema
  - Instruções de instalação/configuração
  - Como executar (dev/prod)
  - Estrutura de diretórios
  - Comandos NPM úteis

- **Swagger/OpenAPI**
  - Todos os endpoints documentados e testáveis
  - Schemas de entrada/saída, exemplos e erros
  - Interface interativa

- **Documentação de código**
  - Comentários explicativos nas funções complexas
  - JSDoc nas interfaces públicas
  - Observações sobre algoritmos e decisões

### Documentação de Usuário

- **Manual de Instalação**
  - Pré-requisitos e dependências
  - Setup do ambiente (Node, Postgres, .env)
  - Troubleshooting para erros comuns

- **Manual de Uso**
  - Fluxos principais da API (autenticação, importação, avaliações, consulta)
  - Uso de exemplos em JSON
  - Orientação de acesso conforme role

- **Guia de Testes**
  - Execução dos testes (unit, integração, E2E)
  - Interpretação dos relatórios
  - Como criar novos testes

***


## 14. Gestão de Riscos

| Risco                                          | Probabilidade | Impacto | Mitigação                                              |
|------------------------------------------------|--------------|---------|--------------------------------------------------------|
| Dificuldade técnica dos alunos                 | Alta         | Alto    | Uso intensivo de IA assistente, pair programming       |
| Atraso no cronograma                          | Média        | Médio   | Buffer na Sprint 6, foco nas funções críticas          |
| Problemas de integração entre módulos          | Média        | Médio   | Testes de integração já a partir da Sprint 2           |
| Qualidade do código                           | Média        | Médio   | Code review em grupo, uso de ESLint/Prettier           |
| Complexidade no cálculo de mérito              | Baixa        | Alto    | Implementar fórmula fixa no MVP, testes automatizados  |
| Falhas de comunicação                         | Média        | Médio   | Daily async, encontros semanais, canais claros         |

***


## 15. Critérios de Sucesso do MVP

**O MVP será considerado bem-sucedido quando:**

- Todas as 12 funcionalidades estiverem implementadas:
    - Autenticação JWT, controle de acesso
    - CRUD de usuários e colaboradores
    - Importação via CSV
    - Gestão dos ciclos de avaliação
    - Autoavaliação e avaliação gestor
    - Cálculo de mérito automatizado
    - Visualização Nine Box (estático)
    - Notificações por email
    - Dashboards básicos
    - Histórico de avaliações

- Cobertura de testes unitários ≥ 60%
- API RESTful totalmente documentada (Swagger)
- Tempo médio de resposta < 500ms
- Sistema sem bugs críticos no demo/apresentação final
- Documentação (README, Swagger, manuais) entregue e validada
- Apresentação funcional do MVP para banca/supervisor

***


## 16. Evolução Futura (Pós-MVP)

**Funcionalidades planejadas para versões futuras:**

### Versão 2.0
- Avaliação 360º (pares e subordinados)
- Nine Box dinâmico (movimentação automática)
- Push notifications (web/mobile)
- Dashboards analíticos com gráficos avançados
- Exportação de relatórios (PDF, Excel)

### Versão 3.0
- Frontend web dedicado (React, Vue ou similar)
- App mobile (React Native ou Flutter)
- Integração com sistemas externos de RH (API)
- SSO (Single Sign-On, Google/MS)
- Algoritmo de mérito configurável no painel do RH
- Machine learning para previsão de desempenho

***

## 17. Recursos de Apoio

### Ferramentas Disponíveis

- **VSCode:** IDE principal
- **PostgreSQL:** Banco de dados relacional
- **Postman/Insomnia:** Testes manuais de API
- **Git/GitHub:** Controle de versão, code review
- **ChatGPT/GitHub Copilot:** Assistentes de IA

### Materiais de Estudo Recomendados

1. **TypeScript:**  
   - Documentação oficial  
   - Curso: "Understanding TypeScript" (Udemy)

2. **Node.js + Express:**  
   - Documentação oficial  
   - Curso: "Node.js The Complete Guide" (Udemy)

3. **TypeORM:**  
   - Documentação oficial  
   - Guias de relacionamento/migrations

4. **Testes:**  
   - Documentação Jest  
   - Guia “Testing Node.js Applications” (MDN)

5. **Clean Architecture:**  
   - Artigos “Clean Architecture for Node.js” (Dev.to)  
   - Princípios SOLID em TypeScript

***

## 18. Organização da Comunicação e Time

### Canais de Comunicação

- **Encontros presenciais:** 2x por semana em sala (terças e quintas das 18h as 21h)
- **Grupo de WhatsApp/Discord:** Comunicação diária (async)
- **Repositório GitHub:** Para issues, code review e controle do progresso
- **Documentação compartilhada:** Google docs, Trello

### Organização do Time e Liderança de Sprint

Cada sprint terá um “líder de sprint” responsável por:
- Coordenar entregas
- Facilitar comunicação
- Resolver bloqueios/pedidos urgentes

**Sugestão de rodízio de liderança:**
- Sprint 1: Wanessa
- Sprint 2: Andre
- Sprint 3: Alessandra
- Sprint 4: Diciane
- Sprint 5: Isabella
- Sprint 6: Todos (co-liderança)

***


## 19. Considerações Finais

Este plano foi elaborado considerando:
- Nível iniciante dos participantes
- Apoio de IA para acelerar o desenvolvimento
- Prazo realista de 3 meses
- MVP funcional, testado e demonstrável
- Base sólida para evoluções futuras

**O sucesso do projeto depende de:**
1. Comprometimento da equipe nos 24 encontros
2. Comunicação clara e frequente
3. Uso estratégico das ferramentas de IA
4. Foco no escopo definido (evitar scope creep)
5. Aprendizado contínuo e colaboração

***

## 20. Anexos

- **Anexo A:** Script SQL completo (`schema_database.sql`)
- **Anexo B:** Estrutura detalhada de pastas do projeto (`estrutura-projeto.md`)
- **Anexo C:** Exemplos de código (Controllers e Services)
- **Anexo D:** Template CSV para importação de colaboradores
- **Anexo E:** Checklist de entrega por Sprint

***

**Documento gerado em:** Outubro 2025  
**Versão:** 1.0  
**Status:** Aprovado para execução

***