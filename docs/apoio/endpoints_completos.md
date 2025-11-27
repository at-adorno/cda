# Endpoints da API — Documentação Completa com Exemplos de Requisição e Resposta

---

# 🔐 Autenticação

## **POST /login**
Autentica o usuário no sistema.

### **Body esperado**
```json
{
  "email": "ana@example.com",
  "senha": "123"
}
```

### **Resposta de sucesso (200)**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 12,
    "nome": "Ana Souza",
    "perfil": "GESTOR"
  }
}
```

### **Erros possíveis**
- **400** – Campos obrigatórios ausentes  
- **401** – Credenciais inválidas  
- **500** – Erro interno ao autenticar

---

# 👨‍💼 Endpoints do Gestor

---

## **GET /api/gestor/dashboard/:gestorId/:cicloId**
Retorna a visão consolidada do desempenho da equipe.

### **Exemplo de resposta**
```json
{
  "success": true,
  "gestorId": 3,
  "cicloId": 2024,
  "equipe": [
    {
      "id": 10,
      "nome": "Carlos Mendes",
      "scoreMerito": 82.4,
      "scorePotencial": 77,
      "status": "OK"
    }
  ]
}
```

### **Erros possíveis**
- **404** – Gestor não encontrado  
- **500** – Erro ao consultar dados  

---

## **GET /api/gestor/colaborador/:colaboradorId/:cicloId**
Retorna informações completas de desempenho do colaborador.

### **Resposta de exemplo**
```json
{
  "id": 10,
  "nome": "Carlos Mendes",
  "cargo": "Analista",
  "scoreMerito": 82.4,
  "scorePotencial": 77,
  "competencias": [...],
  "metas": [...],
  "feedback": "Ótimo desempenho geral."
}
```

### **Erros possíveis**
- **404** – Colaborador não encontrado  
- **500** – Falha ao consultar banco  

---

## **GET /api/gestor/colaborador/:colaboradorId/competencias/:cicloId**
Retorna as notas de competências do colaborador.

### **Resposta**
```json
{
  "colaboradorId": 10,
  "cicloId": 2024,
  "competencias": [
    { "nome": "Comunicação", "nota": 4 },
    { "nome": "Entrega", "nota": 5 }
  ]
}
```

---

## **GET /api/gestor/colaborador/:colaboradorId/metas/:cicloId**
Retorna status das metas do colaborador.

### **Resposta**
```json
{
  "metas": [
    { "descricao": "Finalizar projeto X", "status": "ATINGIDA" },
    { "descricao": "Melhorar comunicação", "status": "PENDENTE" }
  ]
}
```

---

## **GET /api/gestor/ninebox/:gestorId/:cicloId**
Retorna o posicionamento Nine Box da equipe.

### **Resposta**
```json
{
  "gestorId": 3,
  "cicloId": 2024,
  "ninebox": [
    {
      "colaboradorId": 10,
      "quadrante": "ALTO_DESEMPENHO_ALTO_POTENCIAL"
    }
  ]
}
```

---

## **GET /api/gestor/colaborador/:colaboradorId/historico**
Retorna evolução histórica do colaborador.

### **Resposta**
```json
{
  "colaboradorId": 10,
  "historico": [
    { "ciclo": 2023, "scoreMerito": 75 },
    { "ciclo": 2024, "scoreMerito": 82 }
  ]
}
```

---

## **GET /api/gestor/estatisticas/:gestorId/:cicloId**
Resumo estatístico do time.

### **Resposta**
```json
{
  "mediaMerito": 78.5,
  "mediaPotencial": 72.1,
  "colaboradores": 8
}
```

---

## **GET /api/gestor/alerta/:gestorId/:cicloId**
Lista colaboradores com baixo desempenho ou atenção.

### **Resposta**
```json
{
  "alertas": [
    { "id": 14, "nome": "Marcos Silva", "motivo": "Baixo desempenho" }
  ]
}
```

---

## **GET /api/gestor/comparativo/:gestorId**
Comparação entre anos avaliativos.

### **Resposta**
```json
{
  "gestorId": 3,
  "comparativo": [
    { "ano": 2023, "media": 74.2 },
    { "ano": 2024, "media": 78.9 }
  ]
}
```

---

# 👤 Endpoints do Colaborador

---

## **GET /api/colaborador/perfil/:id**
Retorna as informações do colaborador autenticado.

### **Resposta**
```json
{
  "id": 6,
  "nome": "João Pedro",
  "scoreMerito": 79.3,
  "competencias": [...],
  "metas": [...],
  "feedback": "Continue evoluindo!"
}
```

---

## **GET /api/colaborador/metas/:id/:cicloId**
Retorna metas do colaborador.

### **Resposta**
```json
{
  "metas": [
    { "descricao": "Concluir treinamento Y", "status": "PENDENTE" }
  ]
}
```

---

## **GET /api/colaborador/feedback/:id/:cicloId**
Retorna feedback recebido.

### **Resposta**
```json
{
  "feedback": "Bom desempenho geral."
}
```

---

# 🛠 Admin

---

## **POST /api/admin/usuarios/importar**
Importa usuários via CSV.

### **Body (multipart/form-data)**
Arquivo CSV contendo:

```
nome,email,perfil
Ana,ana@example.com,GESTOR
```

### **Resposta**
```json
{
  "success": true,
  "importados": 14
}
```

---

## **POST /api/admin/colaboradores/importar**
Importa colaboradores.

---

## **POST /api/admin/ciclos**
Cria um ciclo de avaliação.

### **Body**
```json
{
  "ano": 2024,
  "descricao": "Ciclo anual 2024"
}
```

---

## **POST /api/admin/competencias**
Cria uma competência.

### **Body**
```json
{
  "nome": "Comunicação",
  "descricao": "Clareza e objetividade"
}
```

---

## **POST /api/admin/ninebox/configurar**
Cria configuração do Nine Box.

### **Body**
```json
{
  "quadrante": "ALTO_DESEMPENHO_ALTO_POTENCIAL",
  "cor": "#00FF00"
}
```

---

## **GET /api/admin/ninebox/configuracao**
Retorna configurações.

---

## **PUT /api/admin/ninebox/configuracao/:id**
Atualiza configuração.

---

Arquivo gerado automaticamente.
