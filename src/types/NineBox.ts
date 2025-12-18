export interface NineBox {
    id?: number;
    ciclo_colaborador_id: number;
    posicao_x_potencial: string;
    posicao_y_desempenho: string;
    score_competencias: number;
    score_metas: number;
    score_final_merito: number;
    elegivel_carreira: boolean;
    data_calculo?: Date;
    created_at?: Date;
    updated_at?: Date;
}
