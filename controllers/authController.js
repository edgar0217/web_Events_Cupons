import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Evento from "../models/eventoModel.js";
import Cupon from "../models/cuponModel.js";
import Patrocinador from "../models/patrocinadorModel.js";
import Revista from "../models/revistaModel.js";

export const mostrarLogin = (req, res) => {
  res.render("login", { error: null });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { error: "Credenciales inválidas" });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  if (user.role === "superadmin") {
    return res.redirect("/superadmin");
  } else if (user.role === "admin") {
    return res.redirect("/dashboard");
  } else {
    return res.render("login", {
      error: "No tienes permiso para acceder al dashboard",
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

// controllers/authController.js - mostrarSuperAdmin
export const mostrarSuperAdmin = async (req, res) => {
  try {
    const [
      usuarios,
      listaEventos,
      listaCupones,
      listaPatrocinadores,
      listaRevistas,
    ] = await Promise.all([
      User.findAll({ attributes: ["id", "username", "role", "password"] }),
      Evento.findAll(),
      Cupon.findAll(),
      Patrocinador.findAll(),
      Revista.findAll({ order: [["fecha_publicacion", "DESC"]] }), // Agregar esta línea
    ]);

    res.render("superadmin", {
      user: req.session.user,
      usuarios,
      listaEventos,
      listaCupones,
      listaPatrocinadores,
      listaRevistas, // Agregar esta línea
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando la página de superadmin");
  }
};

export const crearAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashPassword,
      role: "admin",
    });
    res.redirect("/superadmin?success=admin_creado");
  } catch (error) {
    console.error(error);
    res.redirect("/superadmin?error=crear_admin");
  }
};

export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.redirect("/superadmin?error=usuario_no_encontrado");
    }

    // Validación: Solo superadmin puede editar superadmin
    if (
      usuario.role === "superadmin" &&
      req.session.user.role !== "superadmin"
    ) {
      return res.redirect("/superadmin?error=permiso_denegado");
    }

    // Solo superadmin puede cambiar rol (y solo si no es superadmin el usuario a editar)
    if (
      req.session.user.role === "superadmin" &&
      usuario.role !== "superadmin" &&
      role
    ) {
      usuario.role = role;
    }

    usuario.username = username || usuario.username;

    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();
    res.redirect("/superadmin?success=admin_actualizado");
  } catch (error) {
    console.error(error);
    res.redirect("/superadmin?error=actualizar_admin");
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.redirect("/superadmin?error=usuario_no_encontrado");
    }

    // No eliminar superadmins
    if (usuario.role === "superadmin") {
      return res.redirect("/superadmin?error=no_puede_eliminar_superadmin");
    }

    await usuario.destroy();
    res.redirect("/superadmin?success=admin_eliminado");
  } catch (error) {
    console.error(error);
    res.redirect("/superadmin?error=eliminar_admin");
  }
};
