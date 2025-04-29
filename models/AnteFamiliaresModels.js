const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class AntecedentesFamiliares extends Model {}

AntecedentesFamiliares.init(
  {
    id_antecedentes_familiares: {
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
    parentesco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enfermedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AntecedentesFamiliares",
    timestamps: false,
  }
);

module.exports = AntecedentesFamiliares;
