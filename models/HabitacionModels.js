const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Habitacion extends Model {}

Habitacion.init(
  {
    id_habitacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    timestamps: false,
  }
);

module.exports = Habitacion;
