***

# Estrutura Sugerida de Pastas – Backend

```
performance-management-api/
│
├── src/
│   ├── config/
│   │   ├── database.ts              # Configuração TypeORM/Postgres
│   │   ├── auth.ts                  # Configuração JWT
│   │   └── email.ts                 # Configuração Nodemailer
│   │
│   ├── entities/                    # Entidades TypeORM
│   │   ├── User.ts
│   │   ├── Employee.ts
│   │   ├── EvaluationCycle.ts
│   │   ├── EvaluationCriteria.ts
│   │   ├── Evaluation.ts
│   │   ├── EvaluationAnswer.ts
│   │   ├── FinalResult.ts
│   │   └── Notification.ts
│   │
│   ├── repositories/                # Repositórios de acesso ao banco
│   │   ├── UserRepository.ts
│   │   ├── EmployeeRepository.ts
│   │   ├── CycleRepository.ts
│   │   ├── EvaluationRepository.ts
│   │   └── ResultRepository.ts
│   │
│   ├── services/                    # Lógica de negócio (services)
│   │   ├── AuthService.ts
│   │   ├── UserService.ts
│   │   ├── EmployeeService.ts
│   │   ├── CycleService.ts
│   │   ├── EvaluationService.ts
│   │   ├── MeritCalculationService.ts
│   │   ├── ResultsService.ts
│   │   ├── DashboardService.ts
│   │   ├── NineBoxService.ts
│   │   ├── NotificationService.ts
│   │   └── EmailService.ts
│   │
│   ├── controllers/                 # Controllers (recebem requests HTTP)
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   ├── EmployeeController.ts
│   │   ├── CycleController.ts
│   │   ├── EvaluationController.ts
│   │   ├── ResultController.ts
│   │   └── DashboardController.ts
│   │
│   ├── routes/                      # Definição das rotas
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── employees.routes.ts
│   │   ├── cycles.routes.ts
│   │   ├── evaluations.routes.ts
│   │   ├── results.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── index.ts
│   │
│   ├── middlewares/                 # Middlewares customizados
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── logger.middleware.ts
│   │
│   ├── validators/                  # Schemas de validação
│   ├── types/                       # Interfaces e tipos TypeScript
│   ├── utils/                       # Funções auxiliares e helpers
│   ├── docs/                        # Swagger docs
│   ├── database/                    # Scripts e migrations
│   │   ├── migrations/
│   │   └── seeds/
│   ├── app.ts
│   └── server.ts
│
├── tests/                           # Testes unitários e integração
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── jest.config.js
├── package.json
├── README.md
└── docker-compose.yml                # (opcional para PostgreSQL local)
```

***

## Exemplo de Service (MeritCalculationService.ts)

```typescript
import { EvaluationRepository } from '../repositories/EvaluationRepository';
import { ResultRepository } from '../repositories/ResultRepository';
import { FinalResult } from '../entities/FinalResult';

export class MeritCalculationService {
  private evaluationRepository = new EvaluationRepository();
  private resultRepository = new ResultRepository();

  async calculateMerit(cycleId: number, employeeId: number): Promise<FinalResult> {
    // Buscar autoavaliação
    const selfEvaluation = await this.evaluationRepository.findOne({
      where: { ciclo_id: cycleId, colaborador_id: employeeId, tipo: 'AUTOAVALIACAO' },
      relations: ['respostas']
    });
    // Buscar avaliação do gestor
    const managerEvaluation = await this.evaluationRepository.findOne({
      where: { ciclo_id: cycleId, colaborador_id: employeeId, tipo: 'AVALIACAO_GESTOR' },
      relations: ['respostas']
    });

    if (!selfEvaluation || !managerEvaluation) throw new Error('Avaliações incompletas');

    const selfScore = this.calculateAverage(selfEvaluation.respostas);
    const managerScore = this.calculateAverage(managerEvaluation.respostas);
    const finalScore = (selfScore * 0.3) + (managerScore * 0.7);
    const quadrant = this.determineNineBoxQuadrant(finalScore);

    return await this.resultRepository.save({
      ciclo_id: cycleId,
      colaborador_id: employeeId,
      nota_autoavaliacao: selfScore,
      nota_avaliacao_gestor: managerScore,
      nota_final: finalScore,
      quadrante_ninebox: quadrant
    });
  }

  private calculateAverage(answers: any[]): number {
    if (answers.length === 0) return 0;
    const sum = answers.reduce((acc, ans) => acc + ans.nota, 0);
    return sum / answers.length;
  }
  private determineNineBoxQuadrant(score: number): number {
    if (score >= 9) return 9;
    if (score >= 8) return 8;
    if (score >= 7) return 7;
    if (score >= 6) return 6;
    if (score >= 5) return 5;
    if (score >= 4) return 4;
    if (score >= 3) return 3;
    if (score >= 2) return 2;
    return 1;
  }
}
```

***