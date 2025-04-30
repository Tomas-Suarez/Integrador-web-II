const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Cama = require("./CamaModels");

class AsignacionDormitorio extends Model {}

AsignacionDormitorio.init(
  {
    id_Asignacion_dormitorio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Admision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admision,
        key: "id_Admision",
      },
      onDelete: "CASCADE",
    },
    id_Cama: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cama,
        key: "id_cama",
      },
      onDelete: "CASCADE",
    },
    Fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Fecha_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AsignacionDormitorio",
    timestamps: false,
  }
);

module.exports = AsignacionDormitorio;
