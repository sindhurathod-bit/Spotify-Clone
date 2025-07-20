console.log("Spotify Clone Loaded");

let songIndex = 0;
let audioElement = new Audio('songs/Emitemitemo - SenSongsMp3.Co.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSongName = document.getElementById('currentSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let durationDisplay = document.getElementById('duration');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songPlayButtons = document.getElementsByClassName('songPlay');

let songs = [
    { songName: "Undiporaadhey", filePath: "songs/Undiporaadhey.mp3" },
    { songName: "Emitemitemo", filePath: "songs/Emitemitemo - SenSongsMp3.Co.mp3" },
    { songName: "Ninnu Chuse Anandamlo", filePath: "songs/Ninnu Chuse Anandamlo From Gang Leader-320kbps.mp3" },
    { songName: "Pillaa Raa", filePath: "songs/Pillaa Raa - SenSongsMp3.Co.mp3" },
    { songName: "Vellipomaakey", filePath: "songs/Vellipomaakey.mp3" },
    { songName: "Urike Urike", filePath: "songs/[iSongs.info] 01 - Urike Urike.mp3" },
    { songName: "Bhekayali", filePath: "songs/Bekhayali-320kbps.mp3" },
    { songName: " jhol", filePath: "songs/Jhol - PagalWorld.mp3" },
    { songName: "yeh fitoor Mera", filePath: "songs/Yeh Fitoor Mera-320kbps.mp3" },
    { songName: "Pehli Dafa", filePath: "songs/Pehli-Dafa-Atif-Aslam.mp3" },
    { songName: "Prema velluva", filePath: "songs/Undiporaadhey.mp3" },
];

function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    currentSongName.innerText = "Playing: " + songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    updateAllIcons();
    songPlayButtons[songIndex].classList.remove("fa-play");
    songPlayButtons[songIndex].classList.add("fa-pause");
}

function updateAllIcons() {
    Array.from(songPlayButtons).forEach(btn => {
        btn.classList.remove("fa-pause");
        btn.classList.add("fa-play");
    });
}

Array.from(songPlayButtons).forEach((button, i) => {
    button.addEventListener("click", () => {
        if (audioElement.src.includes(songs[i].filePath) && !audioElement.paused) {
            audioElement.pause();
            button.classList.remove("fa-pause");
            button.classList.add("fa-play");
            masterPlay.classList.add("fa-play");
            masterPlay.classList.remove("fa-pause");
            gif.style.opacity = 0;
        } else {
            playSong(i);
        }
    });
});

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
        updateAllIcons();
        songPlayButtons[songIndex].classList.remove("fa-play");
        songPlayButtons[songIndex].classList.add("fa-pause");
    } else {
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        gif.style.opacity = 0;
        updateAllIcons();
    }
});

audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    let currMin = Math.floor(audioElement.currentTime / 60);
    let currSec = Math.floor(audioElement.currentTime % 60).toString().padStart(2, '0');
    let durMin = Math.floor(audioElement.duration / 60);
    let durSec = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');

    if (!isNaN(durMin)) {
        currentTimeDisplay.innerText = `${currMin}:${currSec}`;
        durationDisplay.innerText = `${durMin}:${durSec}`;
    }
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

audioElement.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});
