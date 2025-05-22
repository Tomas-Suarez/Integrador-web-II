const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class MotivoAdmision extends Model {}

MotivoAdmision.init(
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
    modelName: "MotivoAdmision",
    tableName: "motivo_admision",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = MotivoAdmision;
