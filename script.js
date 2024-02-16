const pomodoroSeconds = 5;
const shortBreakSeconds = 300;

// Navigation buttons
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');

// Views
const pomodoroContainer = document.getElementById('pomodoroContainer');
const shortBreakContainer = document.getElementById('shortBreakContainer');

// Timers
const pomodoroTimerEl = document.getElementById('pomodoroTimer');

// Timer buttons
const startButtonEl = document.getElementById('pomodoroStartButton');
const stopButtonEl = document.getElementById('pomodoroStopButton');
const resetButtonEl = document.getElementById('pomodoroResetButton');

let pomodoroTimer;

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

  let totalSeconds = getTotalSeconds(pomodoroTimerEl);

  pomodoroTimer = setInterval(function () {
    totalSeconds -= 1;
    pomodoroTimerEl.innerHTML = timeFormatter(totalSeconds);

    if (totalSeconds === 0) {
      stopTimer(pomodoroTimer);
      hide(stopButtonEl);

      hide(pomodoroContainer);

      show(shortBreakContainer);

      // reset pomodoro timer
      pomodoroTimerEl.innerHTML = timeFormatter(pomodoroSeconds);
      show(startButtonEl);
      hide(resetButtonEl);
    }
  }, 1000);
});

stopButtonEl.addEventListener('click', function () {
  hide(stopButtonEl);
  show(startButtonEl);
  stopTimer(pomodoroTimer);
});

resetButtonEl.addEventListener('click', function () {
  stopTimer(pomodoroTimer);
  hide(stopButtonEl);
  show(startButtonEl);
  // reset displayed time.
  pomodoroTimerEl.innerHTML = timeFormatter(pomodoroSeconds);
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
