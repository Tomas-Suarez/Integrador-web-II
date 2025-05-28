const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Cama = require("./CamaModels");

class AsignacionDormitorio extends Model {}

AsignacionDormitorio.init(
  {
    id_asignacion_dormitorio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_admision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admision,
        key: "id_admision",
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
      fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
      fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AsignacionDormitorio",
    tableName: "asignacion_dormitorio",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = AsignacionDormitorio;
