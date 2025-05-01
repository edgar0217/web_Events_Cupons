import db from "../db/db.js";
import { DataTypes } from "sequelize";

const cupones = db.define("cupones", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_cupon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default cupones;
