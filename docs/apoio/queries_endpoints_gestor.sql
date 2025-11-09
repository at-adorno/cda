-- ============================================
-- QUERIES PARA ENDPOINTS DO GESTOR
-- Sistema de Ciclo de Desempenho
-- ============================================

-- ============================================
-- 1. DASHBOARD DO GESTOR - VISÃO GERAL DA EQUIPE
-- Endpoint: GET /api/gestor/dashboard/:gestorId/:cicloId
-- ============================================

SELECT 
    c.id,
    c.matricula,
    u.nome,
    c.cargo,
    c.departamento,
    c.status,
    COUNT(DISTINCT a.id) as total_avaliacoes,
    COUNT(DISTINCT CASE WHEN a.status = 'CONCLUIDA' THEN a.id END) as avaliacoes_concluidas,
    r.score_merito,
    r.posicao_ninebox,
    CASE 
        WHEN r.score_merito >= 90 THEN 'EXCELENTE'
        WHEN r.score_merito >= 70 THEN 'BOM'
        WHEN r.score_merito >= 50 THEN 'ADEQUADO'
        ELSE 'NECESSITA_MELHORIAS'
    END as status_desempenho
FROM colaboradores c
INNER JOIN usuarios u ON c.usuario_id = u.id
LEFT JOIN avaliacoes a ON c.id = a.colaborador_id AND a.ciclo_id = :cicloId
LEFT JOIN resultados_ciclo r ON c.id = r.colaborador_id AND r.ciclo_id = :cicloId
WHERE c.gestor_id = (SELECT id FROM colaboradores WHERE usuario_id = :gestorId)
    AND c.status IN ('ATIVO', 'EXPERIENCIA')
GROUP BY c.id, u.nome, c.matricula, c.cargo, c.departamento, c.status, r.score_merito, r.posicao_ninebox
ORDER BY r.score_merito DESC NULLS LAST;

-- ============================================
-- 2. DETALHES DE UM COLABORADOR
-- Endpoint: GET /api/gestor/colaborador/:colaboradorId/:cicloId
-- ============================================

SELECT 
    c.id,
    c.matricula,
    u.nome,
    u.email,
    c.cargo,
    c.departamento,
    c.data_admissao,
    c.status,
    r.score_competencias,
    r.score_metas,
    r.score_merito,
    r.score_potencial,
    r.posicao_ninebox,
    r.recomendacao,
    r.data_calculo
FROM colaboradores c
INNER JOIN usuarios u ON c.usuario_id = u.id
LEFT JOIN resultados_ciclo r ON c.id = r.colaborador_id AND r.ciclo_id = :cicloId
WHERE c.id = :colaboradorId;

-- ============================================
-- 3. AVALIAÇÕES DE COMPETÊNCIAS DE UM COLABORADOR
-- Endpoint: GET /api/gestor/colaborador/:colaboradorId/competencias/:cicloId
-- ============================================

SELECT 
    comp.nome as competencia,
    comp.descricao,
    comp.peso,
    ac.nota,
    ac.observacao,
    a.tipo_avaliacao,
    a.data_conclusao
FROM avaliacoes a
INNER JOIN avaliacoes_competencias ac ON a.id = ac.avaliacao_id
INNER JOIN competencias comp ON ac.competencia_id = comp.id
WHERE a.colaborador_id = :colaboradorId 
    AND a.ciclo_id = :cicloId
    AND a.status = 'CONCLUIDA'
ORDER BY comp.nome;

-- ============================================
-- 4. METAS DE UM COLABORADOR
-- Endpoint: GET /api/gestor/colaborador/:colaboradorId/metas/:cicloId
-- ============================================

SELECT 
    m.id,
    m.titulo,
    m.descricao,
    m.peso,
    m.meta_valor,
    m.valor_atingido,
    m.percentual_atingido,
    CASE 
        WHEN m.percentual_atingido >= 100 THEN 'ATINGIDA'
        WHEN m.percentual_atingido >= 80 THEN 'PARCIALMENTE_ATINGIDA'
        ELSE 'NAO_ATINGIDA'
    END as status_meta
FROM metas m
WHERE m.colaborador_id = :colaboradorId 
    AND m.ciclo_id = :cicloId
ORDER BY m.peso DESC, m.percentual_atingido DESC;

-- ============================================
-- 5. MATRIZ NINE BOX DA EQUIPE
-- Endpoint: GET /api/gestor/ninebox/:gestorId/:cicloId
-- ============================================

SELECT 
    c.id,
    u.nome,
    c.cargo,
    r.score_merito as desempenho,
    r.score_potencial as potencial,
    r.posicao_ninebox,
    cnb.nome_quadrante,
    cnb.cor,
    cnb.acoes_recomendadas,
    cnb.posicao_x,
    cnb.posicao_y
FROM colaboradores c
INNER JOIN usuarios u ON c.usuario_id = u.id
INNER JOIN resultados_ciclo r ON c.id = r.colaborador_id AND r.ciclo_id = :cicloId
LEFT JOIN configuracoes_ninebox cnb ON r.posicao_ninebox = cnb.nome_quadrante
WHERE c.gestor_id = (SELECT id FROM colaboradores WHERE usuario_id = :gestorId)
    AND c.status = 'ATIVO'
ORDER BY r.score_potencial DESC, r.score_merito DESC;

-- ============================================
-- 6. HISTÓRICO DE DESEMPENHO DE UM COLABORADOR
-- Endpoint: GET /api/gestor/colaborador/:colaboradorId/historico
-- ============================================

SELECT 
    cd.nome as ciclo,
    cd.ano,
    cd.tipo_ciclo,
    r.score_competencias,
    r.score_metas,
    r.score_merito,
    r.score_potencial,
    r.posicao_ninebox,
    r.data_calculo
FROM resultados_ciclo r
INNER JOIN ciclos_desempenho cd ON r.ciclo_id = cd.id
WHERE r.colaborador_id = :colaboradorId
ORDER BY cd.ano DESC, cd.data_inicio DESC;

-- ============================================
-- 7. ESTATÍSTICAS GERAIS DA EQUIPE
-- Endpoint: GET /api/gestor/estatisticas/:gestorId/:cicloId
-- ============================================

SELECT 
    COUNT(DISTINCT c.id) as total_colaboradores,
    COUNT(DISTINCT CASE WHEN c.status = 'ATIVO' THEN c.id END) as ativos,
    COUNT(DISTINCT CASE WHEN c.status = 'EXPERIENCIA' THEN c.id END) as em_experiencia,
    AVG(r.score_merito) as media_merito,
    AVG(r.score_potencial) as media_potencial,
    COUNT(DISTINCT CASE WHEN r.score_merito >= 90 THEN c.id END) as alto_desempenho,
    COUNT(DISTINCT CASE WHEN r.score_merito < 50 THEN c.id END) as baixo_desempenho,
    COUNT(DISTINCT a.id) as total_avaliacoes,
    COUNT(DISTINCT CASE WHEN a.status = 'CONCLUIDA' THEN a.id END) as avaliacoes_concluidas
FROM colaboradores c
LEFT JOIN resultados_ciclo r ON c.id = r.colaborador_id AND r.ciclo_id = :cicloId
LEFT JOIN avaliacoes a ON c.id = a.colaborador_id AND a.ciclo_id = :cicloId
WHERE c.gestor_id = (SELECT id FROM colaboradores WHERE usuario_id = :gestorId);

-- ============================================
-- 8. COLABORADORES QUE PRECISAM DE ATENÇÃO
-- Endpoint: GET /api/gestor/alerta/:gestorId/:cicloId
-- ============================================

SELECT 
    c.id,
    u.nome,
    c.cargo,
    c.status,
    r.score_merito,
    r.posicao_ninebox,
    CASE 
        WHEN r.score_merito < 50 THEN 'BAIXO_DESEMPENHO'
        WHEN c.status = 'EXPERIENCIA' AND r.score_merito < 70 THEN 'RISCO_EXPERIENCIA'
        WHEN a.status != 'CONCLUIDA' THEN 'AVALIACAO_PENDENTE'
        ELSE 'SEM_ALERTAS'
    END as tipo_alerta,
    CASE 
        WHEN r.score_merito < 50 THEN 'Colaborador com desempenho abaixo do esperado'
        WHEN c.status = 'EXPERIENCIA' AND r.score_merito < 70 THEN 'Período de experiência em risco'
        WHEN a.status != 'CONCLUIDA' THEN 'Avaliação ainda não concluída'
        ELSE 'Nenhum alerta'
    END as mensagem
FROM colaboradores c
INNER JOIN usuarios u ON c.usuario_id = u.id
LEFT JOIN resultados_ciclo r ON c.id = r.colaborador_id AND r.ciclo_id = :cicloId
LEFT JOIN avaliacoes a ON c.id = a.colaborador_id AND a.ciclo_id = :cicloId
WHERE c.gestor_id = (SELECT id FROM colaboradores WHERE usuario_id = :gestorId)
    AND c.status IN ('ATIVO', 'EXPERIENCIA')
    AND (r.score_merito < 70 OR a.status != 'CONCLUIDA')
ORDER BY 
    CASE 
        WHEN r.score_merito < 50 THEN 1
        WHEN c.status = 'EXPERIENCIA' AND r.score_merito < 70 THEN 2
        ELSE 3
    END;

-- ============================================
-- 9. COMPARATIVO DE DESEMPENHO ENTRE CICLOS
-- Endpoint: GET /api/gestor/comparativo/:gestorId
-- ============================================

SELECT 
    u.nome,
    c.cargo,
    cd1.ano as ano_anterior,
    r1.score_merito as merito_anterior,
    cd2.ano as ano_atual,
    r2.score_merito as merito_atual,
    (r2.score_merito - r1.score_merito) as variacao,
    CASE 
        WHEN (r2.score_merito - r1.score_merito) > 10 THEN 'MELHORIA_SIGNIFICATIVA'
        WHEN (r2.score_merito - r1.score_merito) > 0 THEN 'MELHORIA'
        WHEN (r2.score_merito - r1.score_merito) = 0 THEN 'ESTAVEL'
        WHEN (r2.score_merito - r1.score_merito) > -10 THEN 'LEVE_QUEDA'
        ELSE 'QUEDA_SIGNIFICATIVA'
    END as tendencia
FROM colaboradores c
INNER JOIN usuarios u ON c.usuario_id = u.id
INNER JOIN resultados_ciclo r1 ON c.id = r1.colaborador_id
INNER JOIN ciclos_desempenho cd1 ON r1.ciclo_id = cd1.id
INNER JOIN resultados_ciclo r2 ON c.id = r2.colaborador_id
INNER JOIN ciclos_desempenho cd2 ON r2.ciclo_id = cd2.id
WHERE c.gestor_id = (SELECT id FROM colaboradores WHERE usuario_id = :gestorId)
    AND cd1.tipo_ciclo = 'ANUAL'
    AND cd2.tipo_ciclo = 'ANUAL'
    AND cd2.ano = cd1.ano + 1
ORDER BY (r2.score_merito - r1.score_merito) DESC;

-- ============================================
-- FIM DAS QUERIES
-- ============================================
