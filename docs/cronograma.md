***

# Cronograma Detalhado — Ciclo de Desempenho Automatizado (MVP)

| Sprint | Tarefa                                                            | Responsável        | Estimativa (h) |
|--------|-------------------------------------------------------------------|--------------------|----------------|
| 1      | Setup do ambiente (VSCode, Node, Postgres, extensão, Git)         | Todos              | 4              |
| 1      | Estruturação base do projeto (pastas e configs iniciais)          | Andre              | 4              |
| 1      | Modelagem de dados (DER, dicionário)                              | Wanessa            | 8              |
| 1      | Scripts SQL do banco e carga inicial                              | Wanessa            | 4              |
| 1      | Documentação inicial: README/setup                                | Isabella           | 4              |
| 2      | Service e rotas de autenticação (JWT, bcrypt)                     | Andre/Alessandra   | 8 (4 cada)     |
| 2      | CRUD de usuários (services, rotas, controller)                    | Andre/Alessandra   | 8 (4 cada)     |
| 2      | CRUD colaboradores + importação CSV                               | Andre/Alessandra   | 12 (6 cada)    |
| 2      | Testes unitários (auth, users, employees)                         | Diciane            | 4              |
| 2      | Documentação das APIs iniciais (Swagger)                          | Isabella           | 4              |
| 3      | CRUD de ciclos de avaliação                                       | Andre/Alessandra   | 8 (4 cada)     |
| 3      | Service e rotas de avaliações (auto + gestor)                     | Andre/Alessandra   | 8 (4 cada)     |
| 3      | Testes de integração ciclos/avaliações                            | Diciane            | 4              |
| 3      | Doc APIs de ciclos/avaliações (Swagger)                           | Isabella           | 4              |
| 4      | Algoritmo de cálculo de mérito                                    | Andre              | 6              |
| 4      | Service de consolidação/histórico de resultados                   | Andre/Alessandra   | 8 (4 cada)     |
| 4      | Testes do cálculo/resultado                                       | Diciane            | 4              |
| 4      | Doc do cálculo/histórico                                          | Isabella           | 2              |
| 5      | Service de dashboards (gestor/colab)                              | Andre              | 5              |
| 5      | Visualização Nine Box                                             | Andre              | 4              |
| 5      | Sistema de notificações/email                                     | Andre/Alessandra   | 5 (3/2)        |
| 5      | Testes dashboards/notificações                                    | Diciane            | 4              |
| 5      | Doc dashboards/Nine Box                                           | Isabella           | 2              |
| 6      | Testes E2E e de carga                                             | Diciane            | 6              |
| 6      | Doc final (Swagger/README/manual usuário)                         | Isabella           | 6              |
| 6      | Correção de bugs e ajustes finais                                 | Todos              | 6              |
| 6      | Apresentação do projeto                                           | Todos              | 2              |

***

## Observações

- Sprints: 2 semanas cada (~16h disponíveis/aluno/sprint)
- Algumas tarefas são paralelas (services+rotas; documentar enquanto desenvolve)
- Total estimado por pessoa ao final: entre 30–50h líquidas de desenvolvimento (nível júnior, com apoio de IA)
- Ajuste conforme andamento do grupo; inclua tempo extra para revisões/code review

***