const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const EvaluacionEnfermeria = require("./EvaluacionEnfermeriaModels");

class SignosVitales extends Model {}

SignosVitales.init(
  {
    id_Signos_vitales: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Historial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EvaluacionEnfermeria,
        key: "id_Evaluacion_Enfermeria",
      },
      onDelete: "CASCADE",
    },
    Presion_arterial: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Frecuencia_cardiaca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Frecuencia_respiratoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Temperatura_corporal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SignosVitales",
    timestamps: false,
  }
);

module.exports = SignosVitales;
