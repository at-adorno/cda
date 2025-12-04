-- ==========================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS - PLATAFORMA DE GESTÃO DE DESEMPENHO
-- Baseado nas especificações do MVP.
-- ==========================================================

-- 1. PERFIL (Antiga PERFIL_ACESSO)
CREATE TABLE public.perfil (
    id BIGSERIAL NOT NULL,
    nome character varying NOT NULL UNIQUE,
    descricao text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT perfil_pkey PRIMARY KEY (id)
);

-- 2. CARGO (Base)
CREATE TABLE public.cargo (
    id BIGSERIAL NOT NULL,
    titulo character varying NOT NULL UNIQUE,
    descricao text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT cargo_pkey PRIMARY KEY (id)
);

-- 3. USUARIO (Base)
CREATE TABLE public.usuario (
    id BIGSERIAL NOT NULL,
    email character varying NOT NULL UNIQUE,
    nome character varying,
    perfil_id BIGINT NOT NULL, -- FK para PERFIL
    senha_hash text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT usuario_perfil_id_fkey FOREIGN KEY (perfil_id) REFERENCES public.perfil(id)
);

-- 4. COLABORADOR (Base) - Relação recursiva para Gestor
CREATE TABLE public.colaborador (
    id BIGSERIAL NOT NULL,
    usuario_id BIGINT UNIQUE, -- FK para login e perfil de acesso (Opcional, mas único)
    nome character varying NOT NULL,
    cargo_id BIGINT,
    gestor_id BIGINT, -- FK Recursiva para GESTOR
    matricula character varying UNIQUE NOT NULL,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT colaborador_pkey PRIMARY KEY (id),
    CONSTRAINT colaborador_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
    CONSTRAINT colaborador_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargo(id),
    CONSTRAINT colaborador_gestor_id_fkey FOREIGN KEY (gestor_id) REFERENCES public.colaborador(id)
);

-- 5. CICLO_DESEMPENHO (Base)
CREATE TABLE public.ciclo_desempenho (
    id BIGSERIAL NOT NULL,
    nome character varying NOT NULL UNIQUE,
    data_inicio date NOT NULL,
    data_fim date NOT NULL,
    descricao text,
    criado_por BIGINT,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT ciclo_desempenho_pkey PRIMARY KEY (id),
    CONSTRAINT ciclo_desempenho_criado_por_fkey FOREIGN KEY (criado_por) REFERENCES public.usuario(id)
);

-- 5.1. CICLO_COLABORADOR (Tabela de Junção Central N:M)
CREATE TABLE public.ciclo_colaborador (
    id BIGSERIAL NOT NULL,
    ciclo_id BIGINT NOT NULL,
    colaborador_id BIGINT NOT NULL,
    recomendacao_experiencia text,
    status_experiencia character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT ciclo_colaborador_pkey PRIMARY KEY (id),
    CONSTRAINT ciclo_colaborador_ciclo_id_fkey FOREIGN KEY (ciclo_id) REFERENCES public.ciclo_desempenho(id),
    CONSTRAINT ciclo_colaborador_colaborador_id_fkey FOREIGN KEY (colaborador_id) REFERENCES public.colaborador(id),
    UNIQUE (ciclo_id, colaborador_id)
);

-- 6. COMPETENCIA (Itens de Avaliação)
CREATE TABLE public.competencia (
    id BIGSERIAL NOT NULL,
    nome character varying NOT NULL UNIQUE,
    descricao text,
    peso numeric NOT NULL DEFAULT 1,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT competencia_pkey PRIMARY KEY (id)
);

-- 7. META (Itens de Avaliação)
CREATE TABLE public.meta (
    id BIGSERIAL NOT NULL,
    titulo character varying NOT NULL,
    descricao text,
    peso numeric NOT NULL DEFAULT 1,
    prazo date,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT meta_pkey PRIMARY KEY (id)
);

-- 8. AVALIACAO (Cabeçalho da Avaliação)
CREATE TABLE public.avaliacao (
    id BIGSERIAL NOT NULL,
    ciclo_colaborador_id BIGINT NOT NULL, -- FK para o relacionamento Colaborador-Ciclo
    avaliador_id BIGINT NOT NULL,
    tipo character varying NOT NULL, -- Ex: GESTOR, AUTOAVALIACAO
    status character varying NOT NULL,
    pontuacao_merito numeric,
    data_envio timestamp with time zone,
    comentario text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT avaliacao_pkey PRIMARY KEY (id),
    CONSTRAINT avaliacao_ciclo_colaborador_id_fkey FOREIGN KEY (ciclo_colaborador_id) REFERENCES public.ciclo_colaborador(id),
    CONSTRAINT avaliacao_avaliador_id_fkey FOREIGN KEY (avaliador_id) REFERENCES public.colaborador(id),
    UNIQUE (ciclo_colaborador_id, avaliador_id, tipo)
);

-- 9. PONTUACAO (Detalhamento da Nota/Feedback por Item) - Antiga RESULTADO_AVALIACAO
CREATE TABLE public.pontuacao (
    id BIGSERIAL NOT NULL,
    avaliacao_id BIGINT NOT NULL,
    competencia_id BIGINT, -- Item Opcional
    meta_id BIGINT, -- Item Opcional
    nota numeric NOT NULL,
    comentario text,
    peso_aplicado numeric DEFAULT 1,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT pontuacao_pkey PRIMARY KEY (id),
    CONSTRAINT pontuacao_avaliacao_id_fkey FOREIGN KEY (avaliacao_id) REFERENCES public.avaliacao(id),
    CONSTRAINT pontuacao_competencia_id_fkey FOREIGN KEY (competencia_id) REFERENCES public.competencia(id),
    CONSTRAINT pontuacao_meta_id_fkey FOREIGN KEY (meta_id) REFERENCES public.meta(id),
    -- Garante que apenas um tipo de item (Competência OU Meta) seja preenchido
    CONSTRAINT check_item_type CHECK (        (competencia_id IS NOT NULL AND meta_id IS NULL) OR        (competencia_id IS NULL AND meta_id IS NOT NULL)    ),
    UNIQUE (avaliacao_id, competencia_id),
    UNIQUE (avaliacao_id, meta_id)
);

-- 10. NINE_BOX (Resultado Final do Ciclo) - Antiga METRICA_MERITO
CREATE TABLE public.nine_box (
    id BIGSERIAL NOT NULL,
    ciclo_colaborador_id BIGINT NOT NULL, -- FK para o relacionamento Colaborador-Ciclo
    posicao_x_potencial character varying NOT NULL,
    posicao_y_desempenho character varying NOT NULL,
    score_competencias numeric NOT NULL CHECK (score_competencias >= 0::numeric),
    score_metas numeric NOT NULL CHECK (score_metas >= 0::numeric),
    score_final_merito numeric NOT NULL CHECK (score_final_merito >= 0::numeric),
    elegivel_carreira boolean NOT NULL,
    data_calculo timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT nine_box_pkey PRIMARY KEY (id),
    CONSTRAINT fk_ninebox_ciclo_colaborador FOREIGN KEY (ciclo_colaborador_id) REFERENCES public.ciclo_colaborador(id),
    UNIQUE (ciclo_colaborador_id)
);

-- 11. PLANO_CARREIRA (Base)
CREATE TABLE public.plano_carreira (
    id BIGSERIAL NOT NULL,
    nome character varying NOT NULL UNIQUE,
    descricao text,
    versao character varying,
    publicado boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT plano_carreira_pkey PRIMARY KEY (id)
);

-- 12. COLABORADOR_TRILHA (Liberação de Plano de Carreira) - Antiga TRILHA_COLABORADOR
CREATE TABLE public.colaborador_trilha (
    id BIGSERIAL NOT NULL,
    plano_id BIGINT NOT NULL,
    colaborador_id BIGINT NOT NULL,
    data_inicio date NOT NULL,
    data_fim date,
    status character varying NOT NULL DEFAULT 'LIBERADO',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT colaborador_trilha_pkey PRIMARY KEY (id),
    CONSTRAINT colaborador_trilha_plano_id_fkey FOREIGN KEY (plano_id) REFERENCES public.plano_carreira(id),
    CONSTRAINT colaborador_trilha_colaborador_id_fkey FOREIGN KEY (colaborador_id) REFERENCES public.colaborador(id),
    UNIQUE (plano_id, colaborador_id)
);

-- 13. COLABORADOR_IMPORT (Tabela de Staging para Importação)
CREATE TABLE public.colaborador_import (
    id BIGSERIAL NOT NULL,
    matricula character varying NOT NULL,
    nome_completo character varying NOT NULL,
    email_corporativo character varying NOT NULL,
    nome_cargo character varying NOT NULL,
    data_admissao date NOT NULL,
    matricula_gestor character varying,
    status_processamento character varying DEFAULT 'PENDENTE',
    mensagem_erro text,
    data_registro timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT colaborador_import_pkey PRIMARY KEY (id)
);

-- ==========================================================
-- FIM DO SCRIPT DDL
-- ==========================================================
