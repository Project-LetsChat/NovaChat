// Video element
const video = document.getElementById('video');

// Control buttons
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const muteBtn = document.getElementById('muteBtn');

// Time elements
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

// Seek bar
const seekBar = document.getElementById('seekBar');

// Volume bar
const volumeBar = document.getElementById('volumeBar');

// Play button click event
playBtn.addEventListener('click', () => {
  video.play();
});

// Pause button click event
pauseBtn.addEventListener('click', () => {
  video.pause();
});

// Stop button click event
stopBtn.addEventListener('click', () => {
  video.pause();
  video.currentTime = 0;
});

// Mute button click event
muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
});

// Update seek bar and time elements on timeupdate event
video.addEventListener('timeupdate', () => {
  const currentTimeMinutes = Math.floor(video.currentTime / 60);
  const currentTimeSeconds = Math.floor(video.currentTime % 60);
  currentTime.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;

  const durationMinutes = Math.floor(video.duration / 60);
  const durationSeconds = Math.floor(video.duration % 60);
  duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

  seekBar.value = video.currentTime / video.duration;
});

// Seek bar input event
seekBar.addEventListener('input', () => {
  video.currentTime = seekBar.value * video.duration;
});

// Volume bar input event
volumeBar.addEventListener('input', () => {
  video.volume = volumeBar.value;
});

