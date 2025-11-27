# Endpoints da API - Sistema de Ciclo de Desempenho

## Gestor

### GET /api/gestor/dashboard/:gestorId/:cicloId
Retorna visão consolidada com scores e status.

**Parâmetros:**
- gestorId (number)
- cicloId (number)

### GET /api/gestor/colaborador/:colaboradorId/:cicloId
Detalhes completos do colaborador.

**Parâmetros:**
- colaboradorId (number)
- cicloId (number)

### GET /api/gestor/colaborador/:colaboradorId/competencias/:cicloId
Notas por competência.

### GET /api/gestor/colaborador/:colaboradorId/metas/:cicloId
Status das metas.

### GET /api/gestor/ninebox/:gestorId/:cicloId
Matriz Nine Box da equipe.

### GET /api/gestor/colaborador/:colaboradorId/historico
Histórico do colaborador.

### GET /api/gestor/estatisticas/:gestorId/:cicloId
Médias e totalizações.

### GET /api/gestor/alerta/:gestorId/:cicloId
Colaboradores em atenção.

### GET /api/gestor/comparativo/:gestorId
Comparativo entre ciclos.

## Colaborador

### GET /api/colaborador/perfil/:id
Consulta seu perfil.

### GET /api/colaborador/metas/:id/:cicloId
Metas do colaborador.

### GET /api/colaborador/feedback/:id/:cicloId
Feedback do gestor.

## Admin

### POST /api/admin/usuarios/importar
Importar usuários via CSV.

### POST /api/admin/colaboradores/importar
Importar colaboradores via CSV.

### POST /api/admin/ciclos
Criar ciclo.

### POST /api/admin/competencias
Criar competências.

### POST /api/admin/ninebox/configurar
Cadastrar configuração.

### GET /api/admin/ninebox/configuracao
Consultar configuração.

### PUT /api/admin/ninebox/configuracao/:id
Atualizar configuração.
