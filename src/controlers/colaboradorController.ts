import { Request, Response } from 'express';
import ColaboradorService from '../serviços/colaborador.service';

class ColaboradorController {
    async criarColaborador(req: Request, res: Response) {
        try {
            const colaborador = await ColaboradorService.criarColaborador(req.body);
            res.status(201).json(colaborador);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

    async listarColaboradores(req: Request, res: Response) {
        try {
            const colaboradores = await ColaboradorService.listarColaboradores();
            res.status(200).json(colaboradores);
        } catch (error: any) {
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }

    async buscarColaboradorPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id_colaborador);
            const colaborador = await ColaboradorService.buscarColaboradorPorId(id);
            res.status(200).json(colaborador);
        } catch (error: any) {
            res.status(404).json({ mensagem: error.message });
        }
    }

    async atualizarColaborador(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id_colaborador);
            const { status } = req.body;
            const colaborador = await ColaboradorService.atualizarStatus(id, status);
            res.status(200).json(colaborador);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
}

export default new ColaboradorController();
