// models/revistaModel.js
import db from "../db/db.js";
import { DataTypes } from "sequelize";

const Revista = db.define("revistas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  archivo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archivo_public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  portada_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  portada_public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Revista;
