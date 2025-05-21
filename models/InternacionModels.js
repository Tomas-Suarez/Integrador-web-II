const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");
const Motivo = require("./MotivoInternacionModels");

class Internacion extends Model {}

Internacion.init(
  {
    id_internacion: {
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
    id_motivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Motivo,
        key: "id_motivo",
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Internacion",
    tableName: "internacion",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Internacion;
