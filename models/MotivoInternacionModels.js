const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class MotivoInternacion extends Model {}

MotivoInternacion.init(
  {
    id_motivo: {
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
    modelName: "MotivoInternacion",
    tableName: "motivo_internacion",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = MotivoInternacion;
