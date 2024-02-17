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

let pomodoroActive = false;
let shortBreakActive = false;
let longBreakActive = false;

let numPomodoros = 0;

// Get permission to send notifications.
document.addEventListener('DOMContentLoaded', function () {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Notifications enabled');
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
  pomodoroActive ? pomodoroStopButton.focus() : pomodoroStartButton.focus();
});

shortBreakNavButton.addEventListener('click', function () {
  hide(pomodoroContainer);
  hide(longBreakContainer);

  show(shortBreakContainer);
  shortBreakActive
    ? shortBreakStopButton.focus()
    : shortBreakStartButton.focus();
});

longBreakNavButton.addEventListener('click', function () {
  hide(pomodoroContainer);
  hide(shortBreakContainer);

  show(longBreakContainer);
  longBreakActive ? longBreakStopButton.focus() : longBreakStartButton.focus();
});

/*
 * Start Buttons
 */
pomodoroStartButton.addEventListener('click', function () {
  handleShortBreakReset();
  handleLongBreakReset();

  hide(pomodoroStartButton);

  show(pomodoroStopButton);
  pomodoroStopButton.focus();
  show(pomodoroResetButton);

  let totalSeconds = getTotalSeconds(pomodoroTimerEl);

  pomodoroTimer = setInterval(function () {
    pomodoroActive = true;
    totalSeconds -= 1;
    setTimerEl(pomodoroTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(pomodoroTimer);
      pomodoroActive = false;

      hide(longBreakContainer);

      hide(pomodoroContainer);
      hide(pomodoroStopButton);
      hide(pomodoroResetButton);

      setTimerEl(pomodoroTimerEl, pomodoroSeconds);

      show(pomodoroStartButton);

      numPomodoros += 1;

      if (numPomodoros !== 4) {
        show(shortBreakContainer);
        shortBreakStartButton.focus();
      } else {
        show(longBreakContainer);
        longBreakStartButton.focus();
      }

      notify();
    }
  }, 1000);
});

shortBreakStartButton.addEventListener('click', function () {
  handlePomdoroReset();
  handleLongBreakReset();

  hide(shortBreakStartButton);

  show(shortBreakStopButton);
  shortBreakStopButton.focus();
  show(shortBreakResetButton);

  let totalSeconds = getTotalSeconds(shortBreakTimerEl);

  shortBreakTimer = setInterval(function () {
    shortBreakActive = true;
    totalSeconds -= 1;
    setTimerEl(shortBreakTimerEl, totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(shortBreakTimer);
      shortBreakActive = false;

      hide(longBreakContainer);

      hide(shortBreakContainer);
      hide(shortBreakStopButton);
      hide(shortBreakResetButton);

      setTimerEl(shortBreakTimerEl, shortBreakSeconds);

      show(shortBreakStartButton);

      show(pomodoroContainer);
      pomodoroStartButton.focus();

      notify();
    }
  }, 1000);
});

longBreakStartButton.addEventListener('click', function () {
  handlePomdoroReset();
  handleShortBreakReset();

  hide(longBreakStartButton);

  show(longBreakStopButton);
  longBreakStopButton.focus();
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
      pomodoroStartButton.focus();

      notify();
    }
  }, 1000);
});

/*
 * Stop Buttons
 */
pomodoroStopButton.addEventListener('click', function () {
  hide(pomodoroStopButton);
  show(pomodoroStartButton);
  pomodoroStartButton.focus();
  stopTimer(pomodoroTimer);
  pomodoroActive = false;
});

shortBreakStopButton.addEventListener('click', function () {
  hide(shortBreakStopButton);
  show(shortBreakStartButton);
  shortBreakStartButton.focus();
  stopTimer(shortBreakTimer);
  shortBreakActive = false;
});

longBreakStopButton.addEventListener('click', function () {
  hide(longBreakStopButton);
  show(longBreakStartButton);
  longBreakStartButton.focus();
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

function handlePomdoroReset() {
  stopTimer(pomodoroTimer);
  pomodoroActive = false;

  hide(pomodoroResetButton);
  hide(pomodoroStopButton);

  show(pomodoroStartButton);
  pomodoroStartButton.focus();

  setTimerEl(pomodoroTimerEl, pomodoroSeconds);
}

function handleShortBreakReset() {
  stopTimer(shortBreakTimer);
  shortBreakActive = false;

  hide(shortBreakResetButton);
  hide(shortBreakStopButton);

  show(shortBreakStartButton);
  shortBreakStartButton.focus();

  setTimerEl(shortBreakTimerEl, shortBreakSeconds);
}

function handleLongBreakReset() {
  stopTimer(longBreakTimer);

  hide(longBreakResetButton);
  hide(longBreakStopButton);

  show(longBreakStartButton);
  longBreakStartButton.focus();

  setTimerEl(longBreakTimerEl, longBreakSeconds);
}

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

function notify() {
  if (Notification.permission === 'granted') {
    new Notification("Time's up!").addEventListener('click', function () {
      window.focus();
      this.close();
    });
  }

  new Audio('./notification-sounds/short-break-end.mp3').play();
}
