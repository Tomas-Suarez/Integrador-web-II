const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Registro = require("./RegistroModels");
const Cama = require("./CamaModels");

class AsignacionDormitorio extends Model {}

AsignacionDormitorio.init(
  {
    id_asignacion_dormitorio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_registro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Registro,
        key: "id_registro",
      },
      onDelete: "CASCADE",
    },
    id_cama: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cama,
        key: "id_cama",
      },
      onDelete: "CASCADE",
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_salida: {
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
