const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Tipo = require("./TipoIngresoModels");
const MotivoAdmision = require("./MotivoAdmisionModels");

class Admision extends Model {}

Admision.init(
  {
    id_admision: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id_paciente",
      },
      onDelete: "CASCADE",
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tipo,
        key: "id_tipo",
      },
      onDelete: "CASCADE",
    },
    id_motivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MotivoAdmision,
        key: "id_motivo",
      },
      onDelete: "CASCADE",
    },
    fecha_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admision",
    tableName: "admision",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Admision;
