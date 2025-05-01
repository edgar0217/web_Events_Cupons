import eventos from "../models/eventoModel.js";

const mostrarFormulario = async (req, res) => {
  const listaEventos = await eventos.findAll();

  res.render("eventos", {
    nombrePagina: "Menu",
    listaEventos,
  });
};

export { mostrarFormulario };
