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
- [ ] display work / rest header
- [ ] display "resume" button if paused.

## Functional Requirements

- When the "start" button is clicked,

  - [x] the timer should countdown to zero.
  - [x] The "start" button should switch to "stop".

- If the "reset" button is clicked while counting down,

  - [x] the timer should stop and reset to the previous interval length.
  - [x] the "stop" button should switch to "start".

- When the "stop" button is clicked,

  - [x] the timer should stop.
  - [x] the "stop" button should switch to "start".

- When the timer reaches "00:00",
  - [x] the "stop" button should switch to "reset".
  - [ ] the rest timer should display with a time of "05:00".
