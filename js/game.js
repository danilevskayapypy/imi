const arena = document.querySelector('#arena');
const target = document.querySelector('#target');
const startButton = document.querySelector('#start');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const bestElement = document.querySelector('#best');
const message = document.querySelector('#message');

let score = 0;
let timeLeft = 30;
let timerId = null;
let isPlaying = false;

let best = Number(localStorage.getItem('starCatchBest') || 0);
bestElement.textContent = best;

function moveTarget() {
  const maxX = arena.clientWidth - target.offsetWidth - 12;
  const maxY = arena.clientHeight - target.offsetHeight - 12;
  target.style.left = `${12 + Math.random() * Math.max(0, maxX - 12)}px`;
  target.style.top = `${12 + Math.random() * Math.max(0, maxY - 12)}px`;
}

function finishGame() {
  isPlaying = false;
  clearInterval(timerId);
  target.hidden = true;
  message.textContent = `Время вышло! Твой результат: ${score} ⭐`;
  message.hidden = false;
  startButton.textContent = 'Играть ещё';
  if (score > best) {
    best = score;
    localStorage.setItem('starCatchBest', String(best));
    bestElement.textContent = best;
  }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  isPlaying = true;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  message.hidden = true;
  target.hidden = false;
  startButton.textContent = 'Игра идёт…';
  moveTarget();

  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft -= 1;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) finishGame();
  }, 1000);
}

target.addEventListener('click', () => {
  if (!isPlaying) return;
  score += 1;
  scoreElement.textContent = score;
  moveTarget();
});

startButton.addEventListener('click', () => {
  if (!isPlaying) startGame();
});

window.addEventListener('resize', () => {
  if (isPlaying) moveTarget();
});
