export interface Pontuacao {
    id?: number;
    avaliacao_id: number;
    competencia_id?: number; // Opcional
    meta_id?: number;        // Opcional
    nota: number;
    comentario?: string;
    peso_aplicado?: number;
    created_at?: Date;
    updated_at?: Date;
}
