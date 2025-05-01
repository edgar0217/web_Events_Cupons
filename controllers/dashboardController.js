import eventos from "../models/eventoModel.js";
import cloudinary from "../utils/cloudinary.js";
import cupones from "../models/cuponModel.js";

const mostrarDashboard = async (req, res) => {
  const listaEventos = await eventos.findAll();
  const listaCupones = await cupones.findAll();

  res.render("dashboard", {
    nombrePagina: "Dashboard",
    listaEventos,
    listaCupones,
    user: req.user,
  });
};

const crearEvento = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const imagen = req.file;

  if (!imagen) {
    return res.redirect("/dashboard?error=subida_imagen");
  }

  try {
    await eventos.create({
      titulo,
      descripcion,
      imagen_url: imagen.path,
      imagen_public_id: imagen.filename,
    });

    res.redirect("/dashboard?success=evento_creado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=crear_evento");
  }
};

const eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const evento = await eventos.findByPk(id);

    if (!evento) return res.redirect("/dashboard?error=evento_no_encontrado");

    if (evento.imagen_public_id) {
      await cloudinary.uploader.destroy(evento.imagen_public_id);
    }

    await eventos.destroy({ where: { id } });

    res.redirect("/dashboard?success=evento_eliminado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=eliminar_evento");
  }
};

const editarEvento = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  const imagen = req.file;

  try {
    const evento = await eventos.findByPk(id);
    if (!evento) return res.redirect("/dashboard?error=evento_no_encontrado");

    evento.titulo = titulo;
    evento.descripcion = descripcion;

    if (imagen) {
      if (evento.imagen_public_id) {
        await cloudinary.uploader.destroy(evento.imagen_public_id);
      }
      evento.imagen_url = imagen.path;
      evento.imagen_public_id = imagen.filename;
    }

    await evento.save();

    res.redirect("/dashboard?success=evento_editado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=editar_evento");
  }
};

const crearCupon = async (req, res) => {
  const { titulo, descripcion, codigo_cupon } = req.body;

  try {
    await cupones.create({ titulo, descripcion, codigo_cupon });
    res.redirect("/dashboard?success=cupon_creado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=crear_cupon");
  }
};

const editarCupon = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, codigo_cupon } = req.body;

  try {
    const cupon = await cupones.findByPk(id);
    if (!cupon) return res.redirect("/dashboard?error=cupon_no_encontrado");

    cupon.titulo = titulo;
    cupon.descripcion = descripcion;
    cupon.codigo_cupon = codigo_cupon;
    await cupon.save();

    res.redirect("/dashboard?success=cupon_editado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=editar_cupon");
  }
};

const eliminarCupon = async (req, res) => {
  const { id } = req.params;

  try {
    const cupon = await cupones.findByPk(id);
    if (!cupon) return res.redirect("/dashboard?error=cupon_no_encontrado");

    await cupones.destroy({ where: { id } });

    res.redirect("/dashboard?success=cupon_eliminado");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard?error=eliminar_cupon");
  }
};

export {
  mostrarDashboard,
  crearEvento,
  eliminarEvento,
  editarEvento,
  crearCupon,
  editarCupon,
  eliminarCupon,
};
