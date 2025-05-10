const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Enfermero extends Model {}

Enfermero.init(
  {
    id_Enfermero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Turno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Enfermero",
    timestamps: false,
  }
);

module.exports = Enfermero;
