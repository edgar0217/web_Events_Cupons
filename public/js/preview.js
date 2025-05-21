AOS.init({
  duration: 800,
  once: true,
});

// Función para mostrar preview de imagen seleccionada y limpiar input hermano
function setupPreview(inputId, previewId, inputHermanoId) {
  const input = document.getElementById(inputId);
  const inputHermano = inputHermanoId
    ? document.getElementById(inputHermanoId)
    : null;
  const previewContainer = document.getElementById(previewId);
  if (!input || !previewContainer) return;

  input.addEventListener("change", () => {
    // Limpiar input hermano y su preview si existe
    if (input.files && input.files.length > 0 && inputHermano) {
      inputHermano.value = "";
      // Limpiar preview del input hermano (opcional, ya que usamos un solo preview)
      // Aquí no es necesario limpiar otro preview porque usamos uno solo
    }

    if (!input.files || !input.files[0]) {
      previewContainer.innerHTML = "";
      return;
    }
    const file = input.files[0];
    if (!file.type.startsWith("image/")) {
      previewContainer.innerHTML = "Archivo no es una imagen válida";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image" />`;
    };
    reader.readAsDataURL(file);
  });
}
