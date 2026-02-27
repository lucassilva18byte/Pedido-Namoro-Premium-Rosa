let current = 1;

function startExperience(){
  // Mostrar container e primeiro slide
  document.getElementById("startScreen").classList.remove("active");
  document.getElementById("slidesContainer").classList.remove("hidden");
  current = 1;
  showSlide(current);

  // Música com fade-in
  let music = document.getElementById("music");
  music.volume = 0;
  music.play();
  let fade = setInterval(()=>{
    if(music.volume < 1){ music.volume += 0.02; } 
    else clearInterval(fade);
  },200);

  // Inicia temporizadores e partículas
  startTimers();
  spawnParticles();
}

function showSlide(n){
  document.querySelectorAll(".slide").forEach(s=>s.classList.remove("active"));
  const slide = document.getElementById("slide"+n);
  if(slide) slide.classList.add("active");

  // Efeito digitação
  const h = slide.querySelector("h1, h2");
  if(h && h.dataset.text) typeEffect(h, h.dataset.text);
}

function nextSlide(){
  current++;
  showSlide(current);
}

function typeEffect(el, text, speed=50){
  el.innerHTML="";
  let i=0;
  function typing(){
    if(i<text.length){
      el.innerHTML+=text.charAt(i);
      i++;
      setTimeout(typing,speed);
    }
  }
  typing();
}

// Fotos parallax
document.querySelectorAll(".photo").forEach(photo=>{
  photo.addEventListener("mousemove",(e)=>{
    let x=(e.offsetX/photo.clientWidth-0.5)*20;
    let y=(e.offsetY/photo.clientHeight-0.5)*20;
    photo.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  photo.addEventListener("mouseleave",()=>{photo.style.transform="rotateY(0) rotateX(0)";});
});

// Temporizadores
function startTimers(){
  const startDate=new Date("2026-02-27T21:00:00");
  setInterval(()=>{
    const now = new Date();
    let diff = now - startDate;
    let d=Math.floor(diff/(1000*60*60*24));
    diff%=1000*60*60*24;
    let h=Math.floor(diff/(1000*60*60));
    diff%=1000*60*60;
    let m=Math.floor(diff/(1000*60));
    let s=Math.floor(diff/1000%60);
    document.getElementById("timerTogether").innerText = `${d}d ${h}h ${m}m ${s}s juntos ❤️`;
    const elSlide = document.getElementById("timerTogetherSlide");
    if(elSlide) elSlide.innerText = `${d}d ${h}h ${m}m ${s}s juntos ❤️`;
  },1000);

  setInterval(()=>{
    const her = nextBirthday(6,19);
    const you = nextBirthday(2,18);
    function format(ms){
      let d=Math.floor(ms/(1000*60*60*24));
      ms%=1000*60*60*24;
      let h=Math.floor(ms/(1000*60*60));
      let m=Math.floor(ms/(1000*60)%60);
      let s=Math.floor(ms/1000%60);
      return `${d}d ${h}h ${m}m ${s}s`;
    }
    document.getElementById("timerHer").innerText="Aniversário dela: "+format(her);
    document.getElementById("timerYou").innerText="Seu aniversário: "+format(you);
  },1000);
}

function nextBirthday(month, day){
  let now = new Date();
  let year = now.getFullYear();
  let birthday = new Date(year, month-1, day);
  if(birthday<now) birthday.setFullYear(year+1);
  return birthday-now;
}

// Partículas suaves e corações
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];

function spawnParticles(){
  for(let i=0;i<80;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      size:2+Math.random()*2,
      speed:0.3+Math.random()*0.2,
      color:'rgba(255,182,193,0.5)'
    });
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
    p.y-=p.speed;
    if(p.y<0) p.y=canvas.height;
  });
  requestAnimationFrame(animate);
}
animate();

// Festa final
function celebrate(){
  document.body.style.background="linear-gradient(135deg,#0b1a3d,#330066)";
  alert("Essa é só a primeira página da nossa história ❤️");
}