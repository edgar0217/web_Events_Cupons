function confirmarEliminacionCupon(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById(`form-eliminar-cupon-${id}`).submit();
    }
  });
}

const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get("success");
const error = urlParams.get("error");

// Definir los mensajes de éxito
const successMessages = {
  cupon_eliminado: [
    "¡Eliminado!",
    "El cupón ha sido eliminado exitosamente.",
    "success",
  ],
  cupon_editado: [
    "¡Actualizado!",
    "El cupón ha sido actualizado exitosamente.",
    "success",
  ],
  cupon_creado: [
    "¡Creado!",
    "El cupón ha sido creado exitosamente.",
    "success",
  ],
  evento_creado: [
    "¡Evento creado!",
    "El evento ha sido creado exitosamente.",
    "success",
  ],
  evento_editado: [
    "¡Evento actualizado!",
    "El evento ha sido actualizado exitosamente.",
    "success",
  ],
  evento_eliminado: [
    "¡Evento eliminado!",
    "El evento ha sido eliminado exitosamente.",
    "success",
  ],
};

// Definir los mensajes de error
const errorMessages = {
  eliminar_cupon: ["Error", "Hubo un problema al eliminar el cupón.", "error"],
  editar_cupon: ["Error", "Hubo un problema al actualizar el cupón.", "error"],
  crear_cupon: ["Error", "Hubo un problema al crear el cupón.", "error"],
  crear_evento: ["Error", "Hubo un problema al crear el evento.", "error"],
  editar_evento: [
    "Error",
    "Hubo un problema al actualizar el evento.",
    "error",
  ],
  eliminar_evento: [
    "Error",
    "Hubo un problema al eliminar el evento.",
    "error",
  ],
  evento_no_encontrado: ["Error", "El evento no fue encontrado.", "error"],
  cupon_no_encontrado: ["Error", "El cupón no fue encontrado.", "error"],
  subida_imagen: ["Error", "Debes subir una imagen para el evento.", "error"],
};

// Mostrar mensaje de éxito si existe
if (success && successMessages[success]) {
  Swal.fire(...successMessages[success]);
}

// Mostrar mensaje de error si existe
if (error && errorMessages[error]) {
  Swal.fire(...errorMessages[error]);
}

// Limpiar los parámetros de la URL después de mostrar el mensaje
if (success || error) {
  window.history.replaceState({}, document.title, window.location.pathname);
}
