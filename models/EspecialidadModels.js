const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Especialidad extends Model {}

Especialidad.init(
  {
    id_especialidad: {
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
    modelName: "Especialidad",
    tableName: "especialidad",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Especialidad;
