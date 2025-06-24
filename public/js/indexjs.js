const radioPlayer = document.getElementById("radioPlayer");
const customPlay = document.getElementById("customPlay");
const customPlay2Desk = document.getElementById("customPlay2Desk");
const customPlay2Mov = document.getElementById("customPlay2Mov");
const playIcon = document.getElementById("playIcon");


// Menu hamburguesa en móviles
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});





let isPlaying = false;

function togglePlay() {
  if (!isPlaying) {
    radioPlayer
      .play()
      .then(() => {
        isPlaying = true;
        playIcon.classList.remove("bx-play");
        playIcon.classList.add("bx-pause");
      })
      .catch((err) => {
        alert("Debes interactuar con la página primero para reproducir audio.");
        console.error("Error al reproducir:", err);
      });
  } else {
    radioPlayer.pause();
    isPlaying = false;
    playIcon.classList.remove("bx-pause");
    playIcon.classList.add("bx-play");
  }
}

if (customPlay) customPlay.addEventListener("click", togglePlay);
if (customPlay2Desk) customPlay2Desk.addEventListener("click", togglePlay);
if (customPlay2Mov) customPlay2Mov.addEventListener("click", togglePlay);

// --------- PC ---------
let currentPC = 0;
const itemsPC = document.querySelectorAll(
  "#carruselPatrocinadoresPC .patrocinador-item-pc"
);
const dotsPC = document.querySelectorAll(".carrusel-dot-pc");
const totalPC = itemsPC.length;
let intervalPC;

function showItemPC(idx) {
  itemsPC.forEach((el, i) => {
    el.style.opacity = i === idx ? "1" : "0";
    el.style.pointerEvents = i === idx ? "auto" : "none";
  });
  if (dotsPC.length) {
    dotsPC.forEach((d, i) => {
      d.style.background = i === idx ? "#4f46e5" : "#c7d2fe";
      d.style.borderColor = i === idx ? "#4f46e5" : "#a5b4fc";
    });
  }
  currentPC = idx;
}
function carruselNextPC() {
  showItemPC((currentPC + 1) % totalPC);
  resetIntervalPC();
}
function carruselPrevPC() {
  showItemPC((currentPC - 1 + totalPC) % totalPC);
  resetIntervalPC();
}
function carruselGoToPC(idx) {
  showItemPC(idx);
  resetIntervalPC();
}
function resetIntervalPC() {
  clearInterval(intervalPC);
  intervalPC = setInterval(() => carruselNextPC(), 3000);
}
if (totalPC > 1) {
  intervalPC = setInterval(() => carruselNextPC(), 3000);
  window.carruselNextPC = carruselNextPC;
  window.carruselPrevPC = carruselPrevPC;
  window.carruselGoToPC = carruselGoToPC;
}

// --------- MOVIL ---------
let currentMOVIL = 0;
const itemsMOVIL = document.querySelectorAll(
  "#carruselPatrocinadoresMOVIL .patrocinador-item-movil"
);
const dotsMOVIL = document.querySelectorAll(".carrusel-dot-movil");
const totalMOVIL = itemsMOVIL.length;
let intervalMOVIL;

function showItemMOVIL(idx) {
  itemsMOVIL.forEach((el, i) => {
    el.style.opacity = i === idx ? "1" : "0";
    el.style.pointerEvents = i === idx ? "auto" : "none";
  });
  if (dotsMOVIL.length) {
    dotsMOVIL.forEach((d, i) => {
      d.style.background = i === idx ? "#4f46e5" : "#c7d2fe";
      d.style.borderColor = i === idx ? "#4f46e5" : "#a5b4fc";
    });
  }
  currentMOVIL = idx;
}
function carruselNextMOVIL() {
  showItemMOVIL((currentMOVIL + 1) % totalMOVIL);
  resetIntervalMOVIL();
}
function carruselPrevMOVIL() {
  showItemMOVIL((currentMOVIL - 1 + totalMOVIL) % totalMOVIL);
  resetIntervalMOVIL();
}
function carruselGoToMOVIL(idx) {
  showItemMOVIL(idx);
  resetIntervalMOVIL();
}
function resetIntervalMOVIL() {
  clearInterval(intervalMOVIL);
  intervalMOVIL = setInterval(() => carruselNextMOVIL(), 3000);
}
if (totalMOVIL > 1) {
  intervalMOVIL = setInterval(() => carruselNextMOVIL(), 3000);
  window.carruselNextMOVIL = carruselNextMOVIL;
  window.carruselPrevMOVIL = carruselPrevMOVIL;
  window.carruselGoToMOVIL = carruselGoToMOVIL;
}

// Mantener altura adecuada en ambos carruseles
function ajustarCarruselAltura() {
  const contenedorPC = document.getElementById("carruselPatrocinadoresPC");
  if (contenedorPC) {
    let maxH = 0;
    itemsPC.forEach((el) => {
      if (el.offsetHeight > maxH) maxH = el.offsetHeight;
    });
    contenedorPC.style.height = maxH + "px";
  }
  const contenedorMOVIL = document.getElementById(
    "carruselPatrocinadoresMOVIL"
  );
  if (contenedorMOVIL) {
    let maxH = 0;
    itemsMOVIL.forEach((el) => {
      if (el.offsetHeight > maxH) maxH = el.offsetHeight;
    });
    contenedorMOVIL.style.height = maxH + "px";
  }
}
window.addEventListener("resize", ajustarCarruselAltura);
window.addEventListener("DOMContentLoaded", ajustarCarruselAltura);
