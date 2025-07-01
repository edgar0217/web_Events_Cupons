import eventos from "../models/eventoModel.js";
import cloudinary from "../utils/cloudinary.js";
import cupones from "../models/cuponModel.js";
import Patrocinador from "../models/patrocinadorModel.js";
import Revista from "../models/revistaModel.js";

const mostrarDashboard = async (req, res) => {
  const listaEventos = await eventos.findAll();
  const listaCupones = await cupones.findAll();
  const listaPatrocinadores = await Patrocinador.findAll();
  const listaRevistas = await Revista.findAll();

  res.render("dashboard", {
    nombrePagina: "Dashboard",
    listaEventos,
    listaCupones,
    listaPatrocinadores,
    listaRevistas,
    user: req.user,
  });
};

//CRUD DE EVENTOS

const crearEvento = async (req, res) => {
  const { titulo, descripcion, redirectTo } = req.body;
  const imagen = req.file;

  const redirectPath = redirectTo || "/dashboard";

  if (!imagen) {
    return res.redirect(`${redirectPath}?error=subida_imagen`);
  }

  try {
    await eventos.create({
      titulo,
      descripcion,
      imagen_url: imagen.path,
      imagen_public_id: imagen.filename,
    });

    res.redirect(`${redirectPath}?success=evento_creado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=crear_evento`);
  }
};

const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  const { redirectTo } = req.body; // Puedes enviar redirectTo aquí también si es POST
  const redirectPath = redirectTo || "/dashboard";

  try {
    const evento = await eventos.findByPk(id);

    if (!evento)
      return res.redirect(`${redirectPath}?error=evento_no_encontrado`);

    if (evento.imagen_public_id) {
      await cloudinary.uploader.destroy(evento.imagen_public_id);
    }

    await eventos.destroy({ where: { id } });

    res.redirect(`${redirectPath}?success=evento_eliminado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=eliminar_evento`);
  }
};

const editarEvento = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, redirectTo } = req.body;
  const imagen = req.file;

  const redirectPath = redirectTo || "/dashboard";

  try {
    const evento = await eventos.findByPk(id);
    if (!evento)
      return res.redirect(`${redirectPath}?error=evento_no_encontrado`);

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

    res.redirect(`${redirectPath}?success=evento_editado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=editar_evento`);
  }
};

//CRUD CUPONES

const crearCupon = async (req, res) => {
  const { titulo, descripcion, codigo_cupon, redirectTo } = req.body;
  const imagen = req.file;

  const redirectPath = redirectTo || "/dashboard";

  try {
    let newCupon = {
      titulo,
      descripcion,
      codigo_cupon,
    };

    if (imagen) {
      newCupon.imagen_url = imagen.path;
      newCupon.imagen_public_id = imagen.filename;
    }

    await cupones.create(newCupon);
    res.redirect(`${redirectPath}?success=cupon_creado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=crear_cupon`);
  }
};

const editarCupon = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, codigo_cupon, redirectTo } = req.body;
  const imagen = req.file;

  const redirectPath = redirectTo || "/dashboard";

  try {
    const cupon = await cupones.findByPk(id);
    if (!cupon)
      return res.redirect(`${redirectPath}?error=cupon_no_encontrado`);

    cupon.titulo = titulo;
    cupon.descripcion = descripcion;
    cupon.codigo_cupon = codigo_cupon;

    if (imagen) {
      if (cupon.imagen_public_id) {
        await cloudinary.uploader.destroy(cupon.imagen_public_id);
      }
      cupon.imagen_url = imagen.path;
      cupon.imagen_public_id = imagen.filename;
    }

    await cupon.save();

    res.redirect(`${redirectPath}?success=cupon_editado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=editar_cupon`);
  }
};

const eliminarCupon = async (req, res) => {
  const { id } = req.params;
  const { redirectTo } = req.body;
  const redirectPath = redirectTo || "/dashboard";

  try {
    const cupon = await cupones.findByPk(id);
    if (!cupon)
      return res.redirect(`${redirectPath}?error=cupon_no_encontrado`);

    if (cupon.imagen_public_id) {
      await cloudinary.uploader.destroy(cupon.imagen_public_id);
    }

    await cupones.destroy({ where: { id } });

    res.redirect(`${redirectPath}?success=cupon_eliminado`);
  } catch (error) {
    console.error(error);
    res.redirect(`${redirectPath}?error=eliminar_cupon`);
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
