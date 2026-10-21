 
let play = document.getElementById('play');
let progressbar = document.getElementById('progressbar');
let audio = new Audio('music/1.mp3');
let currentsong = 1;

// Main play and pause button
play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();

        play.classList.remove('fa-play');
        play.classList.add('fa-pause');

        makeallplay();
        document.getElementById(currentsong).classList.remove('fa-circle-play');
        document.getElementById(currentsong).classList.add('fa-circle-pause');
    }
    else {
        audio.pause();

        play.classList.remove('fa-pause');
        play.classList.add('fa-play');

        makeallplay();
    }
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        let progress = (audio.currentTime / audio.duration) * 100;

        progressbar.value = progress;
        progressbar.style.background =
            `linear-gradient(to right, #1db954 ${progress}%, #333 ${progress}%)`;
    }
});

// Change song position using progress bar
progressbar.addEventListener('input', function () {
    if (audio.duration) {
        audio.currentTime = (this.value * audio.duration) / 100;
    }

    this.style.background =
        `linear-gradient(to right, #1db954 ${this.value}%, #333 ${this.value}%)`;
});

// Card play buttons
let playmusic = Array.from(document.getElementsByClassName('playmusic'));

// Make all card buttons play icons
makeallplay = () => {
    playmusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Update Now Playing bar
let nowbar = document.querySelector('.now-bar');

function updatenowbar() {
    let card = document.getElementById(currentsong).parentElement.parentElement;

    nowbar.getElementsByTagName('img')[0].src =
        card.getElementsByClassName('card-img')[0].src;

    nowbar.getElementsByClassName('img-tt')[0].innerText =
        card.getElementsByClassName('card-title')[0].innerText;

    nowbar.getElementsByClassName('img-des')[0].innerText =
        card.getElementsByClassName('card-info')[0].innerText;
}

// Play song by clicking a card
playmusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallplay();

        currentsong = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        play.classList.remove('fa-play');
        play.classList.add('fa-pause');

        audio.src = `music/${currentsong}.mp3`;
        audio.currentTime = 0;
        audio.play();

        updatenowbar();
    });
});

// Next song
playnextsong = () => {
    if (currentsong == playmusic.length) {
        currentsong = 1;
    }
    else {
        currentsong++;
    }

    audio.src = `music/${currentsong}.mp3`;
    audio.currentTime = 0;
    audio.play();

    makeallplay();

    document.getElementById(currentsong).classList.remove('fa-circle-play');
    document.getElementById(currentsong).classList.add('fa-circle-pause');

    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

    updatenowbar();
};

// Previous song
playPrevSong = () => {
    if (currentsong == 1) {
        currentsong = playmusic.length;
    }
    else {
        currentsong--;
    }

    audio.src = `music/${currentsong}.mp3`;
    audio.currentTime = 0;
    audio.play();

    makeallplay();

    document.getElementById(currentsong).classList.remove('fa-circle-play');
    document.getElementById(currentsong).classList.add('fa-circle-pause');

    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

    updatenowbar();
};

// Forward and backward buttons
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playnextsong();
});

backward.addEventListener('click', () => {
    playPrevSong();
});

// Play next song when current song ends
audio.addEventListener('ended', () => {
    playnextsong();
});

// Show first song details when website opens
updatenowbar();
