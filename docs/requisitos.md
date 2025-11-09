# Documentação de Requisitos de Software

## Sistema de Ciclo de Desempenho Automatizado - MVP

**Funcionalidade:** Automatização para um fluxo de trabalho eficiente.  
**Versão:** 04  
**Data:** Novembro de 2025

---

## Equipe do Projeto

| Nome | Papel | Responsabilidades |
|------|-------|-------------------|
| Wanessa Karen | Modeladora de Dados | Modelagem de banco de dados, criação de DER, scripts SQL |
| Alessandra Santos | Desenvolvedora de Rotas | Endpoints da API, controllers, integração de sistemas |
| Andre Tavares | Lógica de Negócio | Services, regras de negócio, algoritmos |
| Diciane Alves | Documentação | Swagger, README, manuais de uso |

---

## 1. Introdução

### 1.1 Objetivo

Este documento define os requisitos técnicos e de negócio para o desenvolvimento e implementação de uma plataforma automatizada de Gestão do Ciclo de Desempenho. O objetivo principal é transformar o processo atual, fragmentado e manual, em um fluxo de trabalho eficiente, transparente e baseado em dados.

### 1.2 Problema de Negócio Atual

O processo de gestão de desempenho é manual, fragmentado em planilhas e formulários, e carece de integração com métricas de mérito, progressão e a matriz Nine Box.

**Consequências:**

- Processo manual e fragmentado em planilhas
- 30% de divergências nas avaliações
- Sobrecarga dos gestores
- Falta de histórico consolidado
- Atrasos em promoções
- Baixa visibilidade para o colaborador

### 1.3 Metas de Sucesso (KPIs)

O projeto será considerado bem-sucedido se:

 1. Banco de dados funcionando com todas as tabelas

 2. Pelo menos 7 dos 9 endpoints do gestor implementados

 3. Tela do colaborador exibindo dados reais

 4. Importação de CSV funcional para pelo menos uma entidade

 5. Cálculo de mérito funcionando corretamente

 6. Sistema rodando sem erros críticos

---

## 2. Requisitos de Usuários (Personas)

| Persona | Uso Principal | Plataforma | Foco da Interação |
|---------|---------------|-----------|-------------------|
| **Gestor de Equipe** | Acompanhamento do ciclo, avaliações, monitoramento de evolução | Web (Desktop) | Tomada de decisões justas e ágeis |
| **Analista de RH** | Consolidação de dados, aplicação de métricas, gestão da sucessão | Web (Desktop) | Precisão e rastreabilidade dos dados; relatórios estratégicos |
| **Colaborador** | Acesso a feedback, acompanhamento de performance, visualização do plano de carreira | Acesso Web Responsivo | Transparência e visibilidade da sua evolução |
| **Administrador de Sistemas** | Configuração de perfis de usuário, manutenção do sistema | Web (Admin - Desktop) | Segurança, controle centralizado, auditoria e conformidade |

---

## 3. Requisitos Funcionais (RF)

Os requisitos funcionais definem as funcionalidades específicas que o sistema deve executar para resolver o problema.

### RF 1: Gestão de Ciclo e Onboarding

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 1.1 | Manutenção de Ciclo de Desempenho | Deve ser possível criar, ler, atualizar e deletar registros relacionados ao ciclo de desempenho | Alta | O sistema deve permitir criação, consulta, atualização e deleção do ciclo de desempenho. O sistema deve validar campos obrigatórios e evitar duplicidade. |
| RF 1.2 | Cadastro de Colaboradores | Cadastro e gerenciamento de dados dos colaboradores no sistema | Alta | O sistema deve permitir o cadastro de colaboradores. O sistema deve validar campos obrigatórios e evitar duplicidade. |
| RF 1.3 | Validação de Preenchimento Mínimo | O sistema deve impedir o envio de qualquer formulário de avaliação sem que todos os campos obrigatórios e pesos mínimos tenham sido preenchidos, garantindo avaliações completas | Alta | O sistema deve impedir envio com campos obrigatórios faltando. Validar pesos mínimos configurados para avaliação. Feedback claro para o usuário indicando campos pendentes. |
| RF 1.4 | Recomendação de Período de Experiência | O sistema deve, ao final do ciclo de experiência, consolidar as notas e recomendar a continuidade ou desligamento, com base em regras predefinidas pelo RH | Alta | Consolidar notas ao final do ciclo e gerar recomendação automática. Regras configuráveis devem ser aplicadas com transparência. Gestor e RH devem acessar relatórios detalhados com justificativas. |

### RF 2: Cálculo e Progressão Automatizada

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 2.1 | Cálculo Automático de Mérito | O sistema deve calcular o score de mérito final do colaborador (cruzamento de competências e metas) utilizando um algoritmo configurável pelo RH | Média | O score deve ser calculado automaticamente com base em competências e metas. Algoritmo deve ser configurável pelo RH sem necessidade de intervenção do desenvolvedor. Resultados disponíveis para gestores e colaboradores em tempo real. |
| RF 2.2 | Módulo Nine Box Dinâmico | O sistema deve posicionar e atualizar automaticamente o colaborador na matriz Nine Box com base no cruzamento dos dados de Performance (Mérito) vs. Potencial (Avaliado) | Média | Colaborador deve ser posicionado automaticamente na matriz Nine Box. Atualização realizada sempre que houver nova avaliação ou métrica. Visualização clara da posição na matriz para gestor e RH. |
| RF 2.3 | Elegibilidade para Plano de Carreira | O sistema deve identificar e liberar automaticamente trilhas de progressão e módulos de carreira para colaboradores que cumprirem os critérios objetivos (ex.: score de mérito ≥ 80%) | Média | Identificar colaboradores que atingem critérios objetivos. Liberar automaticamente trilhas e módulos de carreira correspondentes. Notificar colaborador e gestor sobre disponibilização. |
| RF 2.4 | Histórico Consolidado | O sistema deve armazenar e disponibilizar o histórico completo de todas as avaliações, feedbacks e Nine Box do colaborador para consulta do Gestor e RH | Média | Armazenar avaliações, feedbacks e dados Nine Box de forma íntegra e acessível. O histórico deve ficar disponível para consulta contínua. Garantir segurança e confidencialidade dos dados. |

### RF 3: Painéis e Relatórios (RH/Gestor)

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 3.1 | Painel de Acompanhamento (Gestor) | O Gestor deve ter um painel em tempo real para monitorar o status das avaliações da sua equipe, os resultados parciais e o posicionamento atual na matriz Nine Box | Alta | Será gerado apenas uma query SQL com informações. |
| RF 3.2 | Painel de Sucessão Estratégica (RH) | O sistema deve gerar relatórios de sucessão que identifiquem possíveis sucessores para cargos críticos, exibindo lacunas de competências e sugerindo Planos de Desenvolvimento Individual (PDIs) | Média | Será gerada uam query SQL com as informações. |

### RF 4: Experiência do Colaborador (Mobile)

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 4.1 | Feedback Contínuo e Visualização | O Colaborador deve ser capaz de acessar via Web (Responsivo) seu feedback estruturado, notas de performance e seu plano de carreira/trilhas liberadas | Alta | O colaborador deve acessar via web responsivo seu feedback detalhado. Visualizar notas, evolução e plano de carreira com interface intuitiva. O conteúdo deve carregar em menos de 3 segundos. |

### RF 5: Administração de Sistemas

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 5.1 | Gestão de Perfis de Usuário | O Administrador de Sistemas deve ser capaz de criar, editar, desativar e deletar perfis de usuários, definindo permissões específicas por papel (Gestor, RH, Colaborador, Admin) | Alta | Interface clara para criação e gerenciamento de perfis. Validação de dados obrigatórios. Prevenção de deleção de perfis em uso. Possibilidade de soft delete com manutenção de histórico. |

---

## 4. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais determinam os padrões de qualidade e as restrições técnicas da solução.

### RNF 1: Performance e Escalabilidade

- **RNF 1.1 (Tempo de Resposta):** Todas as telas críticas (painéis, formulários) devem carregar em menos de 3 segundos para 95% das requisições.
- **RNF 1.2 (Processamento de Cálculo):** O cálculo de mérito e o posicionamento no Nine Box devem ser processados em tempo real ou em lotes noturnos, dependendo da necessidade de dados para relatórios, com conclusão em menos de 3 minutos para o lote.
- **RNF 1.3 (Escalabilidade):** A arquitetura da solução deve suportar aumento no número de colaboradores nos próximos anos sem degradação perceptível de performance.

### RNF 2: Usabilidade (UX/UI)

- **RNF 2.1 (Padrão de Design):** A interface do usuário (UI) deve ser limpa, moderna e consistente em todas as plataformas (Web e Mobile).
- **RNF 2.2 (Acessibilidade):** A plataforma deve seguir diretrizes básicas de acessibilidade (WCAG) em termos de contraste de cores e navegação por teclado.

### RNF 3: Integração e Segurança

- **RNF 3.1 (Conformidade Legal):** O tratamento e armazenamento de dados pessoais e de desempenho devem estar em total conformidade com a LGPD (Lei Geral de Proteção de Dados Pessoais).
- **RNF 3.2 (Criptografia):** Todos os dados sensíveis devem ser criptografados em repouso (AES-256) e em trânsito (TLS 1.2 ou superior).

---

## 5. Referências Legais

- Lei Geral de Proteção de Dados Pessoais (LGPD): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

---

## Histórico de Versões

| Versão | Data | Alterações |
|--------|------|-----------|
| 01 | Outubro de 2025 | Versão inicial |
| 02 | Novembro de 2025 | Correções de português, formatação padronizada |
| 03 | Novembro de 2025 | Inclusão do Administrador de Sistemas como persona, adição de RF 5 (Administração de Sistemas) |
| 04 | Novembro de 2025 | Simplificação do projeto |

