const shortRestInSeconds = 300;

const timerEl = document.getElementById('timer');
const startButtonEl = document.getElementById('start');
const stopButtonEl = document.getElementById('stop');
const resetButtonEl = document.getElementById('reset');

let timer;

startButtonEl.addEventListener('click', function () {
  hideStartButton();
  showStopButton();

  const time = timerEl.innerHTML;
  const timeValues = time.split(':');
  const minutes = Number(timeValues[0]);
  const seconds = Number(timeValues[1]);
  let totalSeconds = minutes * 60 + seconds;

  timer = setInterval(function () {
    totalSeconds -= 1;
    timerEl.innerHTML = timeFormatter(totalSeconds);

    if (totalSeconds === 0) {
      clearInterval(timer);
      // hide stop button
      stopButtonEl.style.display = 'none';
      // show reset button
      resetButtonEl.style.display = 'block';
    }
  }, 1000);
});

stopButtonEl.addEventListener('click', function () {
  // hide the stop button
  stopButtonEl.style.display = 'none';
  // show the start button
  startButtonEl.style.display = 'block';

  clearInterval(timer);
});

resetButtonEl.addEventListener('click', function () {
  // hide reset button
  resetButtonEl.style.display = 'none';
  // show start button
  startButtonEl.style.display = 'block';
  // reset displayed time.
  timerEl.innerHTML = timeFormatter(shortRestInSeconds);
});

function hideStartButton() {
  startButtonEl.style.display = 'none';
}

function showStopButton() {
  stopButtonEl.style.display = 'block';
}

function timeFormatter(seconds) {
  const newMinutes = Math.floor(seconds / 60);
  const formattedMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  const newSeconds = seconds % 60;
  const formattedSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}
