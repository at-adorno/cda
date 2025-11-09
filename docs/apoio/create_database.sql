-- ============================================
-- Script de Criação do Banco de Dados
-- Sistema de Ciclo de Desempenho
-- PostgreSQL - Versão Simplificada
-- ============================================

-- Criação do banco de dados
CREATE DATABASE ciclo_desempenho;

-- Conectar ao banco
\c ciclo_desempenho;

-- ============================================
-- TABELA: usuarios
-- Armazena todos os usuários do sistema
-- ============================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('GESTOR', 'RH', 'COLABORADOR', 'ADMIN')),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: colaboradores
-- Informações específicas dos colaboradores
-- ============================================
CREATE TABLE colaboradores (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    gestor_id INTEGER REFERENCES colaboradores(id),
    data_admissao DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'ATIVO' CHECK (status IN ('ATIVO', 'EXPERIENCIA', 'DESLIGADO')),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: ciclos_desempenho
-- Ciclos de avaliação de desempenho
-- ============================================
CREATE TABLE ciclos_desempenho (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    ano INTEGER NOT NULL,
    tipo_ciclo VARCHAR(50) NOT NULL CHECK (tipo_ciclo IN ('ANUAL', 'SEMESTRAL', 'EXPERIENCIA')),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'ATIVO' CHECK (status IN ('PLANEJADO', 'ATIVO', 'FINALIZADO')),
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (ano, tipo_ciclo)
);

-- ============================================
-- TABELA: competencias
-- Competências avaliadas no sistema
-- ============================================
CREATE TABLE competencias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    peso DECIMAL(5,2) DEFAULT 1.00,
    ativo BOOLEAN DEFAULT TRUE
);

-- ============================================
-- TABELA: metas
-- Metas definidas para colaboradores
-- ============================================
CREATE TABLE metas (
    id SERIAL PRIMARY KEY,
    colaborador_id INTEGER REFERENCES colaboradores(id) ON DELETE CASCADE,
    ciclo_id INTEGER REFERENCES ciclos_desempenho(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    peso DECIMAL(5,2) DEFAULT 1.00,
    meta_valor DECIMAL(10,2),
    valor_atingido DECIMAL(10,2) DEFAULT 0,
    percentual_atingido DECIMAL(5,2) DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: avaliacoes
-- Avaliações realizadas nos ciclos
-- ============================================
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    colaborador_id INTEGER REFERENCES colaboradores(id) ON DELETE CASCADE,
    avaliador_id INTEGER REFERENCES usuarios(id),
    ciclo_id INTEGER REFERENCES ciclos_desempenho(id) ON DELETE CASCADE,
    tipo_avaliacao VARCHAR(50) CHECK (tipo_avaliacao IN ('AUTO_AVALIACAO', 'AVALIACAO_GESTOR', 'AVALIACAO_360')),
    status VARCHAR(50) DEFAULT 'EM_ANDAMENTO' CHECK (status IN ('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')),
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    observacoes TEXT
);

-- ============================================
-- TABELA: avaliacoes_competencias
-- Notas das competências em cada avaliação
-- ============================================
CREATE TABLE avaliacoes_competencias (
    id SERIAL PRIMARY KEY,
    avaliacao_id INTEGER REFERENCES avaliacoes(id) ON DELETE CASCADE,
    competencia_id INTEGER REFERENCES competencias(id),
    nota DECIMAL(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 10),
    observacao TEXT,
    UNIQUE (avaliacao_id, competencia_id)
);

-- ============================================
-- TABELA: resultados_ciclo
-- Consolidação dos resultados por ciclo
-- ============================================
CREATE TABLE resultados_ciclo (
    id SERIAL PRIMARY KEY,
    colaborador_id INTEGER REFERENCES colaboradores(id) ON DELETE CASCADE,
    ciclo_id INTEGER REFERENCES ciclos_desempenho(id) ON DELETE CASCADE,
    score_competencias DECIMAL(5,2),
    score_metas DECIMAL(5,2),
    score_merito DECIMAL(5,2),
    score_potencial DECIMAL(5,2),
    posicao_ninebox VARCHAR(50),
    recomendacao TEXT,
    data_calculo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (colaborador_id, ciclo_id)
);

-- ============================================
-- TABELA: configuracoes_ninebox
-- Configurações da matriz Nine Box
-- ============================================
CREATE TABLE configuracoes_ninebox (
    id SERIAL PRIMARY KEY,
    nome_quadrante VARCHAR(100) NOT NULL,
    posicao_x INTEGER NOT NULL CHECK (posicao_x BETWEEN 1 AND 3),
    posicao_y INTEGER NOT NULL CHECK (posicao_y BETWEEN 1 AND 3),
    descricao TEXT,
    cor VARCHAR(50),
    acoes_recomendadas TEXT,
    UNIQUE (posicao_x, posicao_y)
);

-- ============================================
-- TABELA: historico_avaliacoes
-- Histórico consolidado para auditoria
-- ============================================
CREATE TABLE historico_avaliacoes (
    id SERIAL PRIMARY KEY,
    colaborador_id INTEGER REFERENCES colaboradores(id),
    ciclo_id INTEGER REFERENCES ciclos_desempenho(id),
    dados_avaliacao JSONB,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES para otimização de consultas
-- ============================================
CREATE INDEX idx_colaboradores_gestor ON colaboradores(gestor_id);
CREATE INDEX idx_colaboradores_status ON colaboradores(status);
CREATE INDEX idx_avaliacoes_colaborador ON avaliacoes(colaborador_id);
CREATE INDEX idx_avaliacoes_ciclo ON avaliacoes(ciclo_id);
CREATE INDEX idx_resultados_ciclo ON resultados_ciclo(colaborador_id, ciclo_id);
CREATE INDEX idx_metas_colaborador ON metas(colaborador_id);

-- ============================================
-- FUNÇÃO: Atualizar data de modificação
-- ============================================
CREATE OR REPLACE FUNCTION atualizar_data_modificacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar automaticamente data_atualizacao
CREATE TRIGGER trigger_atualizar_usuarios
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_data_modificacao();

-- ============================================
-- FIM DO SCRIPT
-- ============================================
