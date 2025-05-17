const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Guardia extends Model {}

Guardia.init(
  {
    id_guardia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Guardia",
    tableName: "guardia",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Guardia;
