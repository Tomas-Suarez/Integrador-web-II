const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class AntecentesMedicos extends Model {}

AntecentesMedicos.init(
  {
    id_antecedentes_Medicos: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_historial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Historial,
        key: "id_historial",
      },
      onDelete: "CASCADE",
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
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
