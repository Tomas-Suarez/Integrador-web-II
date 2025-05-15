const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class SeguroMedico extends Model {}

SeguroMedico.init(
  {
    id_seguro: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SeguroMedico",
    tableName: "seguro_medico",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = SeguroMedico;
