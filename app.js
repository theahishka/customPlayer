// Volume
const volumeButtonUnmute = document.querySelector(".fa-volume-up");
const volumeButtonMute = document.querySelector(".fa-volume-mute");
const volumeDisplay = document.querySelector(".volume-display");
const volumeSlider = document.getElementById("volume-slider");

// Song Info
const songName = document.querySelector(".song");
const songSinger = document.querySelector(".singer");

// Buttons
const previousButton = document.querySelector(".fa-step-backward");
const playButton = document.querySelector(".fa-play");
const pauseButton = document.querySelector(".fa-pause");
const nextButton = document.querySelector(".fa-step-forward");

// Time Slider
const progressedTime = document.getElementById("progressed-time");
const timeSlider = document.getElementById("slider");
const lengthTime = document.getElementById("length-time");

// Song Number Tracker
const currentTrackNumber = document.querySelector(".current-track");
const totalTracksNumber = document.querySelector(".total-tracks");

// Album Image Element
const albumImage = document.getElementById("album-image");

// Audio Element
const audio = document.getElementById("audio");

let songs = [
    {
        songName: "Can't Get You Out of My Head",
        singer: "Glimmer of Blooms",
        imageSrc: "./pics/head.jpg",
        songSrc: "./music/head.mp3",
    },
    {
        songName: "Rampampam",
        singer: "Minelli",
        imageSrc: "./pics/rampampam.jpg",
        songSrc: "./music/rampampam.mp3",
    },
    {
        songName: "Konoha Peace",
        singer: "Naruto",
        imageSrc: "./pics/konoha.jpg",
        songSrc: "./music/konoha.mp3",
    },
];

// Initial Load of the First Track Through an Object
(async function () {
    audio.src = `${songs[0].songSrc}`;
    songName.innerHTML = `${songs[0].songName}`;
    songSinger.innerHTML = `${songs[0].singer}`;
    albumImage.src = `${songs[0].imageSrc}`;
    volumeDisplay.innerHTML = `${volumeSlider.value}`;

    setTracksTime();
})();

// Event Listeners

// Buttons
playButton.addEventListener("click", function () {
    audio.play();
    audio.autoplay = true;
    playButton.style.display = "none";
    pauseButton.style.display = "flex";
});

pauseButton.addEventListener("click", function () {
    audio.pause();
    audio.autoplay = false;
    pauseButton.style.display = "none";
    playButton.style.display = "flex";
});

nextButton.addEventListener("click", function () {
    let currentTrack = Number(currentTrackNumber.innerHTML);
    let nextTrack = currentTrack + 1;

    if (songs.length === currentTrack) {
        buttonPressed(0, 1);
    } else {
        buttonPressed(currentTrack, nextTrack);
    }

    setTracksTime();
});

previousButton.addEventListener("click", function () {
    let currentTrack = Number(currentTrackNumber.innerHTML);
    let previousTrack = currentTrack - 1;
    let songsLengthIndex = songs.length - 1;

    if (currentTrack === 1) {
        buttonPressed(songsLengthIndex, songs.length);
    } else {
        buttonPressed(currentTrack - 2, previousTrack);
    }

    setTracksTime();
});

// Volume
let currentVolume;

volumeButtonUnmute.addEventListener("click", function () {
    volumeButtonUnmute.style.display = "none";
    volumeButtonMute.style.display = "flex";
    volumeSlider.value = 0;
    volumeDisplay.innerHTML = `0`;
    audio.volume = 0;
});

volumeButtonMute.addEventListener("click", function () {
    volumeButtonMute.style.display = "none";
    volumeButtonUnmute.style.display = "flex";
    volumeSlider.value = currentVolume;
    volumeDisplay.innerHTML = `${currentVolume}`;
    audio.volume = currentVolume / 100;
});

volumeSlider.addEventListener("input", function () {
    volumeDisplay.innerHTML = `${volumeSlider.value}`;
    audio.volume = volumeSlider.value / 100;
    currentVolume = volumeSlider.value;
});

// Time Slider
audio.addEventListener("timeupdate", function () {
    timeSlider.value = Math.floor(audio.currentTime);
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    progressedTime.innerHTML = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
});

timeSlider.addEventListener("input", function () {
    audio.currentTime = timeSlider.value;
});

audio.addEventListener("ended", function () {
    let currentTrack = Number(currentTrackNumber.innerHTML);
    let nextTrack = currentTrack + 1;

    if (songs.length === currentTrack) {
        buttonPressed(0, 1);
    } else {
        buttonPressed(currentTrack, nextTrack);
    }

    setTracksTime();
});

// Functions
function setTracksTime() {
    setTimeout(function () {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);
        lengthTime.innerHTML = `${minutes}:${seconds}`;
        timeSlider.setAttribute("max", Math.floor(audio.duration));
    }, 100);
}

function buttonPressed(songIndex, type) {
    audio.src = `${songs[songIndex].songSrc}`;
    songName.innerHTML = `${songs[songIndex].songName}`;
    songSinger.innerHTML = `${songs[songIndex].singer}`;
    albumImage.src = `${songs[songIndex].imageSrc}`;
    currentTrackNumber.innerHTML = `${type}`;
}
