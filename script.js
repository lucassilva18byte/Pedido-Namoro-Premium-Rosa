const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const music = document.getElementById("music");
const timerEl = document.getElementById("timer");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Partículas cinematográficas
let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: 2+Math.random()*4,
    speed: 0.2+Math.random()*0.5,
    char: Math.random()<0.2?'❤️':'•'
  });
}

// Fade-in música
function fadeInAudio(audio, duration=2000){
  audio.volume = 0;
  audio.play();
  let step = 0.02;
  let interval = setInterval(()=>{
    if(audio.volume < 1){
      audio.volume = Math.min(audio.volume + step,1);
    } else clearInterval(interval);
  }, duration*step);
}

// Iniciar experiência
function startExperience(){
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  fadeInAudio(music);
  showSlide(0);
  startTimer();
  setInterval(nextSlide, 7000);
  animate();
}

// Temporizador completo
function startTimer(){
  const startDate = new Date("2024-03-01T00:00:00");
  setInterval(()=>{
    const now = new Date();
    let diff = now - startDate;
    const days = Math.floor(diff / (1000*60*60*24));
    diff %= (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff %= (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    const secs = Math.floor(diff / 1000 % 60);
    timerEl.innerText = `Vivendo nossa história há ${days}d ${hours}h ${mins}m ${secs}s ❤️`;
  },1000);
}

// Slides
function showSlide(index){
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
}
function nextSlide(){
  currentSlide++;
  if(currentSlide < slides.length) showSlide(currentSlide);
}

// Animação partículas discretas
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.font = p.size+'px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(p.char,p.x,p.y);
    p.y -= p.speed;
    if(p.y < -10) p.y = canvas.height + 10;
    p.x += Math.sin(p.y*0.01);
  });
  requestAnimationFrame(animate);
}

// Festa cinematográfica
function celebrate(){
  // Explosão partículas
  for(let i=0;i<200;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: 5+Math.random()*10,
      speed: -1- Math.random()*3,
      char: ['❤️','✨','•'][Math.floor(Math.random()*3)]
    });
  }
  showSlide(slides.length-1);
}