const startButtonEl = document.getElementById("start");

startButtonEl.addEventListener("click", function () {
  const time = document.getElementById("timer").innerHTML;
  const timeValues = time.split(":");
  const minutes = Number(timeValues[0]);
  const seconds = Number(timeValues[1]);
  let totalSeconds = minutes * 60 + seconds;

  let x = setInterval(function () {
    totalSeconds -= 1;

    const newMinutes = Math.floor(totalSeconds / 60);
    const formattedMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;
    const newSeconds = totalSeconds % 60;
    const formattedSeconds = newSeconds < 10 ? "0" + newSeconds : newSeconds;
    document.getElementById(
      "timer"
    ).innerHTML = `${formattedMinutes}:${formattedSeconds}`;

    if (totalSeconds === 0) {
      clearInterval(x);
    }
  }, 1000);
});
