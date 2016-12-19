let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endtime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);

  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const secondsLeft = seconds % 60;
  const minutesLeft = Math.floor(seconds / 60);
  const display = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = formatTime(timestamp);
  endtime.textContent = end;
}

function formatTime(timestamp) {
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const formattedTime = `${hours > 12 ? (hours - 12) : hours}:${minutes < 10 ? '0' : ''}${minutes}`
  return formattedTime;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});
