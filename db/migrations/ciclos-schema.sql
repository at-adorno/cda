CREATE TABLE IF NOT EXISTS ciclos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_inicio TIMESTAMP NOT NULL,
  data_fim TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'planejamento',
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ciclos_status ON ciclos(status);
CREATE INDEX idx_ciclos_data_inicio ON ciclos(data_inicio);
