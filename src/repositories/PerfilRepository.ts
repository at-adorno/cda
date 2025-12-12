import { Perfil } from '../types/Perfil';

export class PerfilRepository {
  private perfis: Perfil[] = [];
  private nextId = 1;

  listar(): Perfil[] {
    return this.perfis;
  }

  buscarPorId(id: number): Perfil | undefined {
    return this.perfis.find(p => p.id === id);
  }

  criar(perfil: Perfil): Perfil {
    const novoPerfil = {
      ...perfil,
      id: this.nextId++,
      dataCriacao: new Date()
    };
    this.perfis.push(novoPerfil);
    return novoPerfil;
  }

  atualizar(id: number, perfil: Partial<Perfil>): Perfil | undefined {
    const index = this.perfis.findIndex(p => p.id === id);
    if (index !== -1) {
      this.perfis[index] = {
        ...this.perfis[index],
        ...perfil,
        dataAtualizacao: new Date()
      };
      return this.perfis[index];
    }
    return undefined;
  }

  remover(id: number): boolean {
    const index = this.perfis.findIndex(p => p.id === id);
    if (index !== -1) {
      this.perfis.splice(index, 1);
      return true;
    }
    return false;
  }
}
