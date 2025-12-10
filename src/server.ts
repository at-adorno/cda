import express from 'express';
import usuariosRoutes from './routes/usuariosRoutes.ts';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
