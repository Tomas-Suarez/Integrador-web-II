const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Paciente extends Model {}

Paciente.init(
  {
    id_Paciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Estatura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Contacto_emergencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Seguro_medico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    timestamps: false,
  }
);

module.exports = Paciente;
