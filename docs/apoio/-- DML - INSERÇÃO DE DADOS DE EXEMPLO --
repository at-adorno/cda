-- ==========================================================
-- DML - INSERÇÃO DE DADOS DE EXEMPLO (EXPANDIDO)
-- Sistema de Ciclo de Desempenho Automatizado
-- ==========================================================

-- 1. PERFIL (Acesso)
INSERT INTO public.perfil (id, nome, descricao) VALUES
(1, 'Administrador', 'Acesso total ao sistema.'),
(2, 'Gestor', 'Pode avaliar sua equipe e ver relatórios.'),
(3, 'Colaborador', 'Pode realizar autoavaliação e ver seu próprio resultado.')
ON CONFLICT (id) DO NOTHING;

-- 2. CARGO (Base)
INSERT INTO public.cargo (id, titulo, descricao) VALUES
(1, 'Gerente de Engenharia', 'Liderança de equipes de desenvolvimento de software.'),
(2, 'Analista de Software Sênior', 'Desenvolvimento e manutenção de sistemas complexos.'),
(3, 'Desenvolvedor Júnior', 'Implementação de funcionalidades sob supervisão.'),
(4, 'Gerente de Produto', 'Liderança de estratégia e roadmap de produtos.'),
(5, 'Designer UX/UI Sênior', 'Criação de experiências de usuário e interfaces.'),
(6, 'Engenheiro de Dados', 'Construção e manutenção de pipelines de dados.'),
(7, 'Analista de QA', 'Garantia de qualidade e testes de software.')
ON CONFLICT (id) DO NOTHING;

-- Resetar sequências
SELECT setval('public.perfil_id_seq', (SELECT GREATEST(3, (SELECT MAX(id) FROM public.perfil))));
SELECT setval('public.cargo_id_seq', (SELECT GREATEST(7, (SELECT MAX(id) FROM public.cargo))));

--------------------------------------------------------------
-- 3 & 4. USUARIO e COLABORADOR (Criação de Gestores e Colaboradores)
--------------------------------------------------------------

-- Gestor 1 (Ana Gomes)
INSERT INTO public.usuario (id, email, nome, perfil_id, senha_hash) VALUES (10, 'ana.gomes@empresa.com.br', 'Ana Gomes', 2, 'hash_senha_ana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.colaborador (id, usuario_id, nome, cargo_id, gestor_id, matricula, ativo) VALUES (100, 10, 'Ana Gomes', 1, NULL, 'MAT001', TRUE) ON CONFLICT (id) DO NOTHING;

-- Gestor 2 (Pedro Rocha)
INSERT INTO public.usuario (id, email, nome, perfil_id, senha_hash) VALUES (13, 'pedro.rocha@empresa.com.br', 'Pedro Rocha', 2, 'hash_senha_pedro') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.colaborador (id, usuario_id, nome, cargo_id, gestor_id, matricula, ativo) VALUES (103, 13, 'Pedro Rocha', 4, NULL, 'MAT004', TRUE) ON CONFLICT (id) DO NOTHING;

-- Colaboradores
INSERT INTO public.usuario (id, email, nome, perfil_id, senha_hash) VALUES
(11, 'bruce.wayne@empresa.com.br', 'Bruce Wayne', 3, 'hash_senha_bruce'),
(12, 'carla.dias@empresa.com.br', 'Carla Dias', 3, 'hash_senha_carla'),
(14, 'diana.prince@empresa.com.br', 'Diana Prince', 3, 'hash_senha_diana'),
(15, 'clark.kent@empresa.com.br', 'Clark Kent', 3, 'hash_senha_clark'),
(16, 'barry.allen@empresa.com.br', 'Barry Allen', 3, 'hash_senha_barry'),
(17, 'hal.jordan@empresa.com.br', 'Hal Jordan', 3, 'hash_senha_hal'),
(18, 'sandra.bullock@empresa.com.br', 'Sandra Bullock', 3, 'hash_senha_sandra'),
(19, 'tom.hanks@empresa.com.br', 'Tom Hanks', 3, 'hash_senha_tom')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.colaborador (id, usuario_id, nome, cargo_id, gestor_id, matricula, ativo) VALUES
(101, 11, 'Bruce Wayne', 2, 100, 'MAT002', TRUE), -- Liderado por Ana
(102, 12, 'Carla Dias', 3, 100, 'MAT003', TRUE), -- Liderado por Ana
(104, 14, 'Diana Prince', 5, 103, 'MAT005', TRUE), -- Liderado por Pedro
(105, 15, 'Clark Kent', 2, 100, 'MAT006', TRUE), -- Liderado por Ana
(106, 16, 'Barry Allen', 6, 100, 'MAT007', TRUE), -- Liderado por Ana
(107, 17, 'Hal Jordan', 7, 100, 'MAT008', TRUE), -- Liderado por Ana
(108, 18, 'Sandra Bullock', 5, 103, 'MAT009', TRUE), -- Liderado por Pedro
(109, 19, 'Tom Hanks', 3, 103, 'MAT010', TRUE)  -- Liderado por Pedro
ON CONFLICT (id) DO NOTHING;

-- Total de 2 gestores + 8 colaboradores = 10
SELECT setval('public.usuario_id_seq', (SELECT GREATEST(19, (SELECT MAX(id) FROM public.usuario))));
SELECT setval('public.colaborador_id_seq', (SELECT GREATEST(109, (SELECT MAX(id) FROM public.colaborador))));

--------------------------------------------------------------
-- 5. CICLO_DESEMPENHO
--------------------------------------------------------------
INSERT INTO public.ciclo_desempenho (id, nome, data_inicio, data_fim, descricao, criado_por) VALUES
(1, 'Ciclo Anual 2025', '2025-01-01', '2025-12-31', 'Avaliação de desempenho anual para todos os colaboradores.', 10)
ON CONFLICT (id) DO NOTHING;
SELECT setval('public.ciclo_desempenho_id_seq', (SELECT GREATEST(1, (SELECT MAX(id) FROM public.ciclo_desempenho))));

--------------------------------------------------------------
-- 5.1. CICLO_COLABORADOR (Matriculando todos no Ciclo)
--------------------------------------------------------------
INSERT INTO public.ciclo_colaborador (id, ciclo_id, colaborador_id) VALUES
(1000, 1, 101), (1001, 1, 102), (1002, 1, 103), (1003, 1, 104), (1004, 1, 105), 
(1005, 1, 106), (1006, 1, 107), (1007, 1, 108), (1008, 1, 109), (1009, 1, 100) -- Incluindo os gestores
ON CONFLICT (id) DO NOTHING;
SELECT setval('public.ciclo_colaborador_id_seq', (SELECT GREATEST(1009, (SELECT MAX(id) FROM public.ciclo_colaborador))));

--------------------------------------------------------------
-- 6 & 7. COMPETENCIA e META (Itens de Avaliação)
--------------------------------------------------------------
INSERT INTO public.competencia (id, nome, descricao, peso) VALUES
(10, 'Comunicação Interpessoal', 'Habilidade de transmitir e receber informações de forma clara.', 1.5),
(11, 'Inovação e Criatividade', 'Capacidade de gerar novas ideias e soluções.', 1.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.meta (id, titulo, descricao, peso, prazo) VALUES
(20, 'Redução de Bugs em 15%', 'Redução de defeitos reportados em produção no segundo semestre.', 2.0, '2025-12-31'),
(21, 'Conclusão de Certificação Cloud', 'Obter a certificação AWS Certified Developer - Associate.', 1.0, '2025-09-30')
ON CONFLICT (id) DO NOTHING;

SELECT setval('public.competencia_id_seq', (SELECT GREATEST(11, (SELECT MAX(id) FROM public.competencia))));
SELECT setval('public.meta_id_seq', (SELECT GREATEST(21, (SELECT MAX(id) FROM public.meta))));

--------------------------------------------------------------
-- 8. AVALIACAO (Para Bruce Wayne e Diana Prince)
--------------------------------------------------------------
-- Avaliações para Bruce Wayne (liderado por Ana)
INSERT INTO public.avaliacao (id, ciclo_colaborador_id, avaliador_id, tipo, status, data_envio) VALUES (200, 1000, 101, 'AUTOAVALIACAO', 'CONCLUIDA', NOW() - INTERVAL '30 days') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.avaliacao (id, ciclo_colaborador_id, avaliador_id, tipo, status, pontuacao_merito) VALUES (201, 1000, 100, 'GESTOR', 'CONCLUIDA', 4.5) ON CONFLICT (id) DO NOTHING;

-- Avaliações para Diana Prince (liderada por Pedro)
INSERT INTO public.avaliacao (id, ciclo_colaborador_id, avaliador_id, tipo, status, data_envio) VALUES (202, 1003, 104, 'AUTOAVALIACAO', 'CONCLUIDA', NOW() - INTERVAL '25 days') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.avaliacao (id, ciclo_colaborador_id, avaliador_id, tipo, status, pontuacao_merito) VALUES (203, 1003, 103, 'GESTOR', 'PENDENTE', null) ON CONFLICT (id) DO NOTHING;

SELECT setval('public.avaliacao_id_seq', (SELECT GREATEST(203, (SELECT MAX(id) FROM public.avaliacao))));

--------------------------------------------------------------
-- 9. PONTUACAO (Notas para a Avaliação do Gestor do Bruce Wayne)
--------------------------------------------------------------
INSERT INTO public.pontuacao (id, avaliacao_id, competencia_id, nota, comentario) VALUES
(300, 201, 10, 4.0, 'Bruce melhorou significativamente a clareza em reuniões técnicas.'),
(301, 201, 11, 5.0, 'Excelência na proposta de novas arquiteturas para o projeto X.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pontuacao (id, avaliacao_id, meta_id, nota, comentario) VALUES
(302, 201, 20, 4.5, 'Quase atingiu a meta, ficando em 13% de redução.'),
(303, 201, 21, 5.0, 'Certificação concluída em agosto/2025, antes do prazo.')
ON CONFLICT (id) DO NOTHING;

SELECT setval('public.pontuacao_id_seq', (SELECT GREATEST(303, (SELECT MAX(id) FROM public.pontuacao))));

--------------------------------------------------------------
-- 10. NINE_BOX (Resultado Final para Bruce Wayne)
--------------------------------------------------------------
INSERT INTO public.nine_box (id, ciclo_colaborador_id, posicao_x_potencial, posicao_y_desempenho, score_competencias, score_metas, score_final_merito, elegivel_carreira) VALUES
(10, 1000, 'Alto', 'Alto', 4.5, 4.75, 4.62, TRUE)
ON CONFLICT (id) DO NOTHING;
SELECT setval('public.nine_box_id_seq', (SELECT GREATEST(10, (SELECT MAX(id) FROM public.nine_box))));

--------------------------------------------------------------
-- 11 & 12. PLANO_CARREIRA e COLABORADOR_TRILHA
--------------------------------------------------------------
INSERT INTO public.plano_carreira (id, nome, descricao, versao, publicado) VALUES
(50, 'Trilha para Liderança Técnica', 'Plano para Analistas Sênior com potencial para Gestão.', '1.0', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.colaborador_trilha (id, plano_id, colaborador_id, data_inicio, status) VALUES
(500, 50, 101, '2026-01-15', 'LIBERADO') -- Para Bruce Wayne
ON CONFLICT (id) DO NOTHING;

SELECT setval('public.plano_carreira_id_seq', (SELECT GREATEST(50, (SELECT MAX(id) FROM public.plano_carreira))));
SELECT setval('public.colaborador_trilha_id_seq', (SELECT GREATEST(500, (SELECT MAX(id) FROM public.colaborador_trilha))));

--------------------------------------------------------------
-- 13. COLABORADOR_IMPORT (Dados de Staging)
--------------------------------------------------------------
INSERT INTO public.colaborador_import (id, matricula, nome_completo, email_corporativo, nome_cargo, data_admissao, matricula_gestor, status_processamento) VALUES
(1, 'MAT011', 'Arthur Curry', 'arthur.curry@empresa.com.br', 'Engenheiro de Dados Pleno', '2025-06-12', 'MAT001', 'PENDENTE')
ON CONFLICT (id) DO NOTHING;
SELECT setval('public.colaborador_import_id_seq', (SELECT GREATEST(1, (SELECT MAX(id) FROM public.colaborador_import))));

-- ==========================================================
-- FIM DO SCRIPT
-- ==========================================================
