// --- Carrusel funcionalidad ---
let current = 0;
const items = document.querySelectorAll(
  "#carruselPatrocinadores .patrocinador-item"
);
const dots = document.querySelectorAll(".carrusel-dot");
const total = items.length;
let interval;

function showItem(idx) {
  items.forEach((el, i) => {
    el.style.opacity = i === idx ? "1" : "0";
    el.style.pointerEvents = i === idx ? "auto" : "none";
  });
  if (dots.length) {
    dots.forEach((d, i) => {
      d.style.background = i === idx ? "#4f46e5" : "#c7d2fe";
      d.style.borderColor = i === idx ? "#4f46e5" : "#a5b4fc";
    });
  }
  current = idx;
}
function carruselNext() {
  showItem((current + 1) % total);
  resetInterval();
}
function carruselPrev() {
  showItem((current - 1 + total) % total);
  resetInterval();
}
function carruselGoTo(idx) {
  showItem(idx);
  resetInterval();
}
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(() => carruselNext(), 3000);
}
if (total > 1) {
  interval = setInterval(() => carruselNext(), 3000);
  window.carruselNext = carruselNext;
  window.carruselPrev = carruselPrev;
  window.carruselGoTo = carruselGoTo;
}
// Responsive: ajusta la altura del carrusel según pantalla
function ajustarCarruselAltura() {
  const contenedor = document.getElementById("carruselPatrocinadores");
  if (!contenedor) return;
  let maxH = 0;
  items.forEach((el) => {
    if (el.offsetHeight > maxH) maxH = el.offsetHeight;
  });
  contenedor.style.height = maxH + "px";
}
window.addEventListener("resize", ajustarCarruselAltura);
window.addEventListener("DOMContentLoaded", ajustarCarruselAltura);
