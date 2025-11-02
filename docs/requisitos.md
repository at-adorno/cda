# Documentação de Requisitos de Software

## Sistema de Ciclo de Desempenho Automatizado - MVP

**Funcionalidade:** Automatização para um fluxo de trabalho eficiente.  
**Versão:** 03  
**Data:** Novembro de 2025

---

## Equipe do Projeto

| Nome | Papel | Responsabilidades |
|------|-------|-------------------|
| Wanessa | Modeladora de Dados | Modelagem de banco de dados, criação de DER, scripts SQL |
| Alessandra | Desenvolvedora de Rotas | Endpoints da API, controllers, integração de sistemas |
| Andre | Lógica de Negócio | Services, regras de negócio, algoritmos |
| Diciane | Documentação | Swagger, README, manuais de uso |

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

1. Redução do tempo total de avaliação em pelo menos 40%
2. Redução do tempo de consolidação e fechamento do ciclo em 50%
3. Alinhamento do mérito e progressão de carreira a métricas objetivas (mensurável por auditoria interna)
4. Aumento da satisfação e clareza dos colaboradores (mensurável por survey pós-implementação), com meta mínima de 4/5

---

## 2. Requisitos de Usuários (Personas)

| Persona | Uso Principal | Plataforma | Foco da Interação |
|---------|---------------|-----------|-------------------|
| **Gestor de Equipe** | Acompanhamento do ciclo, avaliações, monitoramento de evolução | Web (Desktop/Tablet) | Tomada de decisões justas e ágeis |
| **Analista de RH** | Consolidação de dados, aplicação de métricas, gestão da sucessão | Web (Desktop) | Precisão e rastreabilidade dos dados; relatórios estratégicos |
| **Colaborador** | Acesso a feedback, acompanhamento de performance, visualização do plano de carreira | Celular (App Mobile/Web Responsivo) | Transparência e visibilidade da sua evolução |
| **Administrador de Sistemas** | Configuração de perfis de usuário, gestão de acessos, manutenção do sistema | Web (Admin - Desktop) | Segurança, controle centralizado, auditoria e conformidade |

---

## 3. Requisitos Funcionais (RF)

Os requisitos funcionais definem as funcionalidades específicas que o sistema deve executar para resolver o problema.

### RF 1: Gestão de Ciclo e Onboarding

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 1.1 | Manutenção de Ciclo de Desempenho | Deve ser possível criar, ler, atualizar e deletar registros relacionados ao ciclo de desempenho | Alta | O sistema deve permitir criação, consulta, atualização e deleção do ciclo de desempenho. O sistema deve validar campos obrigatórios e evitar duplicidade. |
| RF 1.2 | Cadastro de Colaboradores | Cadastro e gerenciamento de dados dos colaboradores no sistema | Alta | O sistema deve permitir o cadastro de colaboradores. O sistema deve validar campos obrigatórios e evitar duplicidade. |
| RF 1.3 | Disparo e Controle de Formulários | O sistema deve disparar automaticamente formulários digitais de avaliação (competências e metas) para o Gestor e o Colaborador (se houver self-assessment) | Alta | Formulários digitais devem ser enviados automaticamente para gestor e colaborador no início do ciclo. Envio deve ser confirmado e registrado no sistema. Formulários devem ser acessíveis para preenchimento via Web ou Mobile. |
| RF 1.4 | Validação de Preenchimento Mínimo | O sistema deve impedir o envio de qualquer formulário de avaliação sem que todos os campos obrigatórios e pesos mínimos tenham sido preenchidos, garantindo avaliações completas | Alta | O sistema deve impedir envio com campos obrigatórios faltando. Validar pesos mínimos configurados para avaliação. Feedback claro para o usuário indicando campos pendentes. |
| RF 1.5 | Recomendação de Período de Experiência | O sistema deve, ao final do ciclo de experiência, consolidar as notas e recomendar a continuidade ou desligamento, com base em regras predefinidas pelo RH | Alta | Consolidar notas ao final do ciclo e gerar recomendação automática. Regras configuráveis devem ser aplicadas com transparência. Gestor e RH devem acessar relatórios detalhados com justificativas. |

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
| RF 3.1 | Painel de Acompanhamento (Gestor) | O Gestor deve ter um painel em tempo real para monitorar o status das avaliações da sua equipe, os resultados parciais e o posicionamento atual na matriz Nine Box | Alta | O painel deve mostrar status das avaliações em tempo real. Permitir filtro por equipe, período e tipos de avaliação. Apresentar resumo do posicionamento na matriz Nine Box. |
| RF 3.2 | Painel de Sucessão Estratégica (RH) | O sistema deve gerar relatórios de sucessão que identifiquem possíveis sucessores para cargos críticos, exibindo lacunas de competências e sugerindo Planos de Desenvolvimento Individual (PDIs) | Média | Gerar relatórios de sucessão com identificação de lacunas de competências. Disponibilizar sugestões automáticas para PDIs. Relatórios exportáveis em formatos comuns (PDF, Excel). |
| RF 3.3 | Relatório de Divergências | O sistema deve sinalizar e listar avaliações com notas que fujam de um desvio-padrão aceitável, permitindo ao RH investigar possíveis vieses ou divergências | Média | Identificar avaliações fora do desvio-padrão aceitável. Permitir investigação detalhada com logs e histórico. Notificação automática ao RH sobre possíveis vieses. |

### RF 4: Experiência do Colaborador (Mobile)

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 4.1 | Feedback Contínuo e Visualização Móvel | O Colaborador deve ser capaz de acessar pelo celular (App Mobile ou Web Responsivo) seu feedback estruturado, notas de performance e seu plano de carreira/trilhas liberadas | Alta | O colaborador deve acessar via app ou web responsivo seu feedback detalhado. Visualizar notas, evolução e plano de carreira com interface intuitiva. O conteúdo deve carregar em menos de 3 segundos. |
| RF 4.2 | Notificações | O sistema deve enviar notificações (push/e-mail) ao colaborador sobre novos feedbacks recebidos ou novas trilhas de carreira liberadas | Média | Envio de notificações push ou e-mail em caso de novos feedbacks e habilitação de trilhas. Configuração para gerenciar permissões de recebimento. Histórico de notificações disponível para o colaborador. |

### RF 5: Administração de Sistemas

| ID | Requisito Funcional | Descrição | Prioridade | Critérios de Aceitação |
|---|---|---|---|---|
| RF 5.1 | Gestão de Perfis de Usuário | O Administrador de Sistemas deve ser capaz de criar, editar, desativar e deletar perfis de usuários, definindo permissões específicas por papel (Gestor, RH, Colaborador, Admin) | Alta | Interface clara para criação e gerenciamento de perfis. Validação de dados obrigatórios. Prevenção de deleção de perfis em uso. Possibilidade de soft delete com manutenção de histórico. |
| RF 5.2 | Controle de Acesso Baseado em Função (RBAC) | Implementar controle de acesso baseado em função para limitar acesso e funcionalidades conforme o perfil configurado | Alta | Permissões granulares devem ser aplicadas por funcionalidade. Aplicação de permissões em tempo real. Mensagem clara de acesso negado quando necessário. Logs de tentativas de acesso não autorizado. |
| RF 5.3 | Configuração de Autenticação | O Administrador deve ser capaz de configurar protocolos de autenticação, incluindo Single Sign-On (SSO) quando disponível, e gerenciar políticas de senha | Média | Interface de configuração de SSO acessível. Suporte a protocolos como OAuth 2.0 ou SAML 2.0. Testes de conexão com provedor de identidade. Fallback para autenticação local. |
| RF 5.4 | Auditoria de Acessos | O sistema deve registrar e disponibilizar logs de todas as ações do Administrador sobre perfis e configurações para rastreabilidade e conformidade | Alta | Logs completos de quem fez o quê e quando. Logs imutáveis e resistentes a alterações. Relatórios de auditoria exportáveis. Retenção de logs conforme LGPD. |
| RF 5.5 | Configuração de Parâmetros do Sistema | O Administrador deve configurar parâmetros do sistema como limites de desempenho, fórmulas de cálculo, critérios de elegibilidade e regras de negócio | Média | Interface configurável sem necessidade de alteração de código. Validação de valores inseridos. Versionamento de configurações. Backup automático de configurações. Possibilidade de reverter para versão anterior. |
| RF 5.6 | Monitoramento de Saúde do Sistema | O Administrador deve visualizar e monitorar o status de performance, uso de recursos, alertas e logs de erro do sistema | Média | Dashboard com métricas de performance em tempo real. Alertas de falhas ou anomalias. Logs de erro centralizados. Estatísticas de uso do sistema. Recomendações de ação. |

---

## 4. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais determinam os padrões de qualidade e as restrições técnicas da solução.

### RNF 1: Performance e Escalabilidade

- **RNF 1.1 (Tempo de Resposta):** Todas as telas críticas (painéis, formulários) devem carregar em menos de 3 segundos para 95% das requisições.
- **RNF 1.2 (Processamento de Cálculo):** O cálculo de mérito e o posicionamento no Nine Box devem ser processados em tempo real ou em lotes noturnos, dependendo da necessidade de dados para relatórios, com conclusão em menos de 3 minutos para o lote.
- **RNF 1.3 (Escalabilidade):** A arquitetura da solução deve suportar aumento no número de colaboradores nos próximos anos sem degradação perceptível de performance.

### RNF 2: Usabilidade (UX/UI)

- **RNF 2.1 (Padrão de Design):** A interface do usuário (UI) deve ser limpa, moderna e consistente em todas as plataformas (Web e Mobile).
- **RNF 2.2 (Responsividade Móvel):** A experiência do Colaborador no celular deve ser otimizada para toque e totalmente responsiva.
- **RNF 2.3 (Acessibilidade):** A plataforma deve seguir diretrizes básicas de acessibilidade (WCAG) em termos de contraste de cores e navegação por teclado.

### RNF 3: Integração e Segurança

- **RNF 3.1 (Integração de Dados):** O sistema deve ter uma API (Web Service/REST) bem documentada para integração bidirecional (envio e recebimento) com o Sistema de Folha de Pagamento e outros Módulos de RH.
- **RNF 3.2 (Segurança de Acesso):** O acesso deve ser protegido por autenticação (via Single Sign-On - SSO, se disponível) e deve aderir estritamente ao controle de acesso baseado em função (RBAC - Role-Based Access Control).
- **RNF 3.3 (Conformidade Legal):** O tratamento e armazenamento de dados pessoais e de desempenho devem estar em total conformidade com a LGPD (Lei Geral de Proteção de Dados Pessoais).
- **RNF 3.4 (Criptografia):** Todos os dados sensíveis devem ser criptografados em repouso (AES-256) e em trânsito (TLS 1.2 ou superior).

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

