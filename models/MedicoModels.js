const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Especialidad = require("./EspecialidadModels");
const Guardia = require("./GuardiaModels");

class Medico extends Model {}

Medico.init(
  {
    id_medico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Especialidad,
        key: "id_especialidad",
      },
      onDelete: "CASCADE",
    },
    id_guardia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Guardia,
        key: "id_guardia",
      },
      onDelete: "CASCADE",
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medico",
    tableName: "medico",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Medico;
