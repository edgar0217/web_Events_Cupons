import Patrocinador from "../models/patrocinadorModel.js";
import cloudinary from "../utils/cloudinary.js";

// Mostrar en Dashboard (asegúrate de pasar otros datos si tu dashboard los necesita)
export const mostrarPatrocinadores = async (req, res) => {
  try {
    const listaPatrocinadores = await Patrocinador.findAll();
    res.render("dashboard", {
      listaPatrocinadores,
      // agrega aquí otros datos necesarios, ej: user, listaEventos, etc.
      user: req.user,
    });
  } catch (e) {
    console.error(e);
    res.render("dashboard", {
      listaPatrocinadores: [],
      user: req.user,
      error: "No se pudieron cargar los patrocinadores.",
    });
  }
};

// Crear Patrocinador
export const crearPatrocinador = async (req, res) => {
  const { nombre, redirectTo } = req.body;
  const imagen = req.file;
  const redirectPath = redirectTo || "/dashboard";

  if (!imagen) return res.redirect(`${redirectPath}?error=imagen_faltante`);

  try {
    await Patrocinador.create({
      nombre,
      imagen_url: imagen.path,
      imagen_public_id: imagen.filename,
    });
    res.redirect(`${redirectPath}?success=patrocinador_creado`);
  } catch (e) {
    console.error(e);
    res.redirect(`${redirectPath}?error=crear_patrocinador`);
  }
};

// Editar Patrocinador
export const editarPatrocinador = async (req, res) => {
  const { id } = req.params;
  const { nombre, redirectTo } = req.body;
  const imagen = req.file;
  const redirectPath = redirectTo || "/dashboard";

  try {
    const pat = await Patrocinador.findByPk(id);
    if (!pat) return res.redirect(`${redirectPath}?error=no_encontrado`);

    pat.nombre = nombre;

    if (imagen) {
      // Elimina la imagen anterior de Cloudinary (si existe)
      if (pat.imagen_public_id)
        await cloudinary.uploader.destroy(pat.imagen_public_id);

      pat.imagen_url = imagen.path;
      pat.imagen_public_id = imagen.filename;
    }

    await pat.save();
    res.redirect(`${redirectPath}?success=patrocinador_editado`);
  } catch (e) {
    console.error(e);
    res.redirect(`${redirectPath}?error=editar_patrocinador`);
  }
};

// Eliminar Patrocinador
export const eliminarPatrocinador = async (req, res) => {
  const { id } = req.params;
  const { redirectTo } = req.body;
  const redirectPath = redirectTo || "/dashboard";

  try {
    const pat = await Patrocinador.findByPk(id);
    if (!pat) return res.redirect(`${redirectPath}?error=no_encontrado`);

    // Elimina la imagen de Cloudinary si existe
    if (pat.imagen_public_id)
      await cloudinary.uploader.destroy(pat.imagen_public_id);

    await pat.destroy();
    res.redirect(`${redirectPath}?success=patrocinador_eliminado`);
  } catch (e) {
    console.error(e);
    res.redirect(`${redirectPath}?error=eliminar_patrocinador`);
  }
};

//vista de patrocinadores publica
export const vistaPatrocinador = async (req, res) => {
  const listaPatrocinadoresVista = await Patrocinador.findAll();
  res.render("patrocinador", {
    listaPatrocinadores: listaPatrocinadoresVista,
    nombrePagina: "Patrocinadores",
  });
};
