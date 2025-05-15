const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Turno = require("./TurnoModels");

class Enfermero extends Model {}

Enfermero.init(
  {
    id_enfermero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_turno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Turno,
        key: "id_turno",
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
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    modelName: "Enfermero",
    tableName: "enfermero",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Enfermero;
