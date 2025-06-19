import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  crearPatrocinador,
  editarPatrocinador,
  eliminarPatrocinador,
} from "../controllers/patrocinadorController.js";
import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/patrocinadores",
  protegerRuta,
  upload.single("imagen"),
  crearPatrocinador
);
router.post(
  "/patrocinadores/:id/edit",
  protegerRuta,
  upload.single("imagen"),
  editarPatrocinador
);
router.post("/patrocinadores/:id/delete", protegerRuta, eliminarPatrocinador);

export default router;
