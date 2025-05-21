import db from "../db/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

async function initializeAdmin() {
  try {
    await db.authenticate();
    await db.sync();

    const count = await User.count();
    if (count === 0) {
      const usernameFromEnv = process.env.SUPERADMIN_USER;
      const passwordFromEnv = process.env.SUPERADMIN_PASS;
      const roleFromEnv = process.env.SUPERADMIN_ROLE;

      if (!passwordFromEnv) {
        console.error(
          "ERROR: No se definió la contraseña superadmin en variables de entorno"
        );
        process.exit(1);
      }

      const hashedPassword = await bcrypt.hash(passwordFromEnv, 10);

      await User.create({
        username: usernameFromEnv,
        password: hashedPassword,
        role: roleFromEnv,
      });

      console.log("Proceso de inicialización completado.");
    } else {
      console.log("Proceso de inicialización completado.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error inicializando Admin:", error);
    process.exit(1);
  }
}

initializeAdmin();
