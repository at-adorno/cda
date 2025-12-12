import { Router } from 'express';
import { PerfilController } from '../controllers/PerfilController';

const roteador = Router();
const perfil = new PerfilController();

roteador.get('/', perfil.listarTodos.bind(perfil));
roteador.get('/:id', perfil.buscarPorId.bind(perfil));
roteador.post('/', perfil.criar.bind(perfil));
roteador.put('/:id', perfil.atualizar.bind(perfil));
roteador.delete('/:id', perfil.remover.bind(perfil));

export default roteador;
