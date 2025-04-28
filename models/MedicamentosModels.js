const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class MedicamentosActuales extends Model {}

MedicamentosActuales.init(
  {
    id_medicamentos_actuales: {
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    via: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MedicamentosActuales",
  }
);

module.exports = MedicamentosActuales;
