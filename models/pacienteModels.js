const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Paciente extends Model{}

Paciente.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    contacto_emergencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seguro_medico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Paciente',
  });

  module.exports = Paciente;