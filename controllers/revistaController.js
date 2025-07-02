// controllers/revistaController.js
import Revista from "../models/revistaModel.js";
import cloudinary from "../utils/cloudinary.js";

// Mostrar revistas (público)
export const mostrarRevistas = async (req, res) => {
  try {
    const revistas = await Revista.findAll({
      order: [["fecha_publicacion", "DESC"]],
    });
    res.render("revistas", {
      nombrePagina: "Revistas",
      revistas,
    });
  } catch (error) {
    console.error(error);
    res.render("revistas", {
      nombrePagina: "Revistas",
      revistas: [],
      error: "Error al cargar las revistas",
    });
  }
};

// Mostrar en dashboard
export const mostrarRevistasDashboard = async (req, res) => {
  try {
    const listaRevistas = await Revista.findAll({
      order: [["fecha_publicacion", "DESC"]],
    });

    res.render("dashboard", {
      listaRevistas,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.render("dashboard", {
      listaRevistas: [],
      user: req.user,
      error: "Error al cargar las revistas",
    });
  }
};

// En la función crearRevista
export const crearRevista = async (req, res) => {
  const { titulo, descripcion, redirectTo } = req.body;

  if (!req.files || !req.files.portada || !req.files.archivo) {
    return res.status(400).json({
      success: false,
      message: "Faltan archivos requeridos (portada y PDF)",
    });
  }

  const portada = req.files.portada[0];
  const archivo = req.files.archivo[0];

  try {
    const archivoUrl = archivo.path.includes("res.cloudinary.com")
      ? archivo.path.replace("/upload/", "/upload/fl_attachment/")
      : archivo.path;

    await Revista.create({
      titulo,
      descripcion,
      portada_url: portada.path,
      portada_public_id: portada.filename,
      archivo_url: archivoUrl,
      archivo_public_id: archivo.filename,
    });

    const redireccion = redirectTo || "/dashboard";
    res.redirect(`${redireccion}?success=revista_creada`);
  } catch (error) {
    console.error("Error al crear revista:", error);
    res.redirect(`${redirectTo || "/dashboard"}?error=crear_revista`);
  }
};

// En la función editarRevista
export const editarRevista = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, redirectTo } = req.body; // 👈 aquí obtienes redirectTo
  const portada = req.files?.portada?.[0];
  const archivo = req.files?.archivo?.[0];

  const redireccion = redirectTo || "/dashboard"; // 👈 fallback si no viene

  try {
    const revista = await Revista.findByPk(id);
    if (!revista)
      return res.redirect(`${redireccion}?error=revista_no_encontrada`);

    revista.titulo = titulo;
    revista.descripcion = descripcion;

    if (portada) {
      revista.portada_url = portada.path;
      revista.portada_public_id = portada.filename;
    }

    if (archivo) {
      const archivoUrl = archivo.path.includes("res.cloudinary.com")
        ? archivo.path.replace("/upload/", "/upload/fl_attachment/")
        : archivo.path;
      revista.archivo_url = archivoUrl;
      revista.archivo_public_id = archivo.filename;
    }

    await revista.save();
    res.redirect(`${redireccion}?success=revista_actualizada`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redireccion}?error=editar_revista`);
  }
};

// Eliminar revista
export const eliminarRevista = async (req, res) => {
  const { id } = req.params;
  const redirectTo =
    req.body.redirectTo || req.query.redirectTo || "/dashboard";

  try {
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.redirect(`${redirectTo}?error=revista_no_encontrada`);
    }

    // Eliminar archivos en Cloudinary
    await Promise.all([
      cloudinary.uploader.destroy(revista.portada_public_id, {
        resource_type: "image",
      }),
      cloudinary.uploader.destroy(revista.archivo_public_id, {
        resource_type: "raw",
      }),
    ]);

    await revista.destroy();
    res.redirect(`${redirectTo}?success=revista_eliminada`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectTo}?error=eliminar_revista`);
  }
};
