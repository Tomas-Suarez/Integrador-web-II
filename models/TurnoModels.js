const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Turno extends Model {}

Turno.init(
  {
    id_turno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_turno: {
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
    modelName: "Turno",
    tableName: "turno",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Turno;
