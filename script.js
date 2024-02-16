const pomodoroSeconds = 5;
const shortBreakSeconds = 6;

// Navigation buttons
const pomodoroNavButton = document.getElementById('pomodoroNavButton');
const shortBreakNavButton = document.getElementById('shortBreakNavButton');

// Views
const pomodoroContainer = document.getElementById('pomodoroContainer');
const shortBreakContainer = document.getElementById('shortBreakContainer');
const longBreakContainer = document.getElementById('longBreakContainer');

// Timers
const pomodoroTimerEl = document.getElementById('pomodoroTimer');
const shortBreakTimerEl = document.getElementById('shortBreakTimer');

// Timer buttons
const pomodoroStartButton = document.getElementById('pomodoroStartButton');
const shortBreakStartButton = document.getElementById('shortBreakStartButton');

const pomodoroStopButton = document.getElementById('pomodoroStopButton');
const shortBreakStopButton = document.getElementById('shortBreakStopButton');

const pomodoroResetButton = document.getElementById('pomodoroResetButton');
const shortBreakResetButton = document.getElementById('shortBreakResetButton');

let pomodoroTimer;
let shortBreakTimer;

pomodoroNavButton.addEventListener('click', function () {
  hide(shortBreakContainer);
  hide(longBreakContainer);

  show(pomodoroContainer);
});

shortBreakNavButton.addEventListener('click', function () {
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

      hide(pomodoroContainer);
      hide(pomodoroStopButton);
      hide(pomodoroResetButton);
      setTimerEl(pomodoroTimerEl, pomodoroSeconds);
      show(pomodoroStartButton);

      show(shortBreakContainer);
    }
  }, 1000);
});

shortBreakStartButton.addEventListener('click', function () {
  hide(shortBreakStartButton);

  show(shortBreakStopButton);
  show(shortBreakResetButton);

  let totalSeconds = getTotalSeconds(shortBreakTimerEl);

  shortBreakTimer = setInterval(function () {
    totalSeconds -= 1;
    setTimerEl(shortBreakTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(shortBreakTimer);

      hide(shortBreakContainer);
      hide(shortBreakStopButton);
      hide(shortBreakResetButton);
      setTimerEl(shortBreakTimerEl, shortBreakSeconds);
      show(shortBreakStartButton);

      show(pomodoroContainer);
    }
  }, 1000);
});

pomodoroStopButton.addEventListener('click', function () {
  hide(pomodoroStopButton);
  show(pomodoroStartButton);
  stopTimer(pomodoroTimer);
});

shortBreakStopButton.addEventListener('click', function () {
  hide(shortBreakStopButton);
  show(shortBreakStartButton);
  stopTimer(shortBreakTimer);
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
