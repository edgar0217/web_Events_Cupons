const mostrarNosotros = (req, res) => {
  const contacts = [
    {
      url: "https://www.facebook.com/",
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
      url: "https://wa.me/521234567890?text=Hola,%20quiero%20más%20información",
      img: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
      alt: "WhatsApp",
      label: "WhatsApp",
    },
    {
      url: "https://www.instagram.com/",
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
