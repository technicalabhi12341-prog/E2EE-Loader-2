document.addEventListener(
"DOMContentLoaded",
()=>{

function updatePremiumClock(){

const clock =
document.getElementById(
"premiumClock"
);

if(clock){

const now = new Date();

clock.innerHTML =
now.toLocaleTimeString();

}

}

setInterval(
updatePremiumClock,
1000
);

updatePremiumClock();

/* ================= LIGHT EFFECT ================= */

const light=document.getElementById("light");

document.addEventListener("mousemove",e=>{

light.style.transform=
`translate(${e.clientX-175}px,
${e.clientY-175}px)`;

});

/* ================= SPARKLES ================= */

const sparkles=document.getElementById("sparkles");

for(let i=0;i<90;i++){

let s=document.createElement("span");

s.style.left=Math.random()*100+"%";

s.style.top=Math.random()*100+"%";

s.style.animationDuration=
(5+Math.random()*10)+"s";

s.style.opacity=Math.random();

sparkles.appendChild(s);

}

/* ================= MUSIC VISUALIZER TOGGLE ================= */

const visualizer =
document.getElementById("musicVisualizer");

const musicBtn =
document.getElementById("musicBtn");

const bgMusic =
document.getElementById("bgMusic");

if(musicBtn && bgMusic){

bgMusic.volume = 1;

musicBtn.addEventListener(
"click",
async ()=>{

try{

if(bgMusic.paused){

await bgMusic.play();

bgMusic.muted = false;

visualizer.style.opacity = "1";

musicBtn.innerHTML = "⏸";

console.log("Music Playing");

}else{

bgMusic.pause();

visualizer.style.opacity = ".3";

musicBtn.innerHTML = "🎵";

console.log("Music Paused");

}

}catch(e){

console.log(
"Music Error:",
e
);

}

}

);

}

/* ================= PREMIUM TOAST AUTO HIDE ================= */

setTimeout(()=>{

const toast =
document.getElementById(
"premiumToast"
);

if(toast){

toast.style.display = "none";

}

},5000);

});

