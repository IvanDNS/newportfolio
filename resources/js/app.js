import './bootstrap';


// Variable global para el swiper
let mySwiper;

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el swiper
    mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
    });
});

// Hacer las funciones accesibles globalmente para los onclick
window.openSkillsModal = function() {
    const modal = document.getElementById('skillsModal');
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        if (mySwiper) {
            mySwiper.update();
            mySwiper.slideTo(1, 0);
        }
    }, 50);
}

window.closeSkillsModal = function() {
    document.getElementById('skillsModal').classList.add('hidden');
}



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
  const albumText = document.getElementById("albumText");
  const lyricsPanel = document.getElementById("lyricsPanel");
  const spotifyContainer = document.getElementById("spotify-container");
  const lyric1 = document.getElementById("lyric1");
  const lyric2 = document.getElementById("lyric2");
  const lyric3 = document.getElementById("lyric3");

  if (!audio || !icon || !albumWrap || !lyricsPanel) {
    console.error("Faltan elementos:", { audio, icon, albumWrap, lyricsPanel });
    return;
  }

  let isLyricsModeOpen = false;
  let fadeTimeouts = [];
  let currentLyricIndex = 0;

  const lyrics = [lyric1, lyric2, lyric3];

  function showLyric(index) {
    // Oculta todas las letras
    lyrics.forEach(lyric => {
      lyric.classList.add("hidden");
      lyric.style.opacity = "0";
    });

    // Muestra solo la letra actual
    const currentLyric = lyrics[index];
    currentLyric.classList.remove("hidden");
    
    // Pequeño delay para que la transición de opacity funcione
    setTimeout(() => {
      currentLyric.style.opacity = "1";
    }, 50);
  }

  function openLyricsMode() {
    if (isLyricsModeOpen) return;
    isLyricsModeOpen = true;
    currentLyricIndex = 0;

    requestAnimationFrame(() => {
      albumWrap.style.transform = "translateY(-3rem)";
      albumWrap.style.opacity = "0";
      albumText.style.opacity = "0";
      lyricsPanel.style.transform = "translateY(-6rem)";
      spotifyContainer.style.backgroundColor = "#8b5cf6";
      spotifyContainer.style.boxShadow = "0 0 30px #a78bfa";
    });

    // Muestra la primera letra después de 400ms
    fadeTimeouts.push(setTimeout(() => {
      showLyric(0);
    }, 400));
  }

  function closeLyricsMode() {
    if (!isLyricsModeOpen) return;
    isLyricsModeOpen = false;
    currentLyricIndex = 0;

    fadeTimeouts.forEach(timeout => clearTimeout(timeout));
    fadeTimeouts = [];

    requestAnimationFrame(() => {
      albumWrap.style.transform = "";
      albumWrap.style.opacity = "1";
      albumText.style.opacity = "1";
      lyricsPanel.style.transform = "";
      spotifyContainer.style.backgroundColor = "";
      spotifyContainer.style.boxShadow = "";
      
      // Oculta TODAS las letras
      lyrics.forEach(lyric => {
        lyric.classList.add("hidden");
        lyric.style.opacity = "0";
      });
    });
  }

  function nextLyric() {
    if (!isLyricsModeOpen) return;

    // Fade out de la letra actual
    lyrics[currentLyricIndex].style.opacity = "0";

    setTimeout(() => {
      // Avanza al siguiente
      currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;
      showLyric(currentLyricIndex);
    }, 400);
  }

  function prevLyric() {
    if (!isLyricsModeOpen) return;

    lyrics[currentLyricIndex].style.opacity = "0";

    setTimeout(() => {
      currentLyricIndex = (currentLyricIndex - 1 + lyrics.length) % lyrics.length;
      showLyric(currentLyricIndex);
    }, 400);
  }

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

  window.nextLyric = nextLyric;
  window.prevLyric = prevLyric;
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




