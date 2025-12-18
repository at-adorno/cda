import { Router } from 'express';
import NineBoxController from '../controllers/NineBoxController';

const router = Router();

router.post('/', NineBoxController.create);
router.get('/', NineBoxController.findAll);
router.get('/:id', NineBoxController.findById);
router.put('/:id', NineBoxController.update);
router.delete('/:id', NineBoxController.delete);

export default router;
