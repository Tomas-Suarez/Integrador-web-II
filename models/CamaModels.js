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
    libre: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    higienizada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cama",
    tableName: "cama",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Cama;
