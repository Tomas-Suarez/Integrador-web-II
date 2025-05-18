const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Paciente = require("./PacienteModels");

class ContactoEmergencia extends Model {}

ContactoEmergencia.init(
  {
    id_contacto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Paciente,
        key: "id_paciente",
      },
      onDelete: "CASCADE",
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ContactoEmergencia",
    tableName: "contacto_emergencia",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ContactoEmergencia;
