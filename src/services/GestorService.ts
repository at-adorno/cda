import gestorRepository from '../repositories/GestorRepository';
import { Gestor, ColaboradorAvaliacao, FiltroColaboradores } from '../types/Gestor';

class GestorService {
  // Obter detalhes completos de um gestor
  async obterGestorCompleto(id: number): Promise<Gestor> {
    const gestor = await gestorRepository.obterGestorPorId(id);
    if (!gestor) throw new Error('GESTOR_NAO_ENCONTRADO');
    return gestor;
  }

  // Listar gestores com filtros
  async listarGestores(): Promise<Gestor[]> {
    return gestorRepository.listarGestores();
  }

  // Criar novo gestor
  async criarGestor(dados: Gestor): Promise<Gestor> {
    if (!dados.usuarioId) throw new Error('USUARIO_ID_OBRIGATORIO');
    if (!dados.departamento) throw new Error('DEPARTAMENTO_OBRIGATORIO');

    return gestorRepository.criarGestor(dados);
  }

  // Atualizar gestor
  async atualizarGestor(id: number, dados: Partial<Gestor>): Promise<Gestor> {
    const gestorAtualizado = await gestorRepository.atualizarGestor(id, dados);
    if (!gestorAtualizado) throw new Error('GESTOR_NAO_ENCONTRADO');
    return gestorAtualizado;
  }

  // Deletar gestor
  async deletarGestor(id: number): Promise<void> {
    const sucesso = await gestorRepository.deletarGestor(id);
    if (!sucesso) throw new Error('GESTOR_NAO_ENCONTRADO');
