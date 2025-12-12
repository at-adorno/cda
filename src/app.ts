import express from 'express';
import perfilRoutes from './routes/perfilRoutes.ts';
import usuarioRoutes from './routes/usuarioRoutes.ts';
import cicloColaboradorRoutes from './routes/cicloColaboradorRoutes.ts';
import cicloDesempenhoRoutes from './routes/cicloDesempenhoRoutes.ts';
import colaboradorRoutes from './routes/colaboradorRoutes.ts';
import competenciaRoutes from './routes/competenciaRoutes.ts';
import metaRoutes from './routes/metaRoutes.ts';
import planoCarreiraRoutes from './routes/planoCarreiraRoutes.ts';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ciclosColaborador', cicloColaboradorRoutes);
app.use('/api/ciclosDesempenho', cicloDesempenhoRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/planoCarreiras', planoCarreiraRoutes);
app.use('/api/perfis', perfilRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
