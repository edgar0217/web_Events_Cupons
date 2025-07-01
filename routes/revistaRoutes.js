// routes/revistaRoutes.js
import { Router } from "express";
import { uploadRevista } from "../middlewares/uploadRevistas.js";
import {
  mostrarRevistas,
  crearRevista,
  editarRevista,
  eliminarRevista,
} from "../controllers/revistaController.js";
import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = Router();

// Ruta pública
router.get("/revistas", mostrarRevistas);

// Rutas protegidas
router.post("/revistas", protegerRuta, uploadRevista, crearRevista);

router.post("/revistas/:id/edit", protegerRuta, uploadRevista, editarRevista);

router.post("/revistas/:id/delete", protegerRuta, eliminarRevista);

export default router;
