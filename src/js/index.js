// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

import imagePlay from '../assets/images/play-solid.svg';
import imagePause from '../assets/images/pause-solid.svg';
import imageMute from '../assets/images/volume-xmark-solid.svg';
import imageVolume from '../assets/images/volume-high-solid.svg';

const video = document.getElementById('video');
const buttonBack = document.getElementById('video-back');
const buttonFront = document.getElementById('video-front');
const videoPause = document.getElementById('video-pause');
const volume = document.getElementById('volume');
// const videoBar = document.getElementById('video-bar');
// const ball = document.getElementById('ball');
const barDark = document.getElementById('bar-dark');
const range = document.getElementById('range-volume');
const inputRange = document.getElementById('input');
const timeVideo = document.getElementById('time');
const timeVideoFinal = document.getElementById('final-time');
const rootStyles = document.documentElement.style;

const barWidth = () => {
  const barProportion = (video.currentTime * 100) / video.duration;
  rootStyles.setProperty('--bar-width', barProportion + '%');
};

const playPause = () => {
  if (!video.paused) {
    video.pause();
    videoPause.src = imagePlay;
  } else {
    video.play();
    videoPause.src = imagePause;
  }
};
const videoBack = () => {
  const backTime = (video.currentTime -= 10);
  video.currentTime = backTime;
};
const videoFront = () => {
  const frontTime = (video.currentTime += 10);
  video.currentTime = frontTime;
};
const rangeVolume = value => {
  console.dir(value);
  video.volume = value * 0.1;

  if (video.volume === 0) {
    volume.src = imageMute;
  } else {
    volume.src = imageVolume;
  }
};
const volumeVideo = value => {
  if (value.nextElementSibling.classList.value === 'range') {
    range.classList.add('range--show');
  } else {
    range.classList.remove('range--show');
  }
};
const formatSecondsCurrent = currentSeconds => {
  const date = new Date(null);
  date.setSeconds(currentSeconds);
  const timeString = date.toISOString().slice(14, 19);
  timeVideo.textContent = timeString;
};

const formatSeconds = segundosTotales => {
  const date = new Date(null);
  date.setSeconds(segundosTotales);
  const timeString = date.toISOString().slice(14, 19);
  timeVideoFinal.textContent = timeString;
};

const LS = localStorage;

const saveDataInLocalStorage = data => {
  LS.setItem('currentTime', data);
};
window.addEventListener('load', e => {
  const getData = JSON.parse(LS.getItem('currentTime'));
  console.log(getData);
  video.currentTime = getData;
});

video.addEventListener('loadedmetadata', () => {
  formatSeconds(video.duration);
});
inputRange.addEventListener('change', e => {
  rangeVolume(e.target.value);
});

volume.addEventListener('click', e => {
  volumeVideo(e.target);
});

buttonBack.addEventListener('click', e => {
  videoBack();
});

buttonFront.addEventListener('click', e => {
  videoFront();
});

videoPause.addEventListener('click', e => {
  playPause();
});

video.addEventListener('timeupdate', e => {
  barWidth();
  formatSecondsCurrent(video.currentTime);
  saveDataInLocalStorage(video.currentTime);
});

window.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    playPause();
  }
  if (e.code === 'ArrowLeft') {
    videoBack();
  }
  if (e.code === 'ArrowRight') {
    videoFront();
  }
});
barDark.addEventListener('click', e => {
  const pointBar = (e.offsetX / e.target.clientWidth) * video.duration;
  video.currentTime = pointBar;
});
