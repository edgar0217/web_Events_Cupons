function confirmarEliminacion(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("form-eliminar-" + id).submit();
    }
  });
}

const params = new URLSearchParams(window.location.search);

function limpiarURL() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

if (params.get("success") === "evento_creado") {
  Swal.fire({
    icon: "success",
    title: "¡Evento creado!",
    text: "El evento se ha creado exitosamente.",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("success") === "evento_editado") {
  Swal.fire({
    icon: "success",
    title: "¡Evento actualizado!",
    text: "El evento se ha actualizado exitosamente.",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("success") === "evento_eliminado") {
  Swal.fire({
    icon: "success",
    title: "¡Evento eliminado!",
    text: "El evento ha sido eliminado correctamente.",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("error") === "subida_imagen") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Debes subir una imagen para crear el evento.",
    timer: 2500,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("error") === "crear_evento") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Hubo un problema al crear el evento.",
    timer: 2500,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("error") === "editar_evento") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Hubo un problema al editar el evento.",
    timer: 2500,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("error") === "eliminar_evento") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Hubo un problema al eliminar el evento.",
    timer: 2500,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

if (params.get("error") === "evento_no_encontrado") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "El evento no fue encontrado.",
    timer: 2500,
    showConfirmButton: false,
  }).then(() => {
    limpiarURL();
  });
}

const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");

if (error === "subida_imagen") {
  Swal.fire({
    icon: "error",
    title: "Imagen requerida",
    text: "Por favor, sube un archivo de tipo imagen antes de publicar el evento.",
  });
}

if (error === "crear_evento") {
  Swal.fire({
    icon: "error",
    title: "Error al crear evento",
    text: "Ocurrió un error al crear el evento. Intenta nuevamente.",
  });
}

if (urlParams.get("success") === "evento_creado") {
  Swal.fire({
    icon: "success",
    title: "Evento creado",
    text: "El evento se publicó correctamente.",
  });
}
