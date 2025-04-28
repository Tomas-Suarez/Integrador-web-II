const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Historial = require("./HistorialMedicoModels");

class Alergia extends Model{}

Alergia.init(
  {
    id_alergia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_historial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: Historial,
        key: 'id_historial'
      },
      onDelete: 'CASCADE',
    },
    alergia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reaccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Alergia',
  });

  module.exports = Alergia;