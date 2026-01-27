import './bootstrap';



function actualizarHora() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    document.getElementById('reloj').textContent = `${horas}:${minutos}`;
}

// Actualizar inmediatamente y luego cada segundo
actualizarHora();
setInterval(actualizarHora, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("player");
  const icon = document.getElementById("playIcon");
  const albumWrap = document.getElementById("albumWrap");
  const lyricsPanel = document.getElementById("lyricsPanel");
  const spotifyContainer = document.getElementById("spotify-container");

  if (!audio || !icon || !albumWrap || !lyricsPanel) {
    console.error("Faltan elementos:", { audio, icon, albumWrap, lyricsPanel });
    return;
  }

  function openLyricsMode() {
    // disco sube
    albumWrap.classList.add("-translate-y-56");
    // panel sube desde abajo
    lyricsPanel.classList.remove("translate-y-full");
    lyricsPanel.classList.add("-translate-y-24");
    // cambia color fondo
    spotifyContainer.classList.add(
    "bg-violet-500",
    "shadow-[0_0_30px_#a78bfa]"
    );
  }

  function closeLyricsMode() {
    albumWrap.classList.remove("-translate-y-56");
    lyricsPanel.classList.add("translate-y-full");
    lyricsPanel.classList.remove("-translate-y-24");
    spotifyContainer.classList.remove(
    "bg-violet-500",
    "shadow-[0_0_30px_#a78bfa]"
    );
  }

  // Si termina la canción, vuelve a estado inicial
  audio.addEventListener("ended", () => {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    closeLyricsMode();
    audio.currentTime = 0;
  });

  window.togglePlay = function () {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");
          openLyricsMode();
        })
        .catch((err) => console.error("No se pudo reproducir:", err));
    } else {
      audio.pause();
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
      closeLyricsMode();
    }
  };
});



document.addEventListener("DOMContentLoaded", () => {
    const likeButton = document.getElementById("like-button");
    const likeCountElement = document.getElementById("like-count");
    const overlayImage = document.getElementById('overlay-like-image');

    likeButton.addEventListener("click", () => {
        // Primero, remueve la clase de animación (si ya existe) para reiniciar la animación
        overlayImage.classList.remove('like-animation');

        // Esto es necesario para forzar una "reflow" y reiniciar la animación
        void overlayImage.offsetWidth;

        // Añade la clase de animación
        overlayImage.classList.add('like-animation');

        // Aumentar el contador de likes (usando tu lógica existente)
        const likeCount = Number(likeCountElement.textContent);
        likeCountElement.textContent = (likeCount + 1).toString();

    });
});


document.addEventListener("DOMContentLoaded", () => {
    const likeButtontw = document.getElementById("buttonLiketwitter");
    const likeCountElement = document.getElementById("LikeTwitter");
    const overlayImage = document.getElementById('overlay-love-image');

    likeButtontw.addEventListener("click", () => {
         // Primero, remueve la clase de animación (si ya existe) para reiniciar la animación
         overlayImage.classList.remove('like-animation');

         // Esto es necesario para forzar una "reflow" y reiniciar la animación
         void overlayImage.offsetWidth;
 
         // Añade la clase de animación
         overlayImage.classList.add('like-animation');

        const likeCount = Number(likeCountElement.textContent);
        likeCountElement.textContent = (likeCount + 1).toString(); // Convertimos el número a string
    });
});

document.getElementById('edad').addEventListener('mouseover', function() {
    let edadElement = this;
    let currentAge = parseInt(edadElement.innerText);
    let initialAge = currentAge;
    let speed = 120; // velocidad inicial
    let interval;

    // Función para bajar la edad
    function decreaseAge() {
        if (currentAge > 0) {
            edadElement.innerText = currentAge.toString(); // Convertir a string
            currentAge--;
            speed = Math.max(10, speed - 4); // Acelera la reducción
            interval = setTimeout(decreaseAge, speed);
        } else {
            edadElement.innerText = "0"; // Convertir a string
            alert("Easter egg 🥚🥚🐰🐰"); // Alerta cuando llega a 0
        }
    }

    // Comienza a disminuir la edad
    decreaseAge();

    // Cuando el mouse se va, restablece la edad al valor inicial
    edadElement.addEventListener('mouseout', function() {
        clearTimeout(interval);
        edadElement.innerText = initialAge.toString(); 
    });
});

