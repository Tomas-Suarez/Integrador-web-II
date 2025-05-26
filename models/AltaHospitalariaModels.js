const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const MotivoAlta = require("./MotivoAltaModels");

class AltaHospitalaria extends Model {}

AltaHospitalaria.init(
  {
    id_alta_hospitalaria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_motivo_alta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MotivoAlta,
        key: "id_motivo_alta",
      },
      onDelete: "CASCADE",
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AltaHospitalaria",
    tableName: "alta_hospitalaria",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = AltaHospitalaria;
