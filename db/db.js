import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5, // Máximo número de conexiones que Sequelize puede mantener al mismo tiempo
      min: 0, // Mínimo número de conexiones que se mantienen en el pool (aunque no haya consultas activas)
      acquire: 30000, // Tiempo máximo que Sequelize esperará para obtener una conexión antes de lanzar un error
      idle: 10000, // Tiempo que una conexión puede estar inactiva antes de ser cerrada
    },
  }
);

export default db;
