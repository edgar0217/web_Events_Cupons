import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import indexRoutes from "./routes/index.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import db from "./db/db.js";
import noCache from "./middlewares/noCache.js";
import sessionTimeout from "./middlewares/sessionTimeout.js";
import authRoutes from "./routes/authRoutes.js";
import patrocinadorRoutes from "./routes/patrocinadorRoutes.js";
import revistaRoutes from "./routes/revistaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

try {
  await db.authenticate();
  await db.sync();
  console.log("Conectado a la base de datos");
} catch (error) {
  console.error("Error al conectar con la base de datos por:", error);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(noCache);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  })
);

app.use(sessionTimeout);
app.use("/", authRoutes);
app.use("/", indexRoutes);
app.use("/", dashboardRoutes);
app.use("/", patrocinadorRoutes);
app.use("/", revistaRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
