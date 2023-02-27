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
const videoBar = document.getElementById('video-bar');
const ball = document.getElementById('ball');
const barDark = document.getElementById('bar-dark');
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

const volumeVideo = () => {
  console.dir(video.volume);
  if (video.volume === 1) {
    volume.src = imageMute;
  } else {
    volume.src = imageVolume;
  }
};
volume.addEventListener('click', e => {
  volumeVideo();
});
const videoFront = () => {
  const frontTime = (video.currentTime += 10);
  video.currentTime = frontTime;
};

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
});

window.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    playPause();
  }
});
barDark.addEventListener('click', e => {
  const pointBar = (e.offsetX / e.target.clientWidth) * video.duration;
  video.currentTime = pointBar;
});
