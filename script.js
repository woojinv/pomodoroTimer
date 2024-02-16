const pomodoroSeconds = 5;
const shortBreakSeconds = 300;

// Navigation buttons
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');

// Views
const pomodoroContainer = document.getElementById('pomodoroContainer');
const shortBreakContainer = document.getElementById('shortBreakContainer');
const longBreakContainer = document.getElementById('longBreakContainer');

// Timers
const pomodoroTimerEl = document.getElementById('pomodoroTimer');

// Timer buttons
const pomodoroStartButton = document.getElementById('pomodoroStartButton');
const pomodoroStopButton = document.getElementById('pomodoroStopButton');
const pomodoroResetButton = document.getElementById('pomodoroResetButton');

let pomodoroTimer;

pomodoroButton.addEventListener('click', function () {
  hide(shortBreakContainer);
  hide(longBreakContainer);

  show(pomodoroContainer);
});

shortBreakButton.addEventListener('click', function () {
  hide(pomodoroContainer);
  hide(longBreakContainer);

  show(shortBreakContainer);
});

pomodoroStartButton.addEventListener('click', function () {
  hide(pomodoroStartButton);

  show(pomodoroStopButton);
  show(pomodoroResetButton);

  let totalSeconds = getTotalSeconds(pomodoroTimerEl);

  pomodoroTimer = setInterval(function () {
    totalSeconds -= 1;
    setTimerEl(pomodoroTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(pomodoroTimer);

      hide(pomodoroStopButton);
      hide(pomodoroContainer);

      show(shortBreakContainer);

      setTimerEl(pomodoroTimerEl, pomodoroSeconds);
      show(pomodoroStartButton);
      hide(pomodoroResetButton);
    }
  }, 1000);
});

pomodoroStopButton.addEventListener('click', function () {
  hide(pomodoroStopButton);
  show(pomodoroStartButton);
  stopTimer(pomodoroTimer);
});

pomodoroResetButton.addEventListener('click', function () {
  stopTimer(pomodoroTimer);
  hide(pomodoroStopButton);
  show(pomodoroStartButton);
  setTimerEl(pomodoroTimerEl, pomodoroSeconds);
});

function show(domElement) {
  domElement.style.display = 'block';
}

function hide(domElement) {
  domElement.style.display = 'none';
}

function stopTimer(timer) {
  clearInterval(timer);
}

function getTotalSeconds(timerEl) {
  const formattedTime = timerEl.innerHTML;
  const timeValues = formattedTime.split(':');
  const minutes = Number(timeValues[0]);
  const seconds = Number(timeValues[1]);
  return minutes * 60 + seconds;
}

function timeFormatter(seconds) {
  const newMinutes = Math.floor(seconds / 60);
  const formattedMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  const newSeconds = seconds % 60;
  const formattedSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}

function setTimerEl(timerEl, seconds) {
  timerEl.innerHTML = timeFormatter(seconds);
}
