import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Evento = db.define(
  "eventos",
  {
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
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagen_public_id: {
      // <-- agregamos esta columna
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Evento;
