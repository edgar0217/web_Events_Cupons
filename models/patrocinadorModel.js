import db from "../db/db.js";
import { DataTypes } from "sequelize";

const Patrocinador = db.define("patrocinadores", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  imagen_url: { type: DataTypes.STRING, allowNull: false },
  imagen_public_id: { type: DataTypes.STRING, allowNull: false },
});

export default Patrocinador;
