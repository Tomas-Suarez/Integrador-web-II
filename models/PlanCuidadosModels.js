const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class PlanCuidados extends Model {}

PlanCuidados.init(
  {
    id_plan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PlanCuidados",
    tableName: "plan_cuidados",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = PlanCuidados;
