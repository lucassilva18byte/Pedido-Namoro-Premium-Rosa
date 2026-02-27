let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const music = document.getElementById("music");
const timerElement = document.getElementById("timer");

function startExperience() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  music.play();
  showSlide(0);
  startTimer();
  setInterval(nextSlide, 6000);
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide++;
  if (currentSlide < slides.length) {
    showSlide(currentSlide);
  }
}

function startTimer() {
  const startDate = new Date("2024-03-01T00:00:00");

  setInterval(() => {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    timerElement.innerText = `Estamos vivendo essa história há ${days} dias ❤️`;
  }, 1000);
}

function explodeHearts() {
  const canvas = document.getElementById("heartsCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "pink";
    ctx.font = "20px Arial";
    ctx.fillText("❤️", x, y);
  }
}