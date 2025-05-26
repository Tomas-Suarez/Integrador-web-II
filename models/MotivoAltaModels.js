const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class MotivoAlta extends Model {}

MotivoAlta.init(
  {
    id_motivo_alta: {
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
    modelName: "MotivoAlta",
    tableName: "motivo_alta",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = MotivoAlta;
