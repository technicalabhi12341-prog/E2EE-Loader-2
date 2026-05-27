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