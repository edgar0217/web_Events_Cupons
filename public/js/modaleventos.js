document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalDescripcion = document.getElementById("modalDescripcion");
  const modalImagen = document.getElementById("modalImagen");
  const modalTitulo = document.getElementById("modalTitulo");
  const cerrarModal = document.getElementById("cerrarModal");
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  document.querySelectorAll(".card-evento").forEach((card) => {
    card.addEventListener("click", () => {
      const full = card.dataset.full;
      const img = card.dataset.img;
      const titulo = card.dataset.titulo;

      modalDescripcion.textContent = full;
      modalImagen.src = img;
      modalTitulo.textContent = titulo;
      modal.classList.remove("hidden");
    });
  });

  cerrarModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
