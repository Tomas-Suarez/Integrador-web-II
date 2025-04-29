const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Tratamiento = require("./TratamientoModels");

class Terapia extends Model {}

Terapia.init(
  {
    id_terapia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_tratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tratamiento,
        key: "id_tratamiento",
      },
      onDelete: "CASCADE",
    },
    tipo: {
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
    modelName: "Terapia",
    timestamps: false,
  }
);

module.exports = Terapia;
