import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  mostrarDashboard,
  crearEvento,
  eliminarEvento,
  editarEvento,
  crearCupon,
  editarCupon,
  eliminarCupon,
} from "../controllers/dashboardController.js";
import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/dashboard", protegerRuta, mostrarDashboard);

router.post("/eventos", protegerRuta, upload.single("imagen"), crearEvento);
router.post("/eventos/:id/delete", protegerRuta, eliminarEvento);
router.post(
  "/eventos/:id/edit",
  protegerRuta,
  upload.single("imagen"),
  editarEvento
);

router.post("/cupones", protegerRuta, crearCupon);
router.post("/cupones/:id/delete", protegerRuta, eliminarCupon);
router.post("/cupones/:id/edit", protegerRuta, editarCupon);

export default router;
