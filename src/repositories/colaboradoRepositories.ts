import { DataTypes } from 'sequelize';
import sequelize from '../config/db.ts'; // Conexão configurada
import Usuario from './Usuario';
import CicloColaborador from './CicloColaborador';

const Colaborador = sequelize.define('Colaborador', {
    id_colaborador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    matricula: { type: DataTypes.STRING, unique: true, allowNull: false },
    cargo: { type: DataTypes.STRING, allowNull: false },
    data_admissao: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'ativo' },
    id_gestor: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Colaborador', key: 'id_colaborador' } },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Usuario', key: 'id_usuario' } }
}, {
    tableName: 'COLABORADOR',
    timestamps: false
});

// Associações
Colaborador.belongsTo(Colaborador, { as: 'Gestor', foreignKey: 'id_gestor' });
Colaborador.hasMany(Colaborador, { as: 'Gerenciados', foreignKey: 'id_gestor' });
Colaborador.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasOne(Colaborador, { foreignKey: 'id_usuario' });
Colaborador.hasMany(CicloColaborador, { foreignKey: 'id_colaborador' });
CicloColaborador.belongsTo(Colaborador, { foreignKey: 'id_colaborador' });

export default Colaborador;