// Constants
const pomodoroSeconds = 5;
const shortBreakSeconds = 6;
const longBreakSeconds = 7;

// Navigation buttons
const pomodoroNavButton = document.getElementById('pomodoroNavButton');
const shortBreakNavButton = document.getElementById('shortBreakNavButton');
const longBreakNavButton = document.getElementById('longBreakNavButton');

// Views
const pomodoroContainer = document.getElementById('pomodoroContainer');
const shortBreakContainer = document.getElementById('shortBreakContainer');
const longBreakContainer = document.getElementById('longBreakContainer');

// Timers
const pomodoroTimerEl = document.getElementById('pomodoroTimer');
const shortBreakTimerEl = document.getElementById('shortBreakTimer');
const longBreakTimerEl = document.getElementById('longBreakTimer');

// Timer buttons
const pomodoroStartButton = document.getElementById('pomodoroStartButton');
const shortBreakStartButton = document.getElementById('shortBreakStartButton');
const longBreakStartButton = document.getElementById('longBreakStartButton');

const pomodoroStopButton = document.getElementById('pomodoroStopButton');
const shortBreakStopButton = document.getElementById('shortBreakStopButton');
const longBreakStopButton = document.getElementById('longBreakStopButton');

const pomodoroResetButton = document.getElementById('pomodoroResetButton');
const shortBreakResetButton = document.getElementById('shortBreakResetButton');
const longBreakResetButton = document.getElementById('longBreakResetButton');

// Global Variables
let pomodoroTimer;
let shortBreakTimer;
let longBreakTimer;

let numPomodoros = 0;

document.addEventListener('DOMContentLoaded', function () {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied');
      }
    });
  } else {
    console.log('Notifications not available in this browser.');
  }
});

/*
 * Navigation Buttons
 */
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

longBreakNavButton.addEventListener('click', function () {
  hide(pomodoroContainer);
  hide(shortBreakContainer);

  show(longBreakContainer);
});

/*
 * Start Buttons
 */
pomodoroStartButton.addEventListener('click', function () {
  handleShortBreakReset();
  handleLongBreakReset();

  hide(pomodoroStartButton);

  show(pomodoroStopButton);
  show(pomodoroResetButton);

  let totalSeconds = getTotalSeconds(pomodoroTimerEl);

  pomodoroTimer = setInterval(function () {
    totalSeconds -= 1;
    setTimerEl(pomodoroTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(pomodoroTimer);

      hide(longBreakContainer);

      hide(pomodoroContainer);
      hide(pomodoroStopButton);
      hide(pomodoroResetButton);

      setTimerEl(pomodoroTimerEl, pomodoroSeconds);

      show(pomodoroStartButton);

      numPomodoros += 1;
      numPomodoros === 4 ? show(longBreakContainer) : show(shortBreakContainer);
    }
  }, 1000);
});

shortBreakStartButton.addEventListener('click', function () {
  handlePomdoroReset();
  handleLongBreakReset();

  hide(shortBreakStartButton);

  show(shortBreakStopButton);
  show(shortBreakResetButton);

  let totalSeconds = getTotalSeconds(shortBreakTimerEl);

  shortBreakTimer = setInterval(function () {
    totalSeconds -= 1;
    setTimerEl(shortBreakTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(shortBreakTimer);

      hide(longBreakContainer);

      hide(shortBreakContainer);
      hide(shortBreakStopButton);
      hide(shortBreakResetButton);

      setTimerEl(shortBreakTimerEl, shortBreakSeconds);

      show(shortBreakStartButton);

      show(pomodoroContainer);
    }
  }, 1000);
});

longBreakStartButton.addEventListener('click', function () {
  handlePomdoroReset();
  handleShortBreakReset();

  hide(longBreakStartButton);

  show(longBreakStopButton);
  show(longBreakResetButton);

  let totalSeconds = getTotalSeconds(longBreakTimerEl);

  longBreakTimer = setInterval(function () {
    totalSeconds -= 1;
    setTimerEl(longBreakTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(longBreakTimer);

      hide(shortBreakContainer);

      hide(longBreakContainer);
      hide(longBreakStopButton);
      hide(longBreakResetButton);

      setTimerEl(longBreakTimerEl, longBreakSeconds);

      show(longBreakStartButton);

      show(pomodoroContainer);
    }
  }, 1000);
});

/*
 * Stop Buttons
 */
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

longBreakStopButton.addEventListener('click', function () {
  hide(longBreakStopButton);
  show(longBreakStartButton);
  stopTimer(longBreakTimer);
});

/*
 * Reset Buttons
 */
pomodoroResetButton.addEventListener('click', handlePomdoroReset);
shortBreakResetButton.addEventListener('click', handleShortBreakReset);
longBreakResetButton.addEventListener('click', handleLongBreakReset);

/*
 * Helper Functions
 */
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
  const timeValues = timerEl.innerHTML.split(':');
  const minutes = Number(timeValues[0]);
  const seconds = Number(timeValues[1]);
  return minutes * 60 + seconds;
}

function getFormattedTime(seconds) {
  const newMinutes = Math.floor(seconds / 60);
  const formattedMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  const newSeconds = seconds % 60;
  const formattedSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}

function setTimerEl(timerEl, seconds) {
  const newMinutes = Math.floor(seconds / 60);
  const formattedMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  const newSeconds = seconds % 60;
  const formattedSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  timerEl.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

function handlePomdoroReset() {
  stopTimer(pomodoroTimer);

  hide(pomodoroResetButton);
  hide(pomodoroStopButton);

  show(pomodoroStartButton);

  setTimerEl(pomodoroTimerEl, pomodoroSeconds);
}

function handleShortBreakReset() {
  stopTimer(shortBreakTimer);

  hide(shortBreakResetButton);
  hide(shortBreakStopButton);

  show(shortBreakStartButton);

  setTimerEl(shortBreakTimerEl, shortBreakSeconds);
}

function handleLongBreakReset() {
  stopTimer(longBreakTimer);

  hide(longBreakResetButton);
  hide(longBreakStopButton);

  show(longBreakStartButton);

  setTimerEl(longBreakTimerEl, longBreakSeconds);
}
