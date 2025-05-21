const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");
const Medico = require("./MedicoModels");
const Tipo = require("./TipoIngresoModels");

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
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: false,
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
