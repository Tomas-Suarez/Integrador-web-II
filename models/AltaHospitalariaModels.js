const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Admision = require("./AdmisionModels");

class AltaHospitalaria extends Model {}

AltaHospitalaria.init(
  {
    id_Alta_Hospitalaria: {
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
    Instrucciones_cuidados: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Recetas_medicas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Recomendaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AltaHospitalaria",
    timestamps: false,
  }
);

module.exports = AltaHospitalaria;
