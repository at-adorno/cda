import { Router } from 'express';
import gestorController from '../controllers/GestorController';

const router = Router();

// ========== CRUD Básico ==========
// GET /api/gestores - Listar todos os gestores
router.get('/', gestorController.listar.bind(gestorController));

// POST /api/gestores - Criar novo gestor
router.post('/', gestorController.criar.bind(gestorController));

// GET /api/gestores/:id - Obter gestor por ID
router.get('/:id', gestorController.obterPorId.bind(gestorController));

// PUT /api/gestores/:id - Atualizar gestor
router.put('/:id', gestorController.atualizar.bind(gestorController));

// DELETE /api/gestores/:id - Deletar gestor
router.delete('/:id', gestorController.deletar.bind(gestorController));

// ========== Endpoints de Análise e Consultas ==========

// GET /api/gestores/:gestorId/dashboard/:cicloId
// Retorna visão consolidada do desempenho da equipe
router.get('/:gestorId/dashboard/:cicloId', gestorController.obterDashboard.bind(gestorController));

// GET /api/gestores/:gestorId/quadrante/:cicloId/:quadrante
// Filtra colaboradores por quadrante Nine Box
router.get(
  '/:gestorId/quadrante/:cicloId/:quadrante',
  gestorController.obterColaboradoresPorQuadrante.bind(gestorController),
);

// GET /api/gestores/:gestorId/alertas/:cicloId?status=CRITICO
// Filtra colaboradores por status de alerta
router.get('/:gestorId/alertas/:cicloId', gestorController.obterColaboradoresPorStatusAlerta.bind(gestorController));

// GET /api/gestores/:gestorId/comparativo/:cicloId
// Comparativo equipe vs empresa
router.get(
  '/:gestorId/comparativo/:cicloId',
  gestorController.obterComparativoEquipe.bind(gestorController),
);

// GET /api/gestores/:gestorId/sucessores/:cicloId?cargo=Analista
// Identifica sucessores potenciais para promoção
router.get(
  '/:gestorId/sucessores/:cicloId',
  gestorController.obterSucessoresPotenciais.bind(gestorController),
);

export default router;