import { Router } from 'express';
import { CargoController } from '../controllers/CargoController';

const roteador = Router();
const cargo = new CargoController();

roteador.get('/', cargo.listarTodos.bind(cargo));
roteador.get('/:id', cargo.buscarPorId.bind(cargo));
roteador.post('/', cargo.criar.bind(cargo));
roteador.put('/:id', cargo.atualizar.bind(cargo));
roteador.delete('/:id', cargo.remover.bind(cargo));

export default roteador;
