const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Evaluacion = require("./EvaluacionModels");

class PruebaDiagnostica extends Model {}

PruebaDiagnostica.init(
  {
    id_prueba_diagnostica: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Evaluacion,
        key: "id_evaluacion",
      },
      onDelete: "CASCADE",
    },
    tipo_prueba: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resultado: {
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
    modelName: "PruebaDiagnostica",
  }
);

module.exports = PruebaDiagnostica;
