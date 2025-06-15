const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const SeguroMedico = require("./SeguroMedicoModels");

class Paciente extends Model {}

Paciente.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_seguro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SeguroMedico,
        key: "id_seguro",
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
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "paciente",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Paciente;
