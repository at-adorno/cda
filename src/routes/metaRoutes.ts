import { Router } from 'express';
import { MetaController } from '../controllers/MetaController';

const roteador = Router();
const meta = new MetaController();

roteador.get('/', meta.listarTodos.bind(meta));
roteador.get('/:id', meta.buscarPorId.bind(meta));
roteador.post('/', meta.criar.bind(meta));
roteador.put('/:id', meta.atualizar.bind(meta));
roteador.delete('/:id', meta.remover.bind(meta));

export default roteador;
