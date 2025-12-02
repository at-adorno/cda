# Exemplos de arquivos para a pasta `controlers`

Abaixo um conjunto mínimo de controladores (controllers) para uma API Node/Express. Crie os arquivos sugeridos em `src/controlers/`.

- src/controlers/index.js — exporta todos os controladores
- src/controlers/userController.js — CRUD de usuários
- src/controlers/authController.js — login / registro
- src/controlers/productController.js — ações sobre produtos
- src/controlers/errorHandler.js — handler de erros centralizado

Exemplos:

`src/controlers/index.js`
```js
const userController = require('./userController');
const authController = require('./authController');
const productController = require('./productController');
const errorHandler = require('./errorHandler');

module.exports = {
    userController,
    authController,
    productController,
    errorHandler,
};
```

`src/controlers/userController.js`
```js
// Exemplos simples de handlers para rotas de usuário
const getAllUsers = async (req, res, next) => {
    try {
        // const users = await UserModel.find();
        res.json({ data: [], message: 'Lista de usuários (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const user = await UserModel.findById(id);
        res.json({ data: { id }, message: 'Usuário (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const payload = req.body;
        // const user = await UserModel.create(payload);
        res.status(201).json({ data: payload, message: 'Usuário criado (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        // const user = await UserModel.findByIdAndUpdate(id, payload, { new: true });
        res.json({ data: { id, ...payload }, message: 'Usuário atualizado (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        // await UserModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
```

`src/controlers/authController.js`
```js
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // validar usuário e gerar token
        res.json({ token: 'fake-jwt-token', message: 'Login (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        // criar usuário
        res.status(201).json({ data: payload, message: 'Registro (exemplo)' });
    } catch (err) {
        next(err);
    }
};

module.exports = { login, register };
```

`src/controlers/productController.js`
```js
const listProducts = async (req, res, next) => {
    try {
        res.json({ data: [], message: 'Produtos (exemplo)' });
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        res.json({ data: { id: req.params.id }, message: 'Produto (exemplo)' });
    } catch (err) {
        next(err);
    }
};

module.exports = { listProducts, getProduct };
```

`src/controlers/errorHandler.js`
```js
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Erro interno' });
};

module.exports = errorHandler;
```

Observações rápidas:
- Ajuste as importações/exports conforme seu estilo (CommonJS ou ES Modules).
- Conecte esses controladores nas rotas em `src/roputes` (ou onde já estiverem suas rotas).
- Substitua os stubs por chamadas reais ao modelo/serviço conforme a arquitetura do projeto.