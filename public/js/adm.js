AOS.init({
  duration: 800,
  once: true,
});

function confirmarEliminacionUsuario(id) {
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
      document.getElementById(`form-eliminar-usuario-${id}`).submit();
    }
  });
}

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
      document.getElementById(`form-eliminar-${id}`).submit();
    }
  });
}

function confirmarEliminacionCupon(id) {
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
      document.getElementById(`form-eliminar-cupon-${id}`).submit();
    }
  });
}

// Toggle contraseña tabla desktop
function togglePassword(id) {
  const input = document.getElementById(`pass-${id}`);
  input.type = input.type === "password" ? "text" : "password";
}

// Toggle contraseña card mobile
function togglePasswordMobile(id) {
  const input = document.getElementById(`pass-mobile-${id}`);
  input.type = input.type === "password" ? "text" : "password";
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const successParam = getQueryParam("success");
const errorParam = getQueryParam("error");

if (successParam) {
  let message = "";
  switch (successParam) {
    case "admin_creado":
      message = "Nuevo admin creado correctamente.";
      break;
    case "admin_actualizado":
      message = "Admin actualizado correctamente.";
      break;
    case "admin_eliminado":
      message = "Admin eliminado correctamente.";
      break;
    default:
      message = "Acción realizada con éxito.";
  }

  Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: message,
    timer: 2500,
    showConfirmButton: false,
    willClose: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
  });
} else if (errorParam) {
  let message = "";
  switch (errorParam) {
    case "crear_admin":
      message = "Error al crear admin.";
      break;
    case "actualizar_admin":
      message = "Error al actualizar admin.";
      break;
    case "eliminar_admin":
      message = "Error al eliminar admin.";
      break;
    case "permiso_denegado":
      message = "No tienes permisos para esta acción.";
      break;
    case "usuario_no_encontrado":
      message = "Usuario no encontrado.";
      break;
    case "no_puede_eliminar_superadmin":
      message = "No puedes eliminar un superadmin.";
      break;
    default:
      message = "Ocurrió un error.";
  }

  Swal.fire({
    icon: "error",
    title: "¡Error!",
    text: message,
    timer: 3000,
    showConfirmButton: false,
    willClose: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
  });
}
