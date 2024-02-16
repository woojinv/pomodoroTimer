# Pomodoro Timer

## TODO

- [x] link js and css files.

- [x] create start button.
- [x] Display time of 25 minutes.
- [x] countdown from 25.
- [x] display "stop" button when counting down.
- [x] stop timer on "stop" button click.
- [x] show "reset" button when timer reaches zero.
- [x] add reset button functionality
- [x] refactor to use common show/hide function
- [x] display work / rest header
- [x] display "resume" button if paused.
- [x] rename all generic Els to domain elements (startButton -> pomodoroStartButton)
- [ ] think of scenarios for when to autofocus which buttons.
- [ ] stop and reset other timers when starting a new timer so that multiple timers aren't counting down together.

## Functional Requirements

- When the Short Break button is clicked,

  - [x] the pomodoro timer should be replaced with the short break timer.

- When the "start" button is clicked,

  - [x] the timer should countdown to zero.
  - [x] The "start" button should switch to "stop".

- If the "reset" button is clicked while counting down,

  - [x] the timer should stop and reset to the previous interval length.
  - [x] the "stop" button should switch to "start".

- When the "stop" button is clicked,

  - [x] the timer should stop.
  - [x] the "stop" button should switch to "start".

- When the pomodoro period timer reaches "00:00",
  - [x] the "stop" button should switch to "reset".
  - [x] the short break timer should display with a time of "05:00".

## General notes

- have separate timers that are hidden and are toggled based on what interval is currently active.
