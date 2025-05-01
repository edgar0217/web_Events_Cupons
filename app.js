import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import db from "./db/db.js";
import session from "express-session";
import dotenv from "dotenv";

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

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

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

app.use((req, res, next) => {
  const tiempoMaximo = 30 * 60 * 1000;
  const ahora = Date.now();

  if (req.session.user) {
    if (
      req.session.lastActivity &&
      ahora - req.session.lastActivity > tiempoMaximo
    ) {
      req.session.destroy(() => {
        return res.redirect("/login?error=sesion_expirada");
      });
    } else {
      req.session.lastActivity = ahora;
    }
  }

  next();
});

app.use("/", indexRoutes);
app.use("/", dashboardRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
//este es el bueno
