import Colaborador from '../modelos/Colaborador';
import Usuario from '../modelos/Usuario';

class ColaboradorService {
    // Criação de colaborador com validações
    async criarColaborador(dados: any) {
        // Valida matrícula
        const existente = await Colaborador.findOne({ where: { matricula: dados.matricula } });
        if (existente) throw new Error('Matrícula já cadastrada.');

        // Valida gestor
        if (dados.id_gestor) {
            const gestor = await Colaborador.findByPk(dados.id_gestor);
            if (!gestor) throw new Error('Gestor não encontrado.');
        }

        // Cria colaborador
        const colaborador = await Colaborador.create(dados);
        return colaborador;
    }

    // Listar todos colaboradores (incluindo Gestor e Usuário)
    async listarColaboradores() {
        return await Colaborador.findAll({
            include: [
                { model: Colaborador, as: 'Gestor' },
                { model: Usuario, as: 'Usuario' }
            ]
        });
    }

    // Buscar colaborador por ID
    async buscarColaboradorPorId(id: number) {
        const colaborador = await Colaborador.findByPk(id, {
            include: [
                { model: Colaborador, as: 'Gestor' },
                { model: Usuario, as: 'Usuario' }
            ]
        });
        if (!colaborador) throw new Error('Colaborador não encontrado.');
        return colaborador;
    }

    // Atualizar status
    async atualizarStatus(id: number, novoStatus: string) {
        const colaborador = await Colaborador.findByPk(id);
        if (!colaborador) throw new Error('Colaborador não encontrado.');
        colaborador.status = novoStatus;
        await colaborador.save();
        return colaborador;
    }
}

export default new ColaboradorService();