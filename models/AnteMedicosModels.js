const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class AntecentesMedicos extends Model {}

AntecentesMedicos.init(
  {
    id_Antecedentes_Medicos: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Historial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Historial,
        key: "id_Historial",
      },
      onDelete: "CASCADE",
    },
    Motivo_internacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AntecentesMedicos",
    timestamps: false,
  }
);

module.exports = AntecentesMedicos;
