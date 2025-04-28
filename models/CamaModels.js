const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Habitacion = require("./HabitacionModels");

class Cama extends Model {}

Cama.init(
  {
    id_cama: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_habitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Habitacion,
        key: "id_habitacion",
      },
      onDelete: "CASCADE",
    },
    Libre: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cama",
  }
);

module.exports = Cama;
