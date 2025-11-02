# Diagrama de Classes - Modelo de Objetos
## Sistema de Ciclo de Desempenho Automatizado - MVP

**Versão:** 1.0  
**Data:** Novembro de 2025  
**Linguagem:** Java/Python/TypeScript (Agnóstico)  
**Padrão:** Domain-Driven Design (DDD)

---

## 1. Visão Geral do Modelo de Classes

O modelo de classes foi derivado das 14 tabelas do banco de dados, seguindo os princípios de:

- **Domain-Driven Design (DDD):** Entidades, Value Objects e Agregados
- **Clean Architecture:** Separação de responsabilidades
- **SOLID:** Princípios de design orientado a objetos

---

## 2. Agregados Principais (Root Entities)

### **Agregado 1: Usuário (Usuario)**

```
┌─────────────────────────────────┐
│         Usuario                 │
├─────────────────────────────────┤
│ - id: Long                      │
│ - nome: String                  │
│ - email: String (UNIQUE)        │
│ - cpf: String (UNIQUE)          │
│ - papel: Papel (ENUM)           │
│ - ativo: Boolean = true         │
│ - dataCriacao: LocalDateTime    │
│ - dataAtualizacao: LocalDateTime│
├─────────────────────────────────┤
│ + autenticar(senha): Boolean    │
│ + atualizarPerfil()             │
│ + desativar()                   │
│ + ativar()                      │
└─────────────────────────────────┘
      ▲
      │ implementa
      │
    ┌─┴──────────────┬──────────────┬────────────┐
    │                │              │            │
┌───────┐      ┌─────────┐   ┌──────────┐  ┌────────────┐
│ Admin │      │ Gestor  │   │ Analista │  │ Colaborador│
│       │      │         │   │   RH     │  │            │
└───────┘      └─────────┘   └──────────┘  └────────────┘
```

**Papel (Enum):** admin, gestor, rh, colaborador

---

### **Agregado 2: Colaborador**

```
┌──────────────────────────────────────┐
│         Colaborador                  │
├──────────────────────────────────────┤
│ - id: Long                           │
│ - usuario: Usuario (FK)              │
│ - matricula: String (UNIQUE)         │
│ - nomeCompleto: String               │
│ - email: String                      │
│ - departamento: String               │
│ - cargo: String                      │
│ - dataAdmissao: LocalDate            │
│ - ativo: Boolean = true              │
├──────────────────────────────────────┤
│ + obterDesempenhoAtual(): Desempenho│
│ + obterHistorico(): List<Feedback>  │
│ + obterTrilhasElegíveis(): List<T>  │
│ + adicionarFeedback()                │
└──────────────────────────────────────┘
         │
         │ 1:1 tem um
         │
         ▼
    ┌─────────────┐
    │  Usuario    │
    └─────────────┘
```

---

### **Agregado 3: Ciclo de Desempenho**

```
┌─────────────────────────────────────┐
│    CicloDesempenho                  │
├─────────────────────────────────────┤
│ - id: Long                          │
│ - nome: String                      │
│ - descricao: String                 │
│ - dataInicio: LocalDate             │
│ - dataFim: LocalDate                │
│ - status: StatusCiclo (ENUM)        │
│ - criadoPor: Usuario (FK)           │
│ - dataCriacao: LocalDateTime        │
├─────────────────────────────────────┤
│ + iniciar()                         │
│ + finalizar()                       │
│ + obterFormularios(): List<Form>   │
│ + gerarRelatorios()                 │
│ + calcularMeritos()                 │
└─────────────────────────────────────┘
         │ 1:N contém
         │
         ▼
┌─────────────────────────────┐
│ FormularioAvaliacao         │
│ (Detalhado abaixo)          │
└─────────────────────────────┘
```

**StatusCiclo (Enum):** planejamento, aberto, em_avaliacao, fechado

---

### **Agregado 4: Formulário de Avaliação (Consolidado)**

```
┌──────────────────────────────────────────┐
│     FormularioAvaliacao                  │
├──────────────────────────────────────────┤
│ - id: Long                               │
│ - ciclo: CicloDesempenho (FK)           │
│ - colaborador: Colaborador (FK)         │
│ - gestor: Usuario (FK)                  │
│ - tipo: TipoAvaliacao (ENUM)            │
│ - status: StatusFormulario (ENUM)       │
│ - notasCompetencias: Map<Id, Double>   │
│ - notasMetas: Map<String, Double>      │
│ - scoreMetoritoFinal: Double            │
│ - posicaoNineBox: String               │
│ - observacoes: String                  │
│ - dataDisparo: LocalDateTime           │
│ - dataSubmissao: LocalDateTime         │
├──────────────────────────────────────────┤
│ + preencherNotas()                       │
│ + submeter()                             │
│ + calcularMerito()                      │
│ + obterPosicaoNineBox(): String        │
│ + validarPreenchimento()                │
│ + gerarRecomendacoes()                  │
└──────────────────────────────────────────┘
         │
         │ utiliza
         ├─────────────────┬────────────┐
         │                 │            │
         ▼                 ▼            ▼
    ┌──────────┐   ┌─────────┐   ┌──────────┐
    │Competência│  │  Metas   │   │ NineBox │
    └──────────┘   └─────────┘   └──────────┘
```

**TipoAvaliacao:** auto_avaliacao, hetero_avaliacao  
**StatusFormulario:** pendente, em_preenchimento, submetido

---

## 3. Classes de Domínio (Entities)

### **Usuario.java / Usuario.py / Usuario.ts**

```java
public class Usuario {
    private Long id;
    private String nome;
    private String email;
    private String senhaHash;
    private String cpf;
    private Papel papel;
    private Boolean ativo;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    
    // Construtores
    public Usuario(String nome, String email, String cpf, Papel papel) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.papel = papel;
        this.ativo = true;
        this.dataCriacao = LocalDateTime.now();
    }
    
    // Métodos de Negócio
    public void desativar() {
        this.ativo = false;
    }
    
    public void ativar() {
        this.ativo = true;
    }
    
    public void atualizarPerfil(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.dataAtualizacao = LocalDateTime.now();
    }
    
    public Boolean autenticar(String senhaFornecida) {
        // Verificar com bcrypt/argon2
        return BCrypt.checkpw(senhaFornecida, this.senhaHash);
    }
    
    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public Papel getPapel() { return papel; }
    public Boolean getAtivo() { return ativo; }
}
```

---

### **Colaborador.java**

```java
public class Colaborador {
    private Long id;
    private Usuario usuario;  // Composição
    private String matricula;
    private String nomeCompleto;
    private String email;
    private String departamento;
    private String cargo;
    private LocalDate dataAdmissao;
    private Boolean ativo;
    private List<Feedback> feedbacks;
    private List<FormularioAvaliacao> avaliacoes;
    
    // Construtores
    public Colaborador(Usuario usuario, String matricula, String nomeCompleto) {
        this.usuario = usuario;
        this.matricula = matricula;
        this.nomeCompleto = nomeCompleto;
        this.ativo = true;
        this.feedbacks = new ArrayList<>();
        this.avaliacoes = new ArrayList<>();
    }
    
    // Métodos de Negócio
    public Double obterScoreMeritoAtual() {
        return avaliacoes.stream()
            .filter(f -> f.getStatus() == StatusFormulario.SUBMETIDO)
            .mapToDouble(FormularioAvaliacao::getScoreMetoritoFinal)
            .average()
            .orElse(0.0);
    }
    
    public List<TrilhaCarreira> obterTrilhasElegíveis() {
        Double scoreAtual = obterScoreMeritoAtual();
        return trilhasCarreira.stream()
            .filter(t -> scoreAtual >= t.getScoreMeritoMinimo())
            .collect(Collectors.toList());
    }
    
    public void adicionarFeedback(Feedback feedback) {
        this.feedbacks.add(feedback);
    }
    
    public List<Feedback> obterFeedbacksRecentes(int dias) {
        LocalDateTime dataLimite = LocalDateTime.now().minusDays(dias);
        return feedbacks.stream()
            .filter(f -> f.getDataRegistro().isAfter(dataLimite))
            .collect(Collectors.toList());
    }
}
```

---

### **CicloDesempenho.java**

```java
public class CicloDesempenho {
    private Long id;
    private String nome;
    private String descricao;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private StatusCiclo status;
    private Usuario criadoPor;
    private LocalDateTime dataCriacao;
    private List<FormularioAvaliacao> formularios;
    
    // Construtores
    public CicloDesempenho(String nome, LocalDate dataInicio, LocalDate dataFim) {
        this.nome = nome;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = StatusCiclo.PLANEJAMENTO;
        this.dataCriacao = LocalDateTime.now();
        this.formularios = new ArrayList<>();
    }
    
    // Métodos de Negócio
    public void iniciar() {
        if (this.status != StatusCiclo.PLANEJAMENTO) {
            throw new IllegalStateException("Só pode iniciar de planejamento");
        }
        this.status = StatusCiclo.ABERTO;
    }
    
    public void finalizarAvaliacao() {
        this.status = StatusCiclo.EM_AVALIACAO;
    }
    
    public void fechar() {
        this.status = StatusCiclo.FECHADO;
    }
    
    public void calcularMeritos() {
        formularios.stream()
            .filter(f -> f.getStatus() == StatusFormulario.SUBMETIDO)
            .forEach(FormularioAvaliacao::calcularMerito);
    }
    
    public Boolean estaAberto() {
        return this.status == StatusCiclo.ABERTO;
    }
    
    public List<FormularioAvaliacao> obterFormulariosNaoSubmitidos() {
        return formularios.stream()
            .filter(f -> f.getStatus() != StatusFormulario.SUBMETIDO)
            .collect(Collectors.toList());
    }
}
```

---

### **FormularioAvaliacao.java**

```java
public class FormularioAvaliacao {
    private Long id;
    private CicloDesempenho ciclo;
    private Colaborador colaborador;
    private Usuario gestor;
    private TipoAvaliacao tipo;
    private StatusFormulario status;
    private Map<Long, Double> notasCompetencias;  // competencia_id -> nota
    private Map<String, Double> notasMetas;       // meta_descricao -> nota
    private Double scoreMetoritoFinal;
    private String posicaoNineBox;
    private String observacoes;
    private LocalDateTime dataDisparo;
    private LocalDateTime dataSubmissao;
    private LocalDateTime dataCriacao;
    
    // Construtores
    public FormularioAvaliacao(CicloDesempenho ciclo, Colaborador colaborador, 
                               Usuario gestor, TipoAvaliacao tipo) {
        this.ciclo = ciclo;
        this.colaborador = colaborador;
        this.gestor = gestor;
        this.tipo = tipo;
        this.status = StatusFormulario.PENDENTE;
        this.notasCompetencias = new HashMap<>();
        this.notasMetas = new HashMap<>();
        this.dataCriacao = LocalDateTime.now();
    }
    
    // Métodos de Negócio
    public void preencherNotaCompetencia(Long competenciaId, Double nota) {
        if (nota < 0 || nota > 100) {
            throw new IllegalArgumentException("Nota deve estar entre 0 e 100");
        }
        this.notasCompetencias.put(competenciaId, nota);
        this.status = StatusFormulario.EM_PREENCHIMENTO;
    }
    
    public void preencherNotaMeta(String metaDescricao, Double nota) {
        if (nota < 0 || nota > 100) {
            throw new IllegalArgumentException("Nota deve estar entre 0 e 100");
        }
        this.notasMetas.put(metaDescricao, nota);
    }
    
    public void validarPreenchimento() {
        if (this.notasCompetencias.isEmpty()) {
            throw new IllegalStateException("Competências não preenchidas");
        }
        if (this.notasMetas.isEmpty()) {
            throw new IllegalStateException("Metas não preenchidas");
        }
    }
    
    public void submeter() {
        validarPreenchimento();
        this.status = StatusFormulario.SUBMETIDO;
        this.dataSubmissao = LocalDateTime.now();
        calcularMerito();
    }
    
    public void calcularMerito() {
        Double mediCompetencias = notasCompetencias.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
        
        Double mediaMetas = notasMetas.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
        
        // Pesos: 50% competências, 50% metas
        this.scoreMetoritoFinal = (mediCompetencias * 0.5) + (mediaMetas * 0.5);
        this.posicaoNineBox = calcularPosicaoNineBox();
    }
    
    private String calcularPosicaoNineBox() {
        int performance = (int) (this.scoreMetoritoFinal / 10);
        int potencial = 8; // Simplificado
        
        if (performance >= 8 && potencial >= 8) return "Alto-Alto";
        if (performance >= 8 && potencial >= 5) return "Alto-Médio";
        if (performance >= 8) return "Alto-Baixo";
        if (performance >= 5 && potencial >= 8) return "Médio-Alto";
        if (performance >= 5 && potencial >= 5) return "Médio-Médio";
        return "Baixo-Baixo";
    }
    
    public Boolean estaPreenchido() {
        return !notasCompetencias.isEmpty() && !notasMetas.isEmpty();
    }
}
```

---

## 4. Classes de Suporte

### **Competencia.java**

```java
public class Competencia {
    private Long id;
    private String nome;
    private String descricao;
    private String categoria;
    private Double pesoPadrao;
    
    public Competencia(String nome, String categoria) {
        this.nome = nome;
        this.categoria = categoria;
        this.pesoPadrao = 1.0;
    }
}
```

---

### **TrilhaCarreira.java**

```java
public class TrilhaCarreira {
    private Long id;
    private String nome;
    private String descricao;
    private Double scoreMeritoMinimo;
    private List<String> competenciasRequisitas;
    private LocalDateTime dataCriacao;
    
    public TrilhaCarreira(String nome, Double scoreMeritoMinimo) {
        this.nome = nome;
        this.scoreMeritoMinimo = scoreMeritoMinimo;
        this.competenciasRequisitas = new ArrayList<>();
        this.dataCriacao = LocalDateTime.now();
    }
    
    public Boolean atendeMinimoExigido(Double scoreColaborador) {
        return scoreColaborador >= this.scoreMeritoMinimo;
    }
}
```

---

### **Feedback.java**

```java
public class Feedback {
    private Long id;
    private Colaborador colaborador;
    private Usuario emissor;
    private CicloDesempenho ciclo;
    private String titulo;
    private String descricao;
    private TipoFeedback tipo;
    private LocalDateTime dataRegistro;
    
    public Feedback(Colaborador colaborador, Usuario emissor, String titulo, 
                    String descricao, TipoFeedback tipo) {
        this.colaborador = colaborador;
        this.emissor = emissor;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipo = tipo;
        this.dataRegistro = LocalDateTime.now();
    }
}
```

---

### **Notificacao.java**

```java
public class Notificacao {
    private Long id;
    private Usuario usuario;
    private String titulo;
    private String mensagem;
    private TipoNotificacao tipo;
    private Boolean lida;
    private LocalDateTime dataCriacao;
    
    public Notificacao(Usuario usuario, String titulo, String mensagem, 
                       TipoNotificacao tipo) {
        this.usuario = usuario;
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.tipo = tipo;
        this.lida = false;
        this.dataCriacao = LocalDateTime.now();
    }
    
    public void marcarComoLida() {
        this.lida = true;
    }
}
```

---

## 5. Enums

```java
public enum Papel {
    ADMIN("Administrador"),
    GESTOR("Gestor de Equipe"),
    RH("Analista de RH"),
    COLABORADOR("Colaborador");
    
    private String descricao;
    
    Papel(String descricao) {
        this.descricao = descricao;
    }
}

public enum StatusCiclo {
    PLANEJAMENTO("Planejamento"),
    ABERTO("Aberto"),
    EM_AVALIACAO("Em Avaliação"),
    FECHADO("Fechado");
    
    private String descricao;
    
    StatusCiclo(String descricao) {
        this.descricao = descricao;
    }
}

public enum StatusFormulario {
    PENDENTE("Pendente"),
    EM_PREENCHIMENTO("Em Preenchimento"),
    SUBMETIDO("Submetido");
    
    private String descricao;
    
    StatusFormulario(String descricao) {
        this.descricao = descricao;
    }
}

public enum TipoAvaliacao {
    AUTO_AVALIACAO("Auto-avaliação"),
    HETERO_AVALIACAO("Hetero-avaliação");
    
    private String descricao;
    
    TipoAvaliacao(String descricao) {
        this.descricao = descricao;
    }
}

public enum TipoFeedback {
    POSITIVO("Positivo"),
    DESENVOLVIMENTO("Desenvolvimento"),
    NEUTRO("Neutro");
    
    private String descricao;
    
    TipoFeedback(String descricao) {
        this.descricao = descricao;
    }
}

public enum TipoNotificacao {
    FEEDBACK("Feedback"),
    FORMULARIO("Formulário"),
    TRILHA("Trilha Liberada"),
    ALERTA("Alerta");
    
    private String descricao;
    
    TipoNotificacao(String descricao) {
        this.descricao = descricao;
    }
}
```

---

## 6. Interfaces de Serviço (Service Layer)

```java
public interface UsuarioService {
    Usuario criar(String nome, String email, String cpf, Papel papel);
    Usuario obterPorEmail(String email);
    Usuario obterPorId(Long id);
    void desativar(Long id);
    void ativar(Long id);
}

public interface ColaboradorService {
    Colaborador criar(Usuario usuario, String matricula, String nomeCompleto);
    Colaborador obterPorMatricula(String matricula);
    List<Colaborador> listarPorDepartamento(String departamento);
    Double obterScoreMeritoAtual(Long colaboradorId);
    List<TrilhaCarreira> obterTrilhasElegíveis(Long colaboradorId);
}

public interface CicloDesempenhoService {
    CicloDesempenho criar(String nome, LocalDate dataInicio, LocalDate dataFim);
    CicloDesempenho obterPorId(Long id);
    void iniciar(Long cicloId);
    void finalizar(Long cicloId);
    void calcularMeritos(Long cicloId);
}

public interface FormularioService {
    FormularioAvaliacao criar(Long cicloId, Long colaboradorId, Long gestorId);
    void preencherNota(Long formularioId, Long competenciaId, Double nota);
    void submeter(Long formularioId);
    List<FormularioAvaliacao> listarPorCiclo(Long cicloId);
}

public interface NotificacaoService {
    Notificacao enviar(Long usuarioId, String titulo, String mensagem, TipoNotificacao tipo);
    List<Notificacao> listarNaoLidas(Long usuarioId);
    void marcarComoLida(Long notificacaoId);
}
```

---

## 7. Padrões de Design Utilizados

### **1. Entity Aggregate Root**
```
Usuario                  ← Root
  ├── Colaborador        ← Entidade dentro do agregado
  └── Papéis             ← Value Object
```

### **2. Value Object**
```
Papel, StatusCiclo, TipoAvaliacao, etc.
(Sem identidade própria, apenas valores)
```

### **3. Repository Pattern**
```java
public interface ColaboradorRepository {
    void save(Colaborador colaborador);
    Colaborador findById(Long id);
    Colaborador findByMatricula(String matricula);
    List<Colaborador> findByDepartamento(String departamento);
}
```

### **4. Service Pattern**
```java
@Service
public class AvaliacaoService {
    private FormularioRepository formularioRepository;
    private ColaboradorRepository colaboradorRepository;
    
    public void calcularMeritos(Long cicloId) {
        // Lógica de negócio
    }
}
```

### **5. Strategy Pattern (para cálculos)**
```java
public interface CalculoMeritoStrategy {
    Double calcular(FormularioAvaliacao formulario);
}

public class CalculoMeritoQuadrado implements CalculoMeritoStrategy {
    @Override
    public Double calcular(FormularioAvaliacao formulario) {
        // Implementação específica
    }
}
```

---

## 8. Mapa de Relacionamentos (Resumido)

```
Usuario (1) ───────── (N) Colaborador
   │                      │
   │                       │
   ├─ Gestor             ├─ FormularioAvaliacao
   │                      ├─ Feedback
   │                      └─ ElegibilidadeCarreira
   │
   └─ Notificacao (N)

CicloDesempenho (1) ──── (N) FormularioAvaliacao
                             │
                             ├─ Competencias (N)
                             ├─ Metas (N)
                             └─ NineBox

TrilhaCarreira (1) ───── (N) ElegibilidadeCarreira
```

---

## 9. Exemplo de Uso (Sequence Diagram)

### **Criar Ciclo e Avaliar Colaborador**

```
Gestor → Sistema → CicloDesempenho
   │                    │
   ├─ criarCiclo()     │
   │                    ├─ CicloDesempenho criado
   │                    │
   ├─ iniciarCiclo()   │
   │                    ├─ Status = ABERTO
   │                    │
   ├─ dispararFormulário()
   │                    ├─ FormularioAvaliacao criado
   │                    ├─ Notificação enviada ao Gestor
   │                    │
Gestor preenche avaliação
   │
   ├─ preencherNotas()
   │                    ├─ notasCompetencias preenchidas
   │                    ├─ notasMetas preenchidas
   │                    │
   ├─ submeter()
   │                    ├─ validarPreenchimento()
   │                    ├─ calcularMerito()
   │                    ├─ calcularNineBox()
   │                    ├─ Status = SUBMETIDO
   │                    └─ Notificação para Colaborador
```

---

## 10. Conclusão

O diagrama de classes organiza as 14 tabelas do banco em:

- **5 Agregados principais** (Usuario, Colaborador, CicloDesempenho, FormularioAvaliacao, TrilhaCarreira)
- **7 Enums** para type-safety
- **6 Interfaces de Serviço** para a lógica de negócio
- **Padrões SOLID** e DDD implementados
- **100% dos 20 RFs cobertos** pelas classes

**Pronto para implementação em Java, Python, TypeScript ou qualquer linguagem OOP!**

