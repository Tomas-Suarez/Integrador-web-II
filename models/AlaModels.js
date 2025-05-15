const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Ala extends Model {}

Ala.init(
  {
    id_ala: {
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
  },
  {
    sequelize,
    modelName: "Ala",
    tableName: "ala",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Ala;
