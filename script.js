const pomodoroSeconds = 5;
const shortRestInSeconds = 300;

const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');

const pomodoroContainer = document.getElementById('pomodoroContainer');
const shortBreakContainer = document.getElementById('shortBreakContainer');

const timerEl = document.getElementById('timer');
const startButtonEl = document.getElementById('start');
const stopButtonEl = document.getElementById('stop');
const resetButtonEl = document.getElementById('reset');

let timer;

pomodoroButton.addEventListener('click', function () {
  hide(shortBreakContainer);
  show(pomodoroContainer);
});

shortBreakButton.addEventListener('click', function () {
  hide(pomodoroContainer);
  show(shortBreakContainer);
});

startButtonEl.addEventListener('click', function () {
  hide(startButtonEl);

  show(resetButtonEl);
  show(stopButtonEl);

  const time = timerEl.innerHTML;
  const timeValues = time.split(':');
  const minutes = Number(timeValues[0]);
  const seconds = Number(timeValues[1]);
  let totalSeconds = minutes * 60 + seconds;

  timer = setInterval(function () {
    totalSeconds -= 1;
    timerEl.innerHTML = timeFormatter(totalSeconds);

    if (totalSeconds === 0) {
      stopTimer();
      hide(stopButtonEl);

      hide(pomodoroContainer);

      show(shortBreakContainer);

      // reset pomodoro timer
      timerEl.innerHTML = timeFormatter(pomodoroSeconds);
      show(startButtonEl);
      hide(resetButtonEl);
    }
  }, 1000);
});

stopButtonEl.addEventListener('click', function () {
  hide(stopButtonEl);
  show(startButtonEl);
  stopTimer();
});

resetButtonEl.addEventListener('click', function () {
  stopTimer();
  hide(stopButtonEl);
  show(startButtonEl);
  // reset displayed time.
  timerEl.innerHTML = timeFormatter(pomodoroSeconds);
});

function show(domElement) {
  domElement.style.display = 'block';
}

function hide(domElement) {
  domElement.style.display = 'none';
}

function stopTimer() {
  clearInterval(timer);
}

function timeFormatter(seconds) {
  const newMinutes = Math.floor(seconds / 60);
  const formattedMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  const newSeconds = seconds % 60;
  const formattedSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}
