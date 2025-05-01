import cupones from "../models/cuponModel.js";

const mostrarCupones = async (req, res) => {
  const listaCupones = await cupones.findAll();

  res.render("cupones", {
    nombrePagina: "Cupones",
    listaCupones,
  });
};

export { mostrarCupones };
