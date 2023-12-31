/* require('dotenv').config(); */
document.addEventListener("DOMContentLoaded", async function () {

  let video = document.querySelector("video");
  let videoContainer = document.querySelector(".video-container");
  let playButton = document.getElementById("play-pause");
  let muteButton = document.getElementById("volume-mute");
  let duration = document.getElementById("duration");
  let currentTimeDisplay = document.getElementById("current-time");
  let vol = document.getElementById("vol");
  let progress = document.getElementById("progress");
  let fullscreen = document.getElementById("fullscreen");

  video.src = "./assets/video/video.mp4" /* await getRandomVideo(await getVideo()) */;

  video.addEventListener("loadedmetadata", function () {
    /*muestra duracion del video*/ duration.innerHTML = formatTime(
      video.duration
    );
  });
  video.addEventListener("timeupdate", function () {
    /*muestra tiempo real + barra*/ currentTimeDisplay.innerHTML = formatTime(
      video.currentTime
    );
    let value = (100 / video.duration) * video.currentTime;
    progress.value = value;
  });

  fullscreen.addEventListener("click", function () {
    fullScreenVideo(videoContainer, fullscreen);
  });

  vol.addEventListener("input", function () {
    changeVolume(video, vol.value);
  });

  playButton.addEventListener("click", function () {
    playVideo(playButton, video);
  });
  muteButton.addEventListener("click", function () {
    muteVideo(muteButton, video);
  });

  progress.addEventListener("input", function () {
    video.currentTime = (progress.value / 100) * video.duration;
  });
});

function playVideo(playButton, video) {
  let videoContainer = document.querySelector(".video-container");
  if (video.paused == true) {
    video.play();
    playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo
    Mixer Tools -->
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>`;
    videoContainer.classList.remove("paused");
  } else {
    video.pause();
    playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
            stroke="#000000" stroke-width="2" stroke-linejoin="round" />
    </svg>`;
    videoContainer.classList.add("paused");
  }
}

function muteVideo(muteButton, video) {
  if (video.muted == false) {
    video.muted = true;
    muteButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0012 8.99984H9.1C8.53995 8.99984 8.25992 8.99984 8.04601 9.10883C7.85785 9.20471 7.70487 9.35769 7.60899 9.54585C7.5 9.75976 7.5 10.0398 7.5 10.5998V13.3998C7.5 13.9599 7.5 14.2399 7.60899 14.4538C7.70487 14.642 7.85785 14.795 8.04601 14.8908C8.25992 14.9998 8.53995 14.9998 9.1 14.9998H10.0012C10.5521 14.9998 10.8276 14.9998 11.0829 15.0685C11.309 15.1294 11.5228 15.2295 11.7143 15.3643C11.9305 15.5164 12.1068 15.728 12.4595 16.1512L15.0854 19.3023C15.5211 19.8252 15.739 20.0866 15.9292 20.1138C16.094 20.1373 16.2597 20.0774 16.3712 19.9538C16.5 19.811 16.5 19.4708 16.5 18.7902V5.20948C16.5 4.52892 16.5 4.18864 16.3712 4.04592C16.2597 3.92233 16.094 3.86234 15.9292 3.8859C15.7389 3.9131 15.5211 4.17451 15.0854 4.69733L12.4595 7.84843C12.1068 8.27166 11.9305 8.48328 11.7143 8.63542C11.5228 8.77021 11.309 8.87032 11.0829 8.93116C10.8276 8.99984 10.5521 8.99984 10.0012 8.99984Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  } else {
    video.muted = false;
    muteButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.0004 9.00009C16.6281 9.83575 17 10.8745 17 12.0001C17 13.1257 16.6281 14.1644 16.0004 15.0001M18 5.29177C19.8412 6.93973 21 9.33459 21 12.0001C21 14.6656 19.8412 17.0604 18 18.7084M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = Math.floor(seconds - minutes * 60);

  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = "0" + minutes;
  } else {
    minuteValue = minutes.toString();
  }

  if (secondsLeft < 10) {
    secondValue = "0" + secondsLeft;
  } else {
    secondValue = secondsLeft.toString();
  }

  return minuteValue + ":" + secondValue;
}

function changeVolume(video, volume) {
  video.volume = volume;
}

function fullScreenVideo(videoContainer, button) {
  if (document.fullscreenElement) {
    if (document.exitFullscreen()) {
      button.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo
      Mixer Tools -->
      <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`;
      videoContainer.exitFullscreen();
    }
  } else if (videoContainer.requestFullscreen()) {
    videoContainer.requestFullscreen();

    button.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo
        Mixer Tools -->
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V10H3M16 5V10H21M3 14H8V19M16 19V14H21" stroke="#000000" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;
  }
}

async function getVideo() {
  let apiKey = /* process.env.API_VIDEO_KEY */'lwggiXgTQZGr4rAQM5X3ZPxfn6ZhM5BLBYH6AQgY5dz';

  let response = await fetch("https://sandbox.api.video/videos", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  let data = await response.json();

  return data;
}

async function getRandomVideo(data) {
  let arrayVideos = data.data;

  let videoFuente = arrayVideos[Math.floor(Math.random() * arrayVideos.length)];

  videoFuente = videoFuente.assets.mp4;

  return videoFuente;
}
