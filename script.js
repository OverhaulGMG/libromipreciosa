document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const music = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let isFlipping = false;
    let musicStarted = false; // Control para el auto-play

    // --- LÓGICA DEL LIBRO ---
    pages.forEach((page, index) => {
        page.style.zIndex = pages.length - index;
        
        page.addEventListener('click', () => {
            if (isFlipping) return; 
            isFlipping = true;

            // Iniciar música en la primera interacción si no ha empezado
            if (!musicStarted) {
                music.play().then(() => {
                    musicStarted = true;
                    playPauseBtn.textContent = "⏸️ Pausar Música";
                }).catch(error => {
                    console.log("Auto-play bloqueado, esperando interacción.");
                });
            }

            if (!page.classList.contains('flipped')) {
                // Voltear hacia la izquierda
                page.classList.add('flipped');
                setTimeout(() => {
                    page.style.zIndex = index + 1;
                    isFlipping = false;
                }, 650); // Justo a la mitad de la animación
            } else {
                // Voltear hacia la derecha
                page.style.zIndex = pages.length - index;
                page.classList.remove('flipped');
                setTimeout(() => {
                    isFlipping = false;
                }, 650);
            }
        });
    });

    // --- LÓGICA DE MÚSICA CONTROLES VISIBLES ---
    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.textContent = "⏸️ Pausar Música";
            musicStarted = true; // Aseguramos que la lógica de interacción sepa que ya arrancó
        } else {
            music.pause();
            playPauseBtn.textContent = "▶️ Tocar Música";
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });
});

function resetBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.remove('flipped');
        page.style.zIndex = pages.length - index;
    });
    // Opcional: pausar la música al cerrar el libro
    // document.getElementById('bg-music').pause();
}