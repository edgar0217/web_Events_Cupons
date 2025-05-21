import express from "express";
import {
  mostrarLogin,
  login,
  logout,
  mostrarSuperAdmin,
  crearAdmin,
  editarUsuario,
  eliminarUsuario,
} from "../controllers/authController.js";
import {
  protegerRuta,
  protegerSuperAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/login", login);
router.get("/logout", logout);

router.get("/superadmin", protegerSuperAdmin, mostrarSuperAdmin);
router.post("/superadmin/crear", protegerSuperAdmin, crearAdmin);
router.post("/superadmin/editar/:id", protegerSuperAdmin, editarUsuario);
router.post("/superadmin/eliminar/:id", protegerSuperAdmin, eliminarUsuario);

export default router;
