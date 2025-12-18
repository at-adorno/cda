export interface Avaliacao {
    id?: number;
    ciclo_colaborador_id: number;
    avaliador_id: number;
    tipo: string; // Ex: 'GESTOR', 'AUTOAVALIACAO'
    status: string;
    pontuacao_merito?: number;
    data_envio?: Date;
    comentario?: string;
    created_at?: Date;
    updated_at?: Date;
}
