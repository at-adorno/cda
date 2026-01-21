# Documentação da API

## Usuários

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/usuarios | Cria um novo usuário | `{ "email": "user@example.com", "nome": "Nome do Usuário", "perfil_id": 1, "senha": "password123" }` | `{ "id": 1, "email": "user@example.com", "nome": "Nome do Usuário", "perfil_id": 1 }` | 201, 400 |
| GET | /api/usuarios | Lista todos os usuários | — | `[{ "id": 1, "email": "user@example.com", "nome": "Nome do Usuário", "perfil_id": 1 }]` | 200, 500 |
| GET | /api/usuarios/:id | Detalha um usuário | — | `{ "id": 1, "email": "user@example.com", "nome": "Nome do Usuário", "perfil_id": 1 }` | 200, 404, 500 |
| PUT | /api/usuarios/:id | Atualiza um usuário | `{ "email": "new@example.com", "nome": "Novo Nome" }` | `{ "id": 1, "email": "new@example.com", "nome": "Novo Nome", "perfil_id": 1 }` | 200, 404, 500 |
| DELETE | /api/usuarios/:id | Remove um usuário | — | `{}` | 204, 404, 500 |

## Perfis

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/perfis | Cria um novo perfil | `{ "nome": "Admin", "descricao": "Administrador", "permissoes": ["all"], "ativo": true }` | `{ "id": 1, "nome": "Admin", "descricao": "Administrador", "permissoes": ["all"], "ativo": true }` | 201, 500 |
| GET | /api/perfis | Lista todos os perfis | — | `[{ "id": 1, "nome": "Admin", "descricao": "Administrador", "permissoes": ["all"], "ativo": true }]` | 200, 500 |
| GET | /api/perfis/:id | Detalha um perfil | — | `{ "id": 1, "nome": "Admin", "descricao": "Administrador", "permissoes": ["all"], "ativo": true }` | 200, 404 |
| PUT | /api/perfis/:id | Atualiza um perfil | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "descricao": "Administrador", "permissoes": ["all"], "ativo": true }` | 200, 404 |
| DELETE | /api/perfis/:id | Remove um perfil | — | `{}` | 204, 404 |

## Cargos

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/cargos | Cria um novo cargo | `{ "titulo": "Desenvolvedor", "descricao": "Desenvolvedor de Software" }` | `{ "id": 1, "titulo": "Desenvolvedor", "descricao": "Desenvolvedor de Software" }` | 201 |
| GET | /api/cargos | Lista todos os cargos | — | `[{ "id": 1, "titulo": "Desenvolvedor", "descricao": "Desenvolvedor de Software" }]` | 200 |
| GET | /api/cargos/:id | Detalha um cargo | — | `{ "id": 1, "titulo": "Desenvolvedor", "descricao": "Desenvolvedor de Software" }` | 200, 404 |
| PUT | /api/cargos/:id | Atualiza um cargo | `{ "titulo": "Novo Titulo" }` | `{ "id": 1, "titulo": "Novo Titulo", "descricao": "Desenvolvedor de Software" }` | 200, 404 |
| DELETE | /api/cargos/:id | Remove um cargo | — | `{}` | 204 |

## Colaboradores

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/colaboradores | Cria um novo colaborador | `{ "nome": "Colaborador", "cargo_id": 1, "gestor_id": 1, "matricula": "12345" }` | `{ "id": 1, "nome": "Colaborador", "cargo_id": 1, "gestor_id": 1, "matricula": "12345" }` | 201, 400 |
| GET | /api/colaboradores | Lista todos os colaboradores | — | `[{ "id": 1, "nome": "Colaborador", "cargo_id": 1, "gestor_id": 1, "matricula": "12345" }]` | 200, 500 |
| GET | /api/colaboradores/:id | Detalha um colaborador | — | `{ "id": 1, "nome": "Colaborador", "cargo_id": 1, "gestor_id": 1, "matricula": "12345" }` | 200, 404, 500 |
| GET | /api/colaboradores/:id/ultima-avaliacao | Obtém a última avaliação de um colaborador | — | `{ ... }` | 200, 404, 500 |
| PUT | /api/colaboradores/:id | Atualiza um colaborador | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "cargo_id": 1, "gestor_id": 1, "matricula": "12345" }` | 200, 404, 500 |
| DELETE | /api/colaboradores/:id | Remove um colaborador | — | `{}` | 204, 500 |

## Ciclos de Desempenho

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/ciclosDesempenho | Cria um novo ciclo de desempenho | `{ "nome": "Ciclo 2024", "data_inicio": "2024-01-01", "data_fim": "2024-12-31" }` | `{ "id": 1, "nome": "Ciclo 2024", "data_inicio": "2024-01-01", "data_fim": "2024-12-31" }` | 201, 400 |
| GET | /api/ciclosDesempenho | Lista todos os ciclos de desempenho | — | `[{ "id": 1, "nome": "Ciclo 2024", "data_inicio": "2024-01-01", "data_fim": "2024-12-31" }]` | 200, 500 |
| GET | /api/ciclosDesempenho/:id | Detalha um ciclo de desempenho | — | `{ "id": 1, "nome": "Ciclo 2024", "data_inicio": "2024-01-01", "data_fim": "2024-12-31" }` | 200, 404 |
| PUT | /api/ciclosDesempenho/:id | Atualiza um ciclo de desempenho | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "data_inicio": "2024-01-01", "data_fim": "2024-12-31" }` | 200, 404 |
| DELETE | /api/ciclosDesempenho/:id | Remove um ciclo de desempenho | — | `{}` | 204, 500 |

## Avaliações

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/avaliacoes | Cria uma nova avaliação | `{ "ciclo_colaborador_id": 1, "avaliador_id": 1, "tipo": "GESTOR", "status": "PENDENTE" }` | `{ "id": 1, "ciclo_colaborador_id": 1, "avaliador_id": 1, "tipo": "GESTOR", "status": "PENDENTE" }` | 201 |
| GET | /api/avaliacoes | Lista todas as avaliações | — | `[{ "id": 1, "ciclo_colaborador_id": 1, "avaliador_id": 1, "tipo": "GESTOR", "status": "PENDENTE" }]` | 200 |
| GET | /api/avaliacoes/:id | Detalha uma avaliação | — | `{ "id": 1, "ciclo_colaborador_id": 1, "avaliador_id": 1, "tipo": "GESTOR", "status": "PENDENTE" }` | 200, 404 |
| PUT | /api/avaliacoes/:id | Atualiza uma avaliação | `{ "status": "CONCLUIDA" }` | `{ "id": 1, "ciclo_colaborador_id": 1, "avaliador_id": 1, "tipo": "GESTOR", "status": "CONCLUIDA" }` | 200 |
| DELETE | /api/avaliacoes/:id | Remove uma avaliação | — | `{}` | 204 |

## Competências

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/competencias | Cria uma nova competência | `{ "nome": "Comunicação", "descricao": "...", "peso": 2 }` | `{ "id": 1, "nome": "Comunicação", "descricao": "...", "peso": 2 }` | 201 |
| GET | /api/competencias | Lista todas as competências | — | `[{ "id": 1, "nome": "Comunicação", "descricao": "...", "peso": 2 }]` | 200 |
| GET | /api/competencias/:id | Detalha uma competência | — | `{ "id": 1, "nome": "Comunicação", "descricao": "...", "peso": 2 }` | 200, 404 |
| PUT | /api/competencias/:id | Atualiza uma competência | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "descricao": "...", "peso": 2 }` | 200, 404 |
| DELETE | /api/competencias/:id | Remove uma competência | — | `{}` | 204 |

## Metas

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/metas | Cria uma nova meta | `{ "titulo": "Aumentar Vendas", "descricao": "...", "peso": 3, "prazo": "2024-12-31" }` | `{ "id": 1, "titulo": "Aumentar Vendas", "descricao": "...", "peso": 3, "prazo": "2024-12-31" }` | 201 |
| GET | /api/metas | Lista todas as metas | — | `[{ "id": 1, "titulo": "Aumentar Vendas", "descricao": "...", "peso": 3, "prazo": "2024-12-31" }]` | 200 |
| GET | /api/metas/:id | Detalha uma meta | — | `{ "id": 1, "titulo": "Aumentar Vendas", "descricao": "...", "peso": 3, "prazo": "2024-12-31" }` | 200, 404 |
| PUT | /api/metas/:id | Atualiza uma meta | `{ "titulo": "Novo Titulo" }` | `{ "id": 1, "titulo": "Novo Titulo", "descricao": "...", "peso": 3, "prazo": "2024-12-31" }` | 200, 404 |
| DELETE | /api/metas/:id | Remove uma meta | — | `{}` | 204 |

## Planos de Carreira

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/planoCarreiras | Cria um novo plano de carreira | `{ "nome": "Plano de Carreira 2024", "descricao": "...", "versao": "1.0", "publicado": true }` | `{ "id": 1, "nome": "Plano de Carreira 2024", "descricao": "...", "versao": "1.0", "publicado": true }` | 201 |
| GET | /api/planoCarreiras | Lista todos os planos de carreira | — | `[{ "id": 1, "nome": "Plano de Carreira 2024", "descricao": "...", "versao": "1.0", "publicado": true }]` | 200 |
| GET | /api/planoCarreiras/:id | Detalha um plano de carreira | — | `{ "id": 1, "nome": "Plano de Carreira 2024", "descricao": "...", "versao": "1.0", "publicado": true }` | 200, 404 |
| PUT | /api/planoCarreiras/:id | Atualiza um plano de carreira | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "descricao": "...", "versao": "1.0", "publicado": true }` | 200, 404 |
| DELETE | /api/planoCarreiras/:id | Remove um plano de carreira | — | `{}` | 204 |

## Gestores

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/gestores | Cria um novo gestor | `{ "nome": "Gestor", "cargo_id": 1, "matricula": "54321" }` | `{ "id": 1, "nome": "Gestor", "cargo_id": 1, "matricula": "54321" }` | 201 |
| GET | /api/gestores | Lista todos os gestores | — | `[{ "id": 1, "nome": "Gestor", "cargo_id": 1, "matricula": "54321" }]` | 200 |
| GET | /api/gestores/:id | Detalha um gestor | — | `{ "id": 1, "nome": "Gestor", "cargo_id": 1, "matricula": "54321" }` | 200, 404 |
| PUT | /api/gestores/:id | Atualiza um gestor | `{ "nome": "Novo Nome" }` | `{ "id": 1, "nome": "Novo Nome", "cargo_id": 1, "matricula": "54321" }` | 200 |
| DELETE | /api/gestores/:id | Remove um gestor | — | `{}` | 204 |

## NineBox

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/nineBoxes | Cria um novo NineBox | `{ "ciclo_colaborador_id": 1, "posicao_x_potencial": "A", "posicao_y_desempenho": "1", ... }` | `{ "id": 1, "ciclo_colaborador_id": 1, "posicao_x_potencial": "A", "posicao_y_desempenho": "1", ... }` | 201 |
| GET | /api/nineBoxes | Lista todos os NineBoxes | — | `[{ "id": 1, "ciclo_colaborador_id": 1, "posicao_x_potencial": "A", "posicao_y_desempenho": "1", ... }]` | 200 |
| GET | /api/nineBoxes/:id | Detalha um NineBox | — | `{ "id": 1, "ciclo_colaborador_id": 1, "posicao_x_potencial": "A", "posicao_y_desempenho": "1", ... }` | 200, 404 |
| PUT | /api/nineBoxes/:id | Atualiza um NineBox | `{ "posicao_x_potencial": "B" }` | `{ "id": 1, "ciclo_colaborador_id": 1, "posicao_x_potencial": "B", "posicao_y_desempenho": "1", ... }` | 200 |
| DELETE | /api/nineBoxes/:id | Remove um NineBox | — | `{}` | 204 |

## Pontuações

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/pontuacoes | Cria uma nova pontuação | `{ "avaliacao_id": 1, "competencia_id": 1, "nota": 5 }` | `{ "id": 1, "avaliacao_id": 1, "competencia_id": 1, "nota": 5 }` | 201 |
| GET | /api/pontuacoes | Lista todas as pontuações | — | `[{ "id": 1, "avaliacao_id": 1, "competencia_id": 1, "nota": 5 }]` | 200 |
| GET | /api/pontuacoes/:id | Detalha uma pontuação | — | `{ "id": 1, "avaliacao_id": 1, "competencia_id": 1, "nota": 5 }` | 200, 404 |
| PUT | /api/pontuacoes/:id | Atualiza uma pontuação | `{ "nota": 4 }` | `{ "id": 1, "avaliacao_id": 1, "competencia_id": 1, "nota": 4 }` | 200 |
| DELETE | /api/pontuacoes/:id | Remove uma pontuação | — | `{}` | 204 |

## Ciclos de Colaborador

| Método | Rota | Descrição | Body | Response | Status |
| --- | --- | --- | --- | --- | --- |
| POST | /api/ciclosColaborador | Cria um novo ciclo de colaborador | `{ "cicloId": 1, "colaboradorId": 1 }` | `{ "id": 1, "cicloId": 1, "colaboradorId": 1 }` | 201 |
| GET | /api/ciclosColaborador | Lista todos os ciclos de colaborador | — | `[{ "id": 1, "cicloId": 1, "colaboradorId": 1 }]` | 200 |
| GET | /api/ciclosColaborador/:id | Detalha um ciclo de colaborador | — | `{ "id": 1, "cicloId": 1, "colaboradorId": 1 }` | 200, 404 |
| GET | /api/ciclosColaborador/ciclo/:cicloId | Lista ciclos de colaborador por ciclo | — | `[{ "id": 1, "cicloId": 1, "colaboradorId": 1 }]` | 200 |
| GET | /api/ciclosColaborador/colaborador/:colaboradorId | Lista ciclos de colaborador por colaborador | — | `[{ "id": 1, "cicloId": 1, "colaboradorId": 1 }]` | 200 |
| PUT | /api/ciclosColaborador/:id | Atualiza um ciclo de colaborador | `{ "statusExperiencia": "APROVADO" }` | `{ "id": 1, "cicloId": 1, "colaboradorId": 1, "statusExperiencia": "APROVADO" }` | 200, 404 |
| DELETE | /api/ciclosColaborador/:id | Remove um ciclo de colaborador | — | `{}` | 204 |
