# Definição de Arquitetura - Ciclo de Desempenho

**Documento:** Definição de Arquitetura - Ciclo de Desempenho  
**Data:** 09/11/2025  

---

## 1. Stack Tecnológico Escolhido

- **Backend:** Node.js com TypeScript  
- **Framework:** Express.js  
- **Banco de Dados:** PostgreSQL  
- **Fila de Mensagens:** Redis + Bull  
- **Documentação:** Swagger  
- **Controle de Versão:** Git  
- **Gestão de Projeto:** Trello  

---

## 2. Decisões de Desenvolvimento

- **Nomenclatura de Branches:** Seguiremos o padrão `feature/nome-da-funcionalidade`.  
  Exemplo: `feature/crud-ciclo-desempenho`.  
- **Revisão de PRs:** Programação por pares onde Alessandra será revisora dos PRs modificados pelo André e vice-versa.

---

## 3. Estrutura de Pastas

```
ciclo-desempenho-backend/
├── src/
│   ├── config/         # Configurações (DB, Redis, Swagger)
│   ├── repositories/   # Acesso a dados (queries SQL, CRUD por entidade)
│   ├── services/       # Lógica de negócio, validações, orquestração
│   ├── controlers/     # Controladores HTTP (Express)
│   ├── routes/         # Definição de rotas Express
│   ├── app.ts          # Configuração Express
│   └── server.ts       # Inicialização
├── public/              # Tela do colaborador
├── scripts/             # Scripts SQL
├── docs/                # Documentação
```
