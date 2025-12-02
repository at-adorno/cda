
# Estrutura de Rotas (routes)

## Arquivos a serem criados na pasta `routes`

### `index.ts`
```typescript
import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;
```

### `userRoutes.ts`
```typescript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

### `productRoutes.ts`
```typescript
import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
```

## Estrutura de pasta
```
routes/
├── index.ts
├── userRoutes.ts
└── productRoutes.ts
```
