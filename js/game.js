// ---- GAME STATE ----
let level = 1;              // difficulty level, starts at 1
let cardCount = 6;          // pairs will be cardCount/2, starts easy
let flippedCards = [];
let matchedCount = 0;
let mismatches = 0;
let score = 0;
let timerInterval = null;
let matchCheckTimeout = null;
let secondsElapsed = 0;
let roundActive = false;

// Cultural card set — swap these emoji for real NER images later (assets/ folder)
// e.g. tea leaf, mekhela chador pattern, bamboo, local fruit, musical instrument (pepa/gogona)
const CARD_ICONS = ["🍵", "🎋", "🥭", "🪈", "🐘", "🌾", "🏵️", "🪘", "🦚", "🌸"];

const boardEl = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const mismatchesEl = document.getElementById("mismatches");
const timerEl = document.getElementById("timer");
const difficultyEl = document.getElementById("difficulty");
const messageEl = document.getElementById("round-message");
const restartBtn = document.getElementById("restart-btn");
const progressFillEl = document.getElementById("progress-fill");

restartBtn.addEventListener("click", startRound);

function startRound() {
  clearTimeout(matchCheckTimeout);
  boardEl.innerHTML = "";
  flippedCards = [];
  matchedCount = 0;
  mismatches = 0;
  score = 0;
  secondsElapsed = 0;
  roundActive = true;
  timerEl.textContent = "0s";
  messageEl.textContent = "";
  progressFillEl.style.width = "0%";

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = `${secondsElapsed}s`;
  }, 1000);

  const pairsNeeded = cardCount / 2;
  const icons = CARD_ICONS.slice(0, pairsNeeded);
  let deck = [...icons, ...icons];
  deck = shuffle(deck);

  const columns = Math.ceil(Math.sqrt(cardCount));
  boardEl.style.gridTemplateColumns = `repeat(${columns}, 80px)`;

  deck.forEach((icon, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.textContent = "❓";
    card.addEventListener("click", () => handleCardClick(card));
    boardEl.appendChild(card);
  });

  updateStatsDisplay();
}

function handleCardClick(card) {
  if (!roundActive) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
  if (flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    matchCheckTimeout = setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  matchCheckTimeout = null;
  const [c1, c2] = flippedCards;

  if (c1.dataset.icon === c2.dataset.icon) {
    c1.classList.add("matched");
    c2.classList.add("matched");
    matchedCount += 2;
    score += 10;
  } else {
    c1.classList.remove("flipped");
    c2.classList.remove("flipped");
    c1.textContent = "❓";
    c2.textContent = "❓";
    mismatches++;
  }

  flippedCards = [];
  updateStatsDisplay();

  progressFillEl.style.width = `${(matchedCount / cardCount) * 100}%`;

  if (matchedCount === cardCount) {
    endRound();
  }
}

function endRound() {
  roundActive = false;
  clearInterval(timerInterval);

  let difficultyChange = "same";

  if (mismatches >= 3) {
    cardCount = Math.max(4, cardCount - 2);
    level = Math.max(1, level - 1);
    difficultyChange = "easier";
    messageEl.textContent = "Nice try! Making the next round a bit easier.";
  } else if (mismatches <= 1 && secondsElapsed < 30) {
    cardCount = Math.min(16, cardCount + 2);
    level += 1;
    difficultyChange = "harder";
    messageEl.textContent = "Great job! Increasing the challenge.";
  } else {
    messageEl.textContent = "Well played! Keep going.";
  }

  difficultyEl.textContent = `Level ${level}`;

  const sessionData = {
  patientId: "6a9efd1ec11932545373be65",
  gameName: "Memory Match",
  score: score,
  duration: secondsElapsed,
  completed: true
};

logSession(sessionData);

  setTimeout(startRound, 2000);
}

function updateStatsDisplay() {
  scoreEl.textContent = score;
  mismatchesEl.textContent = mismatches;
  difficultyEl.textContent = `Level ${level}`;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

startRound();