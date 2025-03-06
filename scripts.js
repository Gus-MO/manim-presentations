const video = document.getElementById('main-video');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const fullscreenButton = document.getElementById('fullscreen-button'); // Botão de tela cheia
const progressBar = document.getElementById('progress-bar');
const markerDisplay = document.getElementById('marker-display');

let markers = [];
let currentMarkerIndex = 0;
let isNavigating = false;

// Função para alternar entre tela cheia e tela normal
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Entra em tela cheia
        document.querySelector('.video-container').requestFullscreen();
        fullscreenButton.textContent = 'Sair da Tela Cheia';
    } else {
        // Sai da tela cheia
        document.exitFullscreen();
        fullscreenButton.textContent = 'Tela Cheia';
    }
}

// Carrega os marcadores do arquivo JSON
function loadMarkers() {
    return fetch('markers.json')
        .then(response => response.json())
        .then(data => {
            markers = data.markers;
            console.log("Marcadores carregados:", markers);
        })
        .catch(error => {
            console.error("Erro ao carregar os marcadores:", error);
        });
}

// Atualiza o display do marcador atual
function updateMarkerDisplay() {
    markerDisplay.textContent = `Marcador atual: ${currentMarkerIndex}`;
}

// Alterna entre play e pause
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = 'Pause';
    } else {
        video.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Avança para o próximo marcador
function nextMarker() {
    if (currentMarkerIndex < markers.length - 1) {
        currentMarkerIndex++;
        isNavigating = true;
        video.currentTime = markers[currentMarkerIndex];
        updateMarkerDisplay();
        video.play();
    }
}

// Retrocede para o marcador anterior
function previousMarker() {
    if (currentMarkerIndex > 0) {
        currentMarkerIndex--;
        isNavigating = true;
        video.currentTime = markers[currentMarkerIndex];
        updateMarkerDisplay();
        video.play();
    }
}

// Event listener para o botão de tela cheia
fullscreenButton.addEventListener('click', toggleFullscreen);

// Event listener para detectar mudanças no modo de tela cheia
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.textContent = 'Tela Cheia'; // Atualiza o texto do botão ao sair da tela cheia
    }
});

// Event listener para o evento timeupdate
video.addEventListener('timeupdate', () => {
    // Atualiza a barra de progresso
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Verifica se atingiu o próximo marcador
    if (isNavigating && currentMarkerIndex < markers.length - 1 && video.currentTime >= markers[currentMarkerIndex + 1]) {
        video.pause();
        isNavigating = false;
    }
});

// Event listener para as teclas
document.addEventListener('keydown', (event) => {
    const key = event.key;

    switch (key) {
        case "ArrowRight": // Avança para o próximo marcador
            nextMarker();
            break;
        case "ArrowLeft": // Retrocede para o marcador anterior
            previousMarker();
            break;
        case " ": // Barra de espaço para play/pause
            togglePlayPause();
            break;
    }
});

// Event listener para clicar na barra de progresso
document.querySelector('.progress-container').addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    video.currentTime = clickPosition * video.duration;
});

// Inicia o vídeo pausado ao carregar a página
window.onload = () => {
    loadMarkers().then(() => {
        video.currentTime = markers[currentMarkerIndex];
        video.pause();
        updateMarkerDisplay();
    });
};