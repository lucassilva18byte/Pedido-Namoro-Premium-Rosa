// Efeito digitação
function typeEffect(element,text,speed=50){
  let i=0;
  function typing(){
    if(i<text.length){
      element.innerHTML+=text.charAt(i);
      i++;
      setTimeout(typing,speed);
    }
  }
  typing();
}
typeEffect(document.getElementById("typing"),"Tudo começou no dia em que eu escolhi você...");
typeEffect(document.getElementById("typing2"),"Se eu pudesse voltar no tempo, escolheria você novamente.");

// Slides
let current=1;
function nextSlide(){
  document.getElementById("slide"+current).classList.remove("active");
  current++;
  document.getElementById("slide"+current).classList.add("active");
}

// Foto parallax
document.querySelectorAll(".photo").forEach(photo=>{
  photo.addEventListener("mousemove",(e)=>{
    let x=(e.offsetX/photo.clientWidth-0.5)*20;
    let y=(e.offsetY/photo.clientHeight-0.5)*20;
    photo.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  photo.addEventListener("mouseleave",()=>{photo.style.transform="rotateY(0) rotateX(0)";});
});

// Mensagem secreta
function secretMessage(img){
  document.getElementById("secret").innerText="Foi aqui que eu percebi que era você ❤️";
}

// Temporizador tempo juntos
const startDate=new Date("2026-02-27T21:00:00");
setInterval(()=>{
  const now=new Date();
  let diff=now-startDate;
  let d=Math.floor(diff/(1000*60*60*24));
  diff%=1000*60*60*24;
  let h=Math.floor(diff/(1000*60*60));
  diff%=1000*60*60;
  let m=Math.floor(diff/(1000*60));
  let s=Math.floor(diff/1000%60);
  document.getElementById("timerTogether").innerText=`${d} dias ${h}h ${m}m ${s}s juntos ❤️`;
},1000);

// Temporizadores aniversários
function nextBirthday(month,day){
  let now=new Date();
  let year=now.getFullYear();
  let birthday=new Date(year,month-1,day);
  if(birthday<now) birthday.setFullYear(year+1);
  return birthday-now;
}
setInterval(()=>{
  let her=nextBirthday(6,19);
  let you=nextBirthday(2,18);
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

// Mini jogo 1
let score=0;
function startGame(){
  score=0;
  document.getElementById("score").innerText="0 / 5";
  for(let i=0;i<10;i++){
    let heart=document.createElement("div");
    heart.className="heart";
    heart.innerText="❤️";
    heart.style.left=Math.random()*100+"vw";
    heart.onclick=function(){
      score++;
      heart.remove();
      document.getElementById("score").innerText=score+" / 5";
      if(score>=5) nextSlide();
    }
    document.body.appendChild(heart);
  }
}

// Mini jogo 2
let correct=[3,1,2];
let attempt=[];
function sequence(n){
  attempt.push(n);
  if(attempt.length===3){
    if(JSON.stringify(attempt)===JSON.stringify(correct)){
      document.getElementById("sequenceResult").innerText="Perfeito ❤️";
      setTimeout(nextSlide,1500);
    }else{
      document.getElementById("sequenceResult").innerText="Tente novamente";
      attempt=[];
    }
  }
}

// Festa final
function celebrate(){
  document.body.style.background="linear-gradient(135deg,#3a005f,#ff00cc)";
  alert("Essa é só a primeira página da nossa história ❤️");
}

// Partículas suaves
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];
for(let i=0;i<80;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:2,speed:0.5});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(255,215,0,0.5)";
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.y-=p.speed;
    if(p.y<0) p.y=canvas.height;
  });
  requestAnimationFrame(animate);
}
animate();

// Música fade in
window.onload=()=>{
  let music=document.getElementById("music");
  music.volume=0;
  music.play();
  let fade=setInterval(()=>{
    if(music.volume<1){music.volume+=0.02;}else clearInterval(fade);
  },200);
};