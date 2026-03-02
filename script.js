let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const music = document.getElementById("music");
const timerElement = document.getElementById("timer");
const naoBtn = document.getElementById("naoBtn");

document.getElementById("frase1").innerText = CONFIG.frases[0];
document.getElementById("frase2").innerText = CONFIG.frases[1];
document.getElementById("frase3").innerText = CONFIG.frases[2];
document.getElementById("mensagemFinal").innerText = CONFIG.mensagemFinal;

function startExperience() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  music.play();
  showSlide(0);
  startTimer();
  setInterval(nextSlide, 6000);
  startParticles();
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

function startTimer() {
  const startDate = new Date(CONFIG.dataPedido);

  setInterval(() => {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerElement.innerHTML = `
      ${days} dias<br>
      ${hours} horas<br>
      ${minutes} minutos<br>
      ${seconds} segundos ❤️
    `;
  }, 1000);
}

function explodeHearts() {
  document.getElementById("respostaFinal").innerText =
    "Você acabou de me fazer a pessoa mais feliz do mundo ❤️";

  for (let i = 0; i < 80; i++) {
    const heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.fontSize = "24px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

naoBtn.addEventListener("mouseover", () => {
  naoBtn.style.position = "absolute";
  naoBtn.style.left = Math.random() * 80 + "%";
  naoBtn.style.top = Math.random() * 80 + "%";
});

function startParticles() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speed: Math.random() * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animate);
  }

  animate();
}