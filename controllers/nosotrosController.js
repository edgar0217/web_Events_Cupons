const mostrarNosotros = (req, res) => {
  const contacts = [
    {
      url: "https://www.facebook.com/iesproficial#",
      img: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
      alt: "Facebook",
      label: "Facebook",
    },
    {
      url: "mailto:correo@gmail.com?subject=Consulta&body=Hola,%20quiero%20más%20información",
      img: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
      alt: "Correo",
      label: "Correo",
    },
    {
      url: "https://wa.me/527821293422?text=Hola,%20quiero%20más%20información",
      img: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
      alt: "WhatsApp",
      label: "WhatsApp",
    },
    {
      url: "https://www.instagram.com/iespr_oficial/?hl=es-la&fbclid=IwAR0Ab9Lmfq-_6IYA683x-96gdyRNVeLSSZuQMDN4QsvZ_EAIyP2sA50Xdxg",
      img: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      alt: "Instagram",
      label: "Instagram",
    },
  ];

  res.render("nosotros", {
    nombrePagina: "Nosotros",
    contacts,
  });
};

export { mostrarNosotros };
