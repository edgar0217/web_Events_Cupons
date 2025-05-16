// Colores estándar de SweetAlert
const CONFIRM_COLOR = "#d33";
const CANCEL_COLOR = "#3085d6";

/**
 * Muestra una alerta de confirmación y envía un formulario si se confirma.
 * @param {string} id - ID del formulario a enviar.
 * @param {string} prefix - Prefijo del ID del formulario.
 */
function confirmarEliminacionGenerica(id, prefix = "form-eliminar") {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: CONFIRM_COLOR,
    cancelButtonColor: CANCEL_COLOR,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById(`${prefix}-${id}`).submit();
    }
  });
}

// Uso específico para cupones
function confirmarEliminacionCupon(id) {
  confirmarEliminacionGenerica(id, "form-eliminar-cupon");
}

// Uso genérico
function confirmarEliminacion(id) {
  confirmarEliminacionGenerica(id);
}

// Diccionarios de mensajes
const mensajes = {
  success: {
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
  },
  error: {
    eliminar_cupon: [
      "Error",
      "Hubo un problema al eliminar el cupón.",
      "error",
    ],
    editar_cupon: [
      "Error",
      "Hubo un problema al actualizar el cupón.",
      "error",
    ],
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
  },
};

// Mostrar alertas si existen parámetros de éxito o error
const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get("success");
const error = urlParams.get("error");

if (success && mensajes.success[success]) {
  Swal.fire(...mensajes.success[success]);
} else if (error && mensajes.error[error]) {
  Swal.fire(...mensajes.error[error]);
}

// Limpiar la URL (sin recargar)
if (success || error) {
  window.history.replaceState({}, document.title, window.location.pathname);
}
