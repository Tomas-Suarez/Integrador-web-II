const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class TipoIngreso extends Model {}

TipoIngreso.init(
  {
    id_tipo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TipoIngreso",
    tableName: "tipo_ingreso",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = TipoIngreso;
