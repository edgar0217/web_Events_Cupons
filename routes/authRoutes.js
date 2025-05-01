import express from "express";
import {
  mostrarLogin,
  login,
  logout,
  mostrarDashboard,
} from "../controllers/authController.js";
import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/login", login);
router.get("/dashboard", protegerRuta, mostrarDashboard);
router.get("/logout", logout);

export default router;
