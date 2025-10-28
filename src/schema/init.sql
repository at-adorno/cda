-- ============================================================================ 
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Sistema de Ciclo de Desempenho Automatizado - MVP
-- PostgreSQL 12+
-- ============================================================================

-- Criação do banco de dados
-- Execute como superusuário do PostgreSQL
-- createdb -U postgres performance_management

-- Conectar ao banco
-- \c performance_management

-- ============================================================================ 
-- TIPOS ENUMERADOS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('RH', 'GESTOR', 'COLABORADOR');
CREATE TYPE cycle_status AS ENUM ('PLANEJAMENTO', 'ATIVO', 'FECHADO');
CREATE TYPE evaluation_type AS ENUM ('AUTOAVALIACAO', 'AVALIACAO_GESTOR');
CREATE TYPE evaluation_status AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA');

-- ============================================================================ 
-- TABELAS
-- ============================================================================

-- Tabela de Usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Colaboradores
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    departamento VARCHAR(100),
    gestor_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    data_admissao DATE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Ciclos de Avaliação
CREATE TABLE evaluation_cycles (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status cycle_status DEFAULT 'PLANEJAMENTO',
    peso_autoavaliacao DECIMAL(3,2) DEFAULT 0.30,
    peso_avaliacao_gestor DECIMAL(3,2) DEFAULT 0.70,
    criado_por INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT valid_weights CHECK (peso_autoavaliacao + peso_avaliacao_gestor = 1.0),
    CONSTRAINT valid_dates CHECK (data_fim > data_inicio)
);

-- Tabela de Critérios de Avaliação
CREATE TABLE evaluation_criteria (
    id SERIAL PRIMARY KEY,
    ciclo_id INTEGER REFERENCES evaluation_cycles(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    peso DECIMAL(3,2) DEFAULT 1.00,
    ordem INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Avaliações
CREATE TABLE evaluations (
    id SERIAL PRIMARY KEY,
    ciclo_id INTEGER REFERENCES evaluation_cycles(id) ON DELETE CASCADE,
    colaborador_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    tipo evaluation_type NOT NULL,
    avaliador_id INTEGER REFERENCES users(id),
    status evaluation_status DEFAULT 'PENDENTE',
    data_inicio TIMESTAMP,
    data_conclusao TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(ciclo_id, colaborador_id, tipo)
);

-- Tabela de Respostas das Avaliações
CREATE TABLE evaluation_answers (
    id SERIAL PRIMARY KEY,
    avaliacao_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
    criterio_id INTEGER REFERENCES evaluation_criteria(id) ON DELETE CASCADE,
    nota DECIMAL(3,2) CHECK (nota >= 0 AND nota <= 10),
    comentario TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(avaliacao_id, criterio_id)
);

-- Tabela de Resultados Finais
CREATE TABLE final_results (
    id SERIAL PRIMARY KEY,
    ciclo_id INTEGER REFERENCES evaluation_cycles(id) ON DELETE CASCADE,
    colaborador_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    nota_autoavaliacao DECIMAL(4,2),
    nota_avaliacao_gestor DECIMAL(4,2),
    nota_final DECIMAL(4,2),
    quadrante_ninebox INTEGER CHECK (quadrante_ninebox BETWEEN 1 AND 9),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(ciclo_id, colaborador_id)
);

-- Tabela de Notificações
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL,
    assunto VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    enviada BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================ 
-- ÍNDICES PARA PERFORMANCE
-- ============================================================================

CREATE INDEX idx_employees_gestor ON employees(gestor_id);
CREATE INDEX idx_employees_usuario ON employees(usuario_id);
CREATE INDEX idx_evaluations_ciclo ON evaluations(ciclo_id);
CREATE INDEX idx_evaluations_colaborador ON evaluations(colaborador_id);
CREATE INDEX idx_evaluations_status ON evaluations(status);
CREATE INDEX idx_evaluation_answers_avaliacao ON evaluation_answers(avaliacao_id);
CREATE INDEX idx_final_results_ciclo ON final_results(ciclo_id);
CREATE INDEX idx_notifications_usuario ON notifications(usuario_id);
CREATE INDEX idx_notifications_enviada ON notifications(enviada);

-- ============================================================================ 
-- FUNÇÃO PARA ATUALIZAR updated_at AUTOMATICAMENTE
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================ 
-- TRIGGERS 
-- ============================================================================

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluation_cycles_updated_at BEFORE UPDATE ON evaluation_cycles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluations_updated_at BEFORE UPDATE ON evaluations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluation_answers_updated_at BEFORE UPDATE ON evaluation_answers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================ 
-- DADOS INICIAIS (SEED)
-- ============================================================================

-- Inserir usuário RH padrão (senha: admin123 [hash])
INSERT INTO users (email, senha_hash, nome, role) VALUES 
('rh@empresa.com', '$2b$10$YourHashHere', 'Administrador RH', 'RH');

-- ============================================================================ 
-- VIEWS ÚTEIS
-- ============================================================================

-- View para listar colaboradores com seus gestores
CREATE VIEW v_colaboradores_gestores AS
SELECT 
    e.id,
    e.matricula,
    e.nome_completo,
    e.cargo,
    e.departamento,
    g.nome_completo AS gestor_nome,
    u.email
FROM employees e
LEFT JOIN employees g ON e.gestor_id = g.id
LEFT JOIN users u ON e.usuario_id = u.id
WHERE e.ativo = TRUE;

-- View para status de avaliações por ciclo
CREATE VIEW v_status_avaliacoes_ciclo AS
SELECT 
    ec.id AS ciclo_id,
    ec.nome AS ciclo_nome,
    ec.status AS ciclo_status,
    COUNT(DISTINCT e.colaborador_id) AS total_colaboradores,
    COUNT(DISTINCT CASE WHEN e.status = 'CONCLUIDA' THEN e.id END) AS avaliacoes_concluidas,
    COUNT(DISTINCT CASE WHEN e.status = 'PENDENTE' THEN e.id END) AS avaliacoes_pendentes
FROM evaluation_cycles ec
LEFT JOIN evaluations e ON ec.id = e.ciclo_id
GROUP BY ec.id, ec.nome, ec.status;

-- ============================================================================ 
-- PERMISSÕES (ajustar conforme necessário)
-- ============================================================================

-- Criar usuário da aplicação
-- CREATE USER app_user WITH PASSWORD 'your_secure_password';
-- GRANT CONNECT ON DATABASE performance_management TO app_user;
-- GRANT USAGE ON SCHEMA public TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;