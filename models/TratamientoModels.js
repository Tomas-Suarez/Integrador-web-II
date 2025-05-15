const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Tratamiento extends Model {}

Tratamiento.init(
  {
    id_tratamiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    indicaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tratamiento",
    tableName: "tratamiento",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Tratamiento;
