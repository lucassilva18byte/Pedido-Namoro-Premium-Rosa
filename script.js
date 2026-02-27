const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const music = document.getElementById("music");
const timerEl = document.getElementById("timer");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Inicial balões e corações
let particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: 20+Math.random()*30,
    speed: 0.5+Math.random()*1.5,
    char: Math.random()<0.5?'❤️':'🎈'
  });
}

function startExperience(){
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  music.play();
  showSlide(0);
  startTimer();
  setInterval(nextSlide, 6000);
  animate();
}

// Temporizador
function startTimer(){
  const startDate = new Date("2024-03-01T00:00:00");
  setInterval(()=>{
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000*60*60*24));
    timerEl.innerText = `Estamos vivendo essa história há ${days} dias ❤️`;
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

// Animação de balões e corações
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.font = p.size+'px Arial';
    ctx.fillText(p.char,p.x,p.y);
    p.y -= p.speed;
    if(p.y < -50) p.y = canvas.height + 50;
    p.x += Math.sin(p.y*0.01); // leve balanço
  });
  requestAnimationFrame(animate);
}

// Festa final
function celebrate(){
  // adiciona muitos corações e confetes
  for(let i=0;i<200;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: 20+Math.random()*40,
      speed: -2-Math.random()*3,
      char: ['❤️','🎉','✨','🎈'][Math.floor(Math.random()*4)]
    });
  }
  showSlide(slides.length-1);
}