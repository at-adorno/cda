import { Router } from 'express';
import perfilController from '../controllers/PerfilController'; // import da instância

const roteador = Router();

// Usando diretamente a instância do controller
roteador.get('/', perfilController.listarTodos.bind(perfilController));
roteador.get('/:id', perfilController.buscarPorId.bind(perfilController));
roteador.post('/', perfilController.criar.bind(perfilController));
roteador.put('/:id', perfilController.atualizar.bind(perfilController));
roteador.delete('/:id', perfilController.remover.bind(perfilController));

export default roteador;