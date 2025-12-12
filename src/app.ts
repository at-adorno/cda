import express from 'express';
import usuariosRoutes from './routes/usuarioRoutes.ts';
import cicloRoutes from './routes/cicloRoutes.ts';
import colaboradorRoutes from './routes/colaboradorRoutes.ts';
import competenciaRoutes from './routes/competenciaRoutes.ts';
import metaRoutes from './routes/metaRoutes.ts';
import planoCarreiraRoutes from './routes/planoCarreiraRoutes.ts';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ciclos', cicloRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/planoCarreiras', planoCarreiraRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
