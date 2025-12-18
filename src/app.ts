import express from 'express';
import perfilRoutes from './routes/perfilRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import cicloColaboradorRoutes from './routes/cicloColaboradorRoutes';
import cicloDesempenhoRoutes from './routes/cicloDesempenhoRoutes';
import colaboradorRoutes from './routes/colaboradorRoutes';
import competenciaRoutes from './routes/competenciaRoutes';
import metaRoutes from './routes/metaRoutes';
import planoCarreiraRoutes from './routes/planoCarreiraRoutes';
import cargoRoutes from './routes/cargoRoute';
import avaliacaoRoutes from './routes/avaliacaoRoute';
import pontuacaoRoutes from './routes/pontuacaoRoutes';
import nineBoxRoutes from './routes/nineBoxRoutes';
import gestorRoutes from './routes/gestorRoutes';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ciclosColaborador', cicloColaboradorRoutes);
app.use('/api/ciclosDesempenho', cicloDesempenhoRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/planoCarreiras', planoCarreiraRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/cargos', cargoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/pontuacoes', pontuacaoRoutes);
app.use('/api/nineBoxes', nineBoxRoutes);
app.use('/api/gestores', gestorRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
