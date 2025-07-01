import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mostrarFormulario } from "../controllers/eventosController.js";
import { mostrarCupones } from "../controllers/cuponController.js";
import { mostrarNosotros } from "../controllers/nosotrosController.js";
import { mostrarLogin, login, logout } from "../controllers/authController.js";
import Patrocinador from "../models/patrocinadorModel.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", async (req, res) => {
  const listaPatrocinadores = await Patrocinador.findAll();
  res.render("index", { listaPatrocinadores }); // <--- Así mandas la variable
});

router.get("/eventos", mostrarFormulario);
router.get("/nosotros", mostrarNosotros);
router.get("/cupones", mostrarCupones);

router.get("/login", mostrarLogin);
router.post("/login", login);
router.get("/logout", logout);

export default router;
