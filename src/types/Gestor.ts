export interface Gestor {
    id?: number;
    usuario_id?: number;
    nome: string;
    cargo_id?: number;
    gestor_id?: number; // referência para outro colaborador (gestor)
    matricula: string;
    ativo?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
