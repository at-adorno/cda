# Exemplos de Preenchimento - Services

## Estrutura de Arquivo de Serviço

```javascript
// exemplo-servico.js
class ExemploServico {
    constructor() {
        this.nome = 'Exemplo';
    }

    async executar(params) {
        // Implementação do serviço
        return { sucesso: true, dados: params };
    }
}

module.exports = ExemploServico;
```

## Padrão de Uso

```javascript
// Em outro arquivo
const ExemploServico = require('./exemplo-servico');

const servico = new ExemploServico();
const resultado = await servico.executar({ id: 1 });
```

## Checklist de Preenchimento

- [ ] Nome descritivo da classe
- [ ] Construtor com inicialização
- [ ] Métodos async para operações
- [ ] Tratamento de erros
- [ ] Exportação do módulo
- [ ] Documentação JSDoc
