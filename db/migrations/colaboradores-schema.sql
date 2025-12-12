CREATE TABLE IF NOT EXISTS colaboradores (
  id SERIAL PRIMARY KEY,
  matricula VARCHAR(50) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  lotacao VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_colaboradores_nome ON colaboradores(nome);
CREATE INDEX idx_colaboradores_matricula ON colaboradores(matricula);
CREATE INDEX idx_colaboradores_ativo ON colaboradores(ativo);
