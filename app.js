const startBtn = document.querySelector(".btn_start");
const winnerRgb = document.querySelector(".btn_rgb");
const yourResult = document.querySelector(".btn_result");
const allCards = document.querySelectorAll(".cards");
const modeE = document.querySelector("#modee");
const modeH = document.querySelector("#modeh");
const body = document.getElementsByName("body")
let colors;
let luckyColor;
let isGameFinished = false;
const esayMode = true;

function generateRandmoNumber(start = 0, end = 256) {
  return Math.round(Math.random() * (end - start) + start);
}
function generateRandmoColor() {
  return `rgb(${generateRandmoNumber()}, ${generateRandmoNumber()}, ${generateRandmoNumber()})`;
}
function getRandomColorsList(number) {
  let colorsList = [];
  for (let i = 0; i < number; i++) {
    colorsList.push(generateRandmoColor());
  }
  return colorsList;
}

function setColorsAllCards(colorsList) {
  allCards.forEach((card, index) => {
    card.style.backgroundColor = colorsList[index];
  });
}

function getLuckyColor(colorsList) {
  return colorsList[generateRandmoNumber(0, colorsList.length - 1)];
}
function startGame() {
  yourResult.innerHTML = "waiting you're card";
  yourResult.style.backgroundColor = "yellow";
}

startBtn.addEventListener("click", () => {
  colors = getRandomColorsList(3);
  luckyColor = getLuckyColor(colors);
  setColorsAllCards(colors);
  winnerRgb.textContent = luckyColor;
  isGameFinished = false;
  startGame();
});

modeH.style.display = "none";

function turnOnHardMode() {
  modeE.addEventListener("click", () => {
    modeE.style.display = "none";
    modeH.style.display = "block";
    const level = document.querySelectorAll(".card4");
    level.forEach((card) => {
      if (card.classList.contains("hard")) {
        card.classList.remove("hard");
        modeE.innerHTML = "Easy mode";
        startHardGame();
      }
    });
  });
}

function turnOnEasyMode() {
  modeH.addEventListener("click", () => {
    modeH.style.display = "none";
    modeE.style.display = "block";
    const level = document.querySelectorAll(".card4");

    level.forEach((card) => {
      if (!card.classList.contains("hard")) {
        card.classList.add("hard");
        modeH.innerHTML = "Hard mode";

        startHardGame();
      }
    });
  });
}
function startHardGame() {
  startBtn.addEventListener("click", () => {
    colors = getRandomColorsList(6);
    luckyColor = getLuckyColor(colors);
    setColorsAllCards(colors);
    winnerRgb.textContent = luckyColor;
    isGameFinished = false;
    startGame();
  });
}

turnOnHardMode();
turnOnEasyMode();

allCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!isGameFinished) {
      if (e.target.style.backgroundColor === luckyColor) {
        yourResult.textContent = "You are right";
        yourResult.style.backgroundColor = "green";
      } else {
        yourResult.textContent = "you're wrong";
        yourResult.style.backgroundColor = "red"; 
        
        
      }
      
    }
    isGameFinished = true;
  });
});
