const introText = [
  "> Ngọc",
  "> today is your birthday",
  "> So I made you this little program"
];

const introEl = document.getElementById("intro");
const cakePage = document.querySelector(".cake-page");
const miniGame = document.querySelector(".mini-game");
const miniCakesContainer = document.querySelector(".mini-cakes");
const finalMessage = document.querySelector(".final-message");
const finalTextEl = document.getElementById("finalText");
const confettiContainer = document.querySelector(".confetti-container");

let introIndex = 0;

function typeIntroLine(line, callback) {
  introEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < line.length) {
      introEl.innerHTML += line[i];
      i++;
      setTimeout(typing, 80);
    } else {
      // Add animated dots
      const dots = document.createElement("span");
      dots.classList.add("dots");
      dots.innerText = " ...";
      introEl.appendChild(dots);

      setTimeout(() => {
        callback();
      }, 800);
    }
  }

  typing();
}

function nextIntroLine() {
  if (introIndex < introText.length) {
    typeIntroLine(introText[introIndex], () => {
      introIndex++;
      nextIntroLine();
    });
  } else {
    // End of intro, show cake page
    introEl.classList.add("hidden");
    cakePage.classList.remove("hidden");
    triggerConfetti(50);
    setTimeout(showMiniGame, 2000);
  }
}

function triggerConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createConfetti, i * 50);
  }
}

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * 100 + "%";
  confetti.style.backgroundColor = ['#fff', '#ffe4e1', '#ff69b4', '#ff1493'][Math.floor(Math.random()*4)];
  confettiContainer.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}

function showMiniGame() {
  cakePage.classList.add("hidden");
  miniGame.classList.remove("hidden");

  // create 12 small cakes
  for (let i = 0; i < 12; i++) {
    const cake = document.createElement("div");
    cake.classList.add("cake");
    miniCakesContainer.appendChild(cake);

    cake.addEventListener("click", () => {
      alert("Good gurl 💖");
      checkMiniGameCompletion();
    });
  }
}

function checkMiniGameCompletion() {
  if (document.querySelectorAll(".mini-cakes .cake").length === 0) {
    showFinalMessage();
  }
}

miniCakesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cake")) {
    e.target.remove();
  }
  if (miniCakesContainer.childElementCount === 0) {
    showFinalMessage();
  }
});

function showFinalMessage() {
  miniGame.classList.add("hidden");
  finalMessage.classList.remove("hidden");
  const message = `Happy Birthday, Ngọc! 💖
I made this with love for you 🫶✨
I hope today brings you lots of smiles and everything you enjoy 🍿
Can’t wait to hang out and have our little movie break together 💖
Wishing you a day as amazing as you are 🎉

— Hajar`;

  typeFinalMessage(message, finalTextEl, 0);
}

function typeFinalMessage(text, element, index) {
  if (index < text.length) {
    element.innerHTML += text[index] === "\n" ? "<br>" : text[index];
    setTimeout(() => typeFinalMessage(text, element, index + 1), 50);
  }
}

// Start intro typing
nextIntroLine();
