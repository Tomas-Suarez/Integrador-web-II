const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class SignosVitales extends Model {}

SignosVitales.init(
  {
    id_signos_vitales: {
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
    presion_arterial: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frecuencia_cardiaca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frecuencia_respiratoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperatura_corporal: {
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
