const radioPlayer = document.getElementById("radioPlayer");
const customPlay = document.getElementById("customPlay");
const customPlay2 = document.getElementById("customPlay2"); // segundo botón
const playIcon = document.getElementById("playIcon");

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

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");

  if (!menu.classList.contains("hidden")) {
    setTimeout(() => {
      menu.classList.remove("opacity-0", "scale-95");
      menu.classList.add("opacity-100", "scale-100");
      menu.classList.remove("bg-white/30", "backdrop-blur-md");
      menu.classList.add("bg-white");
    }, 10);
  } else {
    menu.classList.remove("opacity-100", "scale-100", "bg-white");
    menu.classList.add(
      "opacity-0",
      "scale-95",
      "bg-white/30",
      "backdrop-blur-md"
    );
  }

  menuToggle.classList.toggle("active");
});
customPlay2.addEventListener("click", togglePlay);
customPlay.addEventListener("click", togglePlay);
