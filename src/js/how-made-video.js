let player;
const preview = document.getElementById('videoPreview');
const playBtn = document.getElementById('playVideoBtn');
const playerContainer = document.getElementById('playerContainer');
const videoWrap = document.querySelector('.how-made-video-wrap');

/* Script for YouTube API */
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.body.appendChild(tag);

/* YouTube API callback */
function onYouTubeIframeAPIReady() {
  // API готов, но плеер создаём только при клике
}

playBtn.addEventListener('click', () => {
  preview.style.display = 'none';

  player = new YT.Player('playerContainer', {
    videoId: '70FFS9P-wVw',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: event => event.target.playVideo(),
      onStateChange: onPlayerStateChange,
    },
  });

  createCloseButton();
});

function onPlayerStateChange(event) {
  // 0 = ended
  if (event.data === YT.PlayerState.ENDED) {
    destroyPlayer();
  }
}

function createCloseButton() {
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('video-close-btn');
  closeBtn.innerHTML = '✕';
  closeBtn.id = 'videoCloseBtn';

  videoWrap.appendChild(closeBtn);

  closeBtn.addEventListener('click', destroyPlayer);
}

function destroyPlayer() {
  if (player) {
    player.destroy();
    player = null;
  }

  playerContainer.innerHTML = '';

  const closeBtn = document.getElementById('videoCloseBtn');
  if (closeBtn) closeBtn.remove();

  preview.style.display = 'block';
}
