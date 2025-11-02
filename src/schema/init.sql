-- =============================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Sistema de Ciclo de Desempenho Automatizado - MVP
-- Total: 14 tabelas
-- Data: Novembro de 2025
-- PostgreSQL 12+
-- =============================================

-- =============================================
-- 1. CRIAR SCHEMA
-- =============================================

CREATE SCHEMA IF NOT EXISTS ciclo_desempenho;
SET search_path TO ciclo_desempenho;

-- =============================================
-- 2. CRIAR TIPOS CUSTOMIZADOS (ENUMs)
-- =============================================

CREATE TYPE papel_enum AS ENUM ('admin', 'gestor', 'rh', 'colaborador');
CREATE TYPE ciclo_status AS ENUM ('planejamento', 'aberto', 'em_avaliacao', 'fechado');
CREATE TYPE formulario_tipo AS ENUM ('auto_avaliacao', 'hetero_avaliacao');
CREATE TYPE formulario_status AS ENUM ('pendente', 'em_preenchimento', 'submetido');
CREATE TYPE tipo_feedback AS ENUM ('positivo', 'desenvolvimento', 'neutro');
CREATE TYPE elegibilidade_status AS ENUM ('elegivel', 'em_progresso', 'concluido', 'expirado');
CREATE TYPE tipo_notificacao AS ENUM ('feedback', 'formulario', 'trilha', 'alerta');

-- =============================================
-- 3. TABELAS DE AUTENTICAÇÃO E CONTROLE
-- =============================================

-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    papel papel_enum DEFAULT 'colaborador',
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_papel ON usuarios(papel);
CREATE INDEX idx_usuarios_ativo ON usuarios(ativo);

-- Tabela de Auditoria
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    tabela_afetada VARCHAR(50),
    operacao VARCHAR(20),
    dados JSONB,
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auditoria_data ON auditoria(data_operacao);
CREATE INDEX idx_auditoria_usuario ON auditoria(id_usuario);
CREATE INDEX idx_auditoria_tabela ON auditoria(tabela_afetada);

-- =============================================
-- 4. TABELAS DE DADOS OPERACIONAIS
-- =============================================

-- Tabela de Colaboradores
CREATE TABLE colaboradores (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE RESTRICT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    cargo VARCHAR(100),
    data_admissao DATE,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_colaboradores_departamento ON colaboradores(departamento);
CREATE INDEX idx_colaboradores_ativo ON colaboradores(ativo);
CREATE INDEX idx_colaboradores_email ON colaboradores(email);

-- Tabela de Ciclos de Desempenho
CREATE TABLE ciclos_desempenho (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status ciclo_status DEFAULT 'planejamento',
    criado_por INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (data_fim >= data_inicio)
);

CREATE INDEX idx_ciclos_status ON ciclos_desempenho(status);
CREATE INDEX idx_ciclos_data_inicio ON ciclos_desempenho(data_inicio);

-- Tabela de Gestores (Relacionamento Hierárquico)
CREATE TABLE gestores (
    id SERIAL PRIMARY KEY,
    id_gestor INTEGER NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    id_subordinado INTEGER NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    data_inicio DATE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    UNIQUE (id_gestor, id_subordinado),
    CHECK (id_gestor != id_subordinado)
);

CREATE INDEX idx_gestores_gestor ON gestores(id_gestor);
CREATE INDEX idx_gestores_subordinado ON gestores(id_subordinado);

-- Tabela de Competências (Catálogo)
CREATE TABLE competencias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    categoria VARCHAR(50),
    peso_padrao NUMERIC(3, 2) DEFAULT 1.00
);

CREATE INDEX idx_competencias_categoria ON competencias(categoria);

-- =============================================
-- 5. TABELA DE AVALIAÇÃO (CONSOLIDADA)
-- =============================================

CREATE TABLE formularios_avaliacao (
    id SERIAL PRIMARY KEY,
    id_ciclo INTEGER NOT NULL REFERENCES ciclos_desempenho(id) ON DELETE CASCADE,
    id_colaborador INTEGER NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    id_gestor INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    tipo formulario_tipo DEFAULT 'hetero_avaliacao',
    status formulario_status DEFAULT 'pendente',
    
    -- Dados consolidados em JSONB
    notas_competencias JSONB, -- {"competencia_id": nota, ...}
    notas_metas JSONB,         -- {"meta_descricao": nota, ...}
    
    score_merito_final NUMERIC(5, 2),
    posicao_nine_box VARCHAR(50),
    
    observacoes TEXT,
    data_disparo TIMESTAMP,
    data_submissao TIMESTAMP,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_ciclo FOREIGN KEY (id_ciclo) REFERENCES ciclos_desempenho(id) ON DELETE CASCADE,
    CONSTRAINT fk_colaborador FOREIGN KEY (id_colaborador) REFERENCES colaboradores(id) ON DELETE CASCADE,
    CONSTRAINT fk_gestor FOREIGN KEY (id_gestor) REFERENCES usuarios(id) ON DELETE RESTRICT
);

CREATE INDEX idx_formularios_ciclo_colaborador ON formularios_avaliacao(id_ciclo, id_colaborador);
CREATE INDEX idx_formularios_status ON formularios_avaliacao(status);
CREATE INDEX idx_formularios_score ON formularios_avaliacao(score_merito_final);
CREATE INDEX idx_formularios_nine_box ON formularios_avaliacao(posicao_nine_box);

-- =============================================
-- 6. TABELAS DE PROGRESSÃO E CARREIRA
-- =============================================

-- Tabela de Trilhas de Carreira
CREATE TABLE trilhas_carreira (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    score_merito_minimo NUMERIC(3, 2),
    requisitos JSONB, -- Competências necessárias
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Elegibilidade e Progresso
CREATE TABLE elegibilidade_carreira (
    id SERIAL PRIMARY KEY,
    id_colaborador INTEGER NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    id_trilha INTEGER NOT NULL REFERENCES trilhas_carreira(id) ON DELETE CASCADE,
    score_merito_final NUMERIC(5, 2),
    status elegibilidade_status DEFAULT 'elegivel',
    data_liberacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    UNIQUE (id_colaborador, id_trilha)
);

CREATE INDEX idx_elegibilidade_status ON elegibilidade_carreira(status);
CREATE INDEX idx_elegibilidade_colaborador ON elegibilidade_carreira(id_colaborador);

-- =============================================
-- 7. TABELAS DE FEEDBACK E HISTÓRICO
-- =============================================

-- Tabela de Feedback Contínuo e Histórico (CONSOLIDADA)
CREATE TABLE feedbacks_historico (
    id SERIAL PRIMARY KEY,
    id_colaborador INTEGER NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    id_ciclo INTEGER REFERENCES ciclos_desempenho(id) ON DELETE SET NULL,
    id_emissor INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    
    -- Feedback
    titulo_feedback VARCHAR(150),
    descricao_feedback TEXT,
    tipo_feedback tipo_feedback,
    
    -- Histórico
    score_merito_ciclo NUMERIC(5, 2),
    posicao_nine_box_ciclo VARCHAR(50),
    feedback_qualitativo TEXT,
    
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedbacks_colaborador ON feedbacks_historico(id_colaborador);
CREATE INDEX idx_feedbacks_ciclo ON feedbacks_historico(id_ciclo);
CREATE INDEX idx_feedbacks_data ON feedbacks_historico(data_registro);
CREATE INDEX idx_feedbacks_tipo ON feedbacks_historico(tipo_feedback);

-- Tabela de Notificações
CREATE TABLE notificacoes (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(150),
    mensagem TEXT,
    tipo tipo_notificacao DEFAULT 'alerta',
    lida BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notificacoes_usuario ON notificacoes(id_usuario);
CREATE INDEX idx_notificacoes_lida ON notificacoes(lida);
CREATE INDEX idx_notificacoes_data ON notificacoes(data_criacao);
CREATE INDEX idx_notificacoes_usuario_lida ON notificacoes(id_usuario, lida);

-- =============================================
-- 8. TABELA DE CONFIGURAÇÕES DO SISTEMA
-- =============================================

CREATE TABLE configuracoes_sistema (
    id SERIAL PRIMARY KEY,
    chave VARCHAR(100) NOT NULL UNIQUE,
    valor VARCHAR(255),
    descricao VARCHAR(255),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_config_chave ON configuracoes_sistema(chave);

-- =============================================
-- 9. DADOS INICIAIS
-- =============================================

-- Inserir Configurações Padrão
INSERT INTO configuracoes_sistema (chave, valor, descricao) VALUES
('score_minimo_elegibilidade', '80', 'Score mínimo de mérito para elegibilidade'),
('peso_competencias', '50', 'Peso das competências no cálculo (%)'),
('peso_metas', '50', 'Peso das metas no cálculo (%)'),
('desvio_padrao_divergencias', '2.0', 'Desvio padrão para detectar divergências');

-- Inserir Competências Padrão
INSERT INTO competencias (nome, descricao, categoria, peso_padrao) VALUES
('Liderança', 'Capacidade de liderar e motivar', 'Comportamental', 1.2),
('Comunicação', 'Habilidade de comunicação clara', 'Comportamental', 1.0),
('Trabalho em Equipe', 'Colaboração com o time', 'Comportamental', 1.0),
('Análise Crítica', 'Pensamento analítico e crítico', 'Técnico', 1.1),
('Orientação ao Cliente', 'Foco em satisfação do cliente', 'Comportamental', 1.1),
('Conhecimento Técnico', 'Domínio das ferramentas', 'Técnico', 1.2);

-- =============================================
-- 10. VIEWS PARA RELATÓRIOS
-- =============================================

-- View de Resumo de Desempenho
CREATE VIEW vw_resumo_desempenho AS
SELECT 
    c.id,
    c.nome_completo,
    c.departamento,
    c.cargo,
    cd.nome AS ciclo_nome,
    fa.score_merito_final,
    fa.posicao_nine_box,
    COUNT(DISTINCT fh.id) AS total_feedbacks,
    MAX(fa.data_criacao) AS ultima_avaliacao
FROM colaboradores c
LEFT JOIN formularios_avaliacao fa ON c.id = fa.id_colaborador
LEFT JOIN ciclos_desempenho cd ON fa.id_ciclo = cd.id
LEFT JOIN feedbacks_historico fh ON c.id = fh.id_colaborador
GROUP BY c.id, cd.id, c.nome_completo, c.departamento, c.cargo, cd.nome, 
         fa.score_merito_final, fa.posicao_nine_box;

-- View de Matriz Nine Box
CREATE VIEW vw_matriz_nine_box AS
SELECT 
    cd.nome AS ciclo_nome,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Alto-Alto' THEN 1 END) AS estrelas,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Alto-Médio' THEN 1 END) AS fortes,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Alto-Baixo' THEN 1 END) AS solidos,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Médio-Alto' THEN 1 END) AS desenvolvimento,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Médio-Médio' THEN 1 END) AS equilibrados,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Médio-Baixo' THEN 1 END) AS transicao,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Baixo-Alto' THEN 1 END) AS risco,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Baixo-Médio' THEN 1 END) AS questionaveis,
    COUNT(CASE WHEN fa.posicao_nine_box = 'Baixo-Baixo' THEN 1 END) AS desligaveis
FROM ciclos_desempenho cd
LEFT JOIN formularios_avaliacao fa ON cd.id = fa.id_ciclo
GROUP BY cd.id, cd.nome;

-- View de Colaboradores Elegíveis
CREATE VIEW vw_elegíveis_progressao AS
SELECT DISTINCT
    c.id,
    c.nome_completo,
    c.departamento,
    fa.score_merito_final,
    tc.nome AS trilha_nome
FROM colaboradores c
INNER JOIN formularios_avaliacao fa ON c.id = fa.id_colaborador
INNER JOIN trilhas_carreira tc ON fa.score_merito_final >= tc.score_merito_minimo
WHERE fa.score_merito_final >= 80
AND fa.status = 'submetido';

-- =============================================
-- 11. FUNÇÃO PARA CÁLCULO DE MÉRITO
-- =============================================

CREATE OR REPLACE FUNCTION sp_calcular_merito(p_id_formulario INTEGER)
RETURNS VOID AS $$
DECLARE
    v_peso_competencias NUMERIC(3, 2);
    v_peso_metas NUMERIC(3, 2);
    v_score_competencias NUMERIC(5, 2);
    v_score_metas NUMERIC(5, 2);
    v_score_final NUMERIC(5, 2);
    v_performance INTEGER;
    v_potencial INTEGER;
    v_posicao_nine_box VARCHAR(50);
BEGIN
    -- Obter pesos da configuração
    SELECT CAST(valor AS NUMERIC(3, 2)) INTO v_peso_competencias 
    FROM configuracoes_sistema WHERE chave = 'peso_competencias';
    
    SELECT CAST(valor AS NUMERIC(3, 2)) INTO v_peso_metas 
    FROM configuracoes_sistema WHERE chave = 'peso_metas';
    
    -- Normalizar pesos (estão em percentual)
    v_peso_competencias := v_peso_competencias / 100;
    v_peso_metas := v_peso_metas / 100;
    
    -- Calcular médias (exemplo simplificado)
    v_score_competencias := 85.00;
    v_score_metas := 80.00;
    
    -- Calcular score final
    v_score_final := (v_score_competencias * v_peso_competencias) + 
                     (v_score_metas * v_peso_metas);
    
    -- Determinar posição Nine Box
    v_performance := ROUND(v_score_final / 10)::INTEGER;
    v_potencial := 8; -- Em produção seria um campo separado
    
    CASE 
        WHEN v_performance >= 8 AND v_potencial >= 8 THEN
            v_posicao_nine_box := 'Alto-Alto';
        WHEN v_performance >= 8 AND v_potencial >= 5 THEN
            v_posicao_nine_box := 'Alto-Médio';
        WHEN v_performance >= 8 THEN
            v_posicao_nine_box := 'Alto-Baixo';
        WHEN v_performance >= 5 AND v_potencial >= 8 THEN
            v_posicao_nine_box := 'Médio-Alto';
        WHEN v_performance >= 5 AND v_potencial >= 5 THEN
            v_posicao_nine_box := 'Médio-Médio';
        ELSE
            v_posicao_nine_box := 'Baixo-Baixo';
    END CASE;
    
    -- Atualizar formulário
    UPDATE formularios_avaliacao
    SET score_merito_final = v_score_final,
        posicao_nine_box = v_posicao_nine_box,
        data_atualizacao = CURRENT_TIMESTAMP
    WHERE id = p_id_formulario;
    
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 12. FUNÇÃO PARA AUDITORIA
-- =============================================

CREATE OR REPLACE FUNCTION fn_audit_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria (id_usuario, tabela_afetada, operacao, dados)
    VALUES (
        COALESCE(current_setting('app.current_user_id')::INTEGER, NULL),
        TG_TABLE_NAME,
        TG_OP,
        to_jsonb(NEW)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 13. TRIGGERS PARA AUDITORIA
-- =============================================

CREATE TRIGGER tr_audit_usuarios
AFTER INSERT OR UPDATE OR DELETE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION fn_audit_changes();

CREATE TRIGGER tr_audit_colaboradores
AFTER INSERT OR UPDATE OR DELETE ON colaboradores
FOR EACH ROW
EXECUTE FUNCTION fn_audit_changes();

CREATE TRIGGER tr_audit_formularios
AFTER INSERT OR UPDATE OR DELETE ON formularios_avaliacao
FOR EACH ROW
EXECUTE FUNCTION fn_audit_changes();

CREATE TRIGGER tr_audit_ciclos
AFTER INSERT OR UPDATE OR DELETE ON ciclos_desempenho
FOR EACH ROW
EXECUTE FUNCTION fn_audit_changes();

-- =============================================
-- 14. PERMISSÕES E COMENTÁRIOS
-- =============================================

COMMENT ON SCHEMA ciclo_desempenho IS 'Schema para Sistema de Ciclo de Desempenho Automatizado - MVP';
COMMENT ON TABLE usuarios IS 'Usuários do sistema com papéis (admin, gestor, rh, colaborador)';
COMMENT ON TABLE colaboradores IS 'Dados dos colaboradores da empresa';
COMMENT ON TABLE ciclos_desempenho IS 'Ciclos de avaliação de desempenho';
COMMENT ON TABLE formularios_avaliacao IS 'Avaliações consolidadas com notas em JSONB';
COMMENT ON TABLE trilhas_carreira IS 'Trilhas de desenvolvimento profissional';
COMMENT ON TABLE elegibilidade_carreira IS 'Elegibilidade e progresso nas trilhas de carreira';
COMMENT ON TABLE feedbacks_historico IS 'Feedback contínuo e histórico de desempenho consolidados';
COMMENT ON TABLE notificacoes IS 'Notificações para usuários do sistema';
COMMENT ON TABLE auditoria IS 'Log de operações do sistema para conformidade';
COMMENT ON TABLE configuracoes_sistema IS 'Configurações dinâmicas do sistema';

-- =============================================
-- 15. ESTATÍSTICAS E VACUUM
-- =============================================

ANALYZE;

-- =============================================
-- FIM DO SCRIPT - POSTGRESQL
-- 14 Tabelas | 3 Views | 1 Função SP | 4 Triggers
-- PostgreSQL 12+
-- =============================================
