-- ==========================================================
-- SCRIPT PARA LIMPAR TODOS OS DADOS DAS TABELAS
-- Atenção: Este script apaga TODOS os registros e reseta as sequências.
-- A ordem é importante para evitar erros de chave estrangeira.
-- ==========================================================

TRUNCATE TABLE 
    public.colaborador_import,
    public.colaborador_trilha,
    public.plano_carreira,
    public.nine_box,
    public.pontuacao,
    public.avaliacao,
    public.ciclo_colaborador,
    public.ciclo_desempenho,
    public.competencia,
    public.meta,
    public.colaborador,
    public.usuario,
    public.cargo,
    public.perfil
RESTART IDENTITY CASCADE;

-- A cláusula 'RESTART IDENTITY' reseta os contadores de auto-incremento (SERIAL, BIGSERIAL).
-- A cláusula 'CASCADE' remove automaticamente objetos dependentes (como views).
-- No contexto de TRUNCATE, também propaga a operação para tabelas referenciadas por chaves estrangeiras.

-- ==========================================================
-- FIM DO SCRIPT
-- ==========================================================
