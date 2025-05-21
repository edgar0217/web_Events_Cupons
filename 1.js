import bcrypt from "bcrypt";
import User from "./models/userModel.js"; // Asegúrate de que la ruta sea correcta
import db from "./db/db.js"; // Asegúrate que esta conexión funcione correctamente

async function seedUsers() {
  try {
    await db.sync(); // Asegúrate de que las tablas existen

    const superadminPassword = await bcrypt.hash("superadmin123", 10);

    await User.bulkCreate([
      {
        username: "superadmin1",
        password: superadminPassword,
        role: "superadmin",
      },
    ]);

    console.log("Usuario insertado correctamente");
    process.exit(0);
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    process.exit(1);
  }
}

seedUsers();
