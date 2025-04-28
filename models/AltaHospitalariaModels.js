const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Registro = require("./RegistroModels");

class AltaHospitalaria extends Model {}

AltaHospitalaria.init(
  {
    id_alta_hospitalaria: {
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
    instrucciones_cuidados: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recetas_medicas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recomendaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AltaHospitalaria",
  }
);

module.exports = AltaHospitalaria;
