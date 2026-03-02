let currentSlide = 0;
let podeAvancar = false;

const slides = document.querySelectorAll(".slide");
const music = document.getElementById("music");
const timerElement = document.getElementById("timer");
const naoBtn = document.getElementById("naoBtn");

document.getElementById("mensagemFinal").innerText = CONFIG.mensagemFinal;

function startExperience() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  music.play();
  startParticles();
  iniciarSlide(0);
}

function iniciarSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
  podeAvancar = false;

  if (slides[index].querySelector(".typewriter")) {
    const texto = CONFIG.frases[index];
    efeitoEscrita(slides[index].querySelector(".typewriter"), texto);
  } else if (slides[index].querySelector("#timer")) {
    iniciarTimer();
    podeAvancar = true;
  } else {
    podeAvancar = true;
  }
}

function efeitoEscrita(elemento, texto) {
  elemento.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      podeAvancar = true;
    }
  }, 40);
}

document.addEventListener("click", () => {
  if (!podeAvancar) return;
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    iniciarSlide(currentSlide);
  }
});

function iniciarTimer() {
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

function aceitou() {
  document.body.style.background =
    "linear-gradient(to bottom, #14143b, #1c1c52, #2a2a72)";
  document.getElementById("respostaFinal").innerText =
    "Agora começa oficialmente o nosso para sempre ❤️";
}

naoBtn.addEventListener("mouseover", () => {
  naoBtn.style.left = Math.random() * 70 + "%";
  naoBtn.style.top = Math.random() * 70 + "%";
});

function startParticles() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speed: Math.random() * 0.5,
      heart: Math.random() > 0.7
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      if (p.heart) {
        ctx.font = "14px Arial";
        ctx.fillText("❤️", p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      p.y -= p.speed;
      if (p.y < 0) p.y = canvas.height;
    });

    requestAnimationFrame(animate);
  }

  animate();
}