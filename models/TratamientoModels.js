const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Medico = require("./MedicoModels");

class Tratamiento extends Model {}

Tratamiento.init(
  {
    id_tratamiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico",
      },
      onDelete: "CASCADE",
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tratamiento",
  }
);

module.exports = Tratamiento;
