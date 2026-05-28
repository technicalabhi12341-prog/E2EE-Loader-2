document.addEventListener(
"DOMContentLoaded",
() => {

chrome.runtime.sendMessage({
    action: "playMusic"
});

});

document.addEventListener("DOMContentLoaded", () => {
chrome.storage.local.get(
    ["senderRunning"],
    (data) => {

        if (data.senderRunning) {

            premiumToast(
                "🟢 Previous Session Restored"
            );

            console.log(
                "Sender Was Running"
            );

            console.log(
                "Auto Recovery Ready"
            );

        }

    }
);

/* ===================================== */
/* PREMIUM APPROVAL SYSTEM */
/* ===================================== */

async function premiumLoadKeys() {

    try {

        const response = await fetch(
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-2/keys.json?t=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {

            console.log("Fetch Failed");

            return {};

        }

        const keys = await response.json();

        console.log("Loaded Keys:", keys);

        return keys;

    } catch (e) {

        console.log("Keys Load Error:", e);

        return {};

    }

}
/* ===================================== */
/* WHATSAPP REQUEST */
/* ===================================== */

function premiumRequestAccess() {

    window.open(
        "https://alvo.chat/7G6L"
    );

} 

/* ===================================== */
/* EXPIRY CHECK */
/* ===================================== */

function isExpired(expiryDate) {

    const now = new Date();

    const expiry = new Date(expiryDate);

    return now > expiry;

}

/* ===================================== */
/* VERIFY SYSTEM */
/* ===================================== */

async function premiumVerify() {

    try {

        const keys = await premiumLoadKeys();

        const savedKey = localStorage.getItem(
            "premium_approval_key"
        );

        /* AUTO LOGIN */

        if (savedKey && keys[savedKey]) {

            if (isExpired(keys[savedKey].expiry)) {

                localStorage.removeItem(
                    "premium_approval_key"
                );

                const status =
                    document.getElementById(
                        "premiumStatus"
                    );

                if (status) {

                    status.innerText =
                        "Key Expired";

                }

            } else {

                const overlay =
                    document.getElementById(
                        "adminApprovalOverlay"
                    );

                if (overlay) {

                    overlay.style.display =
                        "none";

                }

            }

        }

        /* APPROVE BUTTON */

        const approveBtn =
            document.getElementById(
                "premiumApproveBtn"
            );

        if (approveBtn) {

            approveBtn.addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            "premiumKeyInput"
                        );

                    const status =
                        document.getElementById(
                            "premiumStatus"
                        );

                    if (!input) return;

                    const enteredKey =
                        input.value.trim();

                    if (
keys[enteredKey] &&
typeof keys[enteredKey] === "object"
) {
                        if (
                            isExpired(
                                keys[enteredKey].expiry
                            )
                        ) {

                            if (status) {

                                status.innerText =
                                    "Key Expired";

                            }

                            return;

                        }

                        localStorage.setItem(
                            "premium_approval_key",
                            enteredKey
                        );

                        const overlay =
                            document.getElementById(
                                "adminApprovalOverlay"
                            );

                        if (overlay) {

                            overlay.style.display =
                                "none";

                        }

                    } else {

                        if (status) {

                            status.innerText =
                                "Invalid Approval Key";

                        }

                    }

                }
            );

        }

        /* REQUEST BUTTON */

        const requestBtn =
            document.getElementById(
                "premiumRequestBtn"
            );

        if (requestBtn) {

            requestBtn.addEventListener(
                "click",
                () => {

                    premiumRequestAccess();

                }
            );

        }

    } catch (error) {

        console.log(
            "Approval System Error:",
            error
        );

    }

}

/* ===================================== */
/* START VERIFY */
/* ===================================== */

setTimeout(
    premiumVerify,
    300
);

/* ===================================== */
/* SEND BUTTON */
/* ===================================== */

const sendBtn =
    document.getElementById('sendBtn');

if (sendBtn) {

    sendBtn.addEventListener(
        'click',

        function () {
        	chrome.storage.local.set({
    senderRunning: true,
    lastStart: Date.now()
});

            const messages =
                document
                .getElementById(
                    'messageText'
                )
                .value
                .trim()
                .split("\n")
                .filter(
                    msg => msg.trim() !== ""
                );
                
                if (messages.length === 0) {

    premiumToast(
        "⚠️ Enter Message First"
    );

    return;

}

            const speed =
    parseInt(
        document
        .getElementById(
            'speed'
        ).value,
        10
    ) * 1000;

if (speed < 1000) {

    premiumToast(
        "⚠️ Minimum Speed 1 Second"
    );

    return;

} 
            const haterName =
                document
                .getElementById(
                    'HatersName'
                )
                .value
                .trim();

            chrome.tabs.query(

                {
                    active: true,
                    currentWindow: true
                },

                function (tabs) {

                    if (!tabs[0]) return;
                    
                    chrome.scripting.executeScript({
    target: {
        tabId: tabs[0].id
    },
    files: ["content_script.js"]
});

                    chrome.tabs.sendMessage(

    tabs[0].id,

    {
        messages: messages,
        speed: speed,
        haterName: haterName
    }

);     

                }

            );

        }

    );

}

/* ===================================== */
/* STOP BUTTON */
/* ===================================== */

const stopBtn =
    document.getElementById('stopBtn');

if (stopBtn) {

    stopBtn.addEventListener(
        'click',

        function () {
        	chrome.storage.local.set({
    senderRunning: false
});

            chrome.tabs.query(

                {
                    active: true,
                    currentWindow: true
                },

                function (tabs) {

                    if (!tabs[0]) return;

                    chrome.tabs.sendMessage(

                        tabs[0].id,

                        {
                            stop: true
                        }

                    );

                });

        });

}

/* ===================================== */
/* LIGHT EFFECT */
/* ===================================== */

const light =
    document.getElementById("light");

if (light) {

    document.addEventListener(
        "mousemove",
        e => {

            light.style.transform =
            `translate(${e.clientX - 175}px,
            ${e.clientY - 175}px)`;

        }
    );

}

/* ===================================== */
/* SPARKLES */
/* ===================================== */

const sparkles =
    document.getElementById("sparkles");

if (sparkles) {

    for(let i = 0; i < 90; i++) {

        let s =
            document.createElement("span");

        s.style.left =
            Math.random() * 100 + "%";

        s.style.top =
            Math.random() * 100 + "%";

        s.style.animationDuration =
            (5 + Math.random() * 10) + "s";

        s.style.opacity =
            Math.random();

        sparkles.appendChild(s);

    }

}

/* ===================================== */
/* PREMIUM AUTO SAVE SYSTEM */
/* ===================================== */

const nameInput =
document.getElementById(
"HatersName"
);

const msgInput =
document.getElementById(
"messageText"
);

const speedInput =
document.getElementById(
"speed"
);

if(nameInput){

nameInput.value =
localStorage.getItem(
"premium_name"
) || "";

nameInput.addEventListener(
"input",
()=>{

localStorage.setItem(
"premium_name",
nameInput.value
);

}
);

}

if(msgInput){

msgInput.value =
localStorage.getItem(
"premium_message"
) || "";

msgInput.addEventListener(
"input",
()=>{

localStorage.setItem(
"premium_message",
msgInput.value
);

}
);

}

if(speedInput){

speedInput.value =
localStorage.getItem(
"premium_speed"
) || "1";

speedInput.addEventListener(
"input",
()=>{

localStorage.setItem(
"premium_speed",
speedInput.value
);

}
);

}

/* ===================================== */
/* PREMIUM TOAST NOTIFICATION */
/* ===================================== */

const toastStyle =
document.createElement("style");

toastStyle.innerHTML = `

@keyframes fadeToast{

from{

opacity:0;
transform:
translateX(-50%)
translateY(20px);

}

to{

opacity:1;
transform:
translateX(-50%)
translateY(0);

}

}

`;

document.head.appendChild(
toastStyle
);

function premiumToast(message){

const toast =
document.createElement("div");

toast.innerText = message;

toast.style.position = "fixed";

toast.style.bottom = "20px";

toast.style.left = "50%";

toast.style.transform =
"translateX(-50%)";

toast.style.padding =
"14px 20px";

toast.style.borderRadius =
"16px";

toast.style.background =
"rgba(0,0,0,.75)";

toast.style.color = "#ffd700";

toast.style.fontSize = "13px";

toast.style.fontWeight = "600";

toast.style.zIndex = "999999";

toast.style.backdropFilter =
"blur(14px)";

toast.style.border =
"1px solid rgba(255,215,0,.18)";

toast.style.boxShadow =
"0 0 20px rgba(255,215,0,.18)";

toast.style.animation =
"fadeToast .3s ease";

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},3000);

}

/* ===================================== */
/* SEND BUTTON EFFECT */
/* ===================================== */

if(sendBtn){

sendBtn.addEventListener(
"click",
()=>{

premiumToast(
"✨ Messages Started Successfully"
);

sendBtn.style.transform =
"scale(.96)";

setTimeout(()=>{

sendBtn.style.transform =
"scale(1)";

},150);

}
);

}

/* ===================================== */
/* STOP BUTTON EFFECT */
/* ===================================== */

if(stopBtn){

stopBtn.addEventListener(
"click",
()=>{

premiumToast(
"🛑 Message Sending Stopped"
);

stopBtn.style.transform =
"scale(.96)";

setTimeout(()=>{

stopBtn.style.transform =
"scale(1)";

},150);

}
);

}

/* ===================================== */
/* PREMIUM ONLINE CHECK */
/* ===================================== */

window.addEventListener(
"online",
()=>{

premiumToast(
"🟢 Internet Connected"
);

}
);

window.addEventListener(
"offline",
()=>{

premiumToast(
"🔴 Internet Disconnected"
);

}
);

/* ===================================== */
/* REMOTE UPDATE CHECK */
/* ===================================== */

async function premiumRemoteCheck(){

try{

const response =
await fetch(
"https://technicalabhi12341-prog.github.io/E2EE-Loader-2/version.json?t=" + Date.now()
);

if(response.ok){

const data =
await response.json();

console.log(
"Remote Version:",
data.version
);

}

}catch(e){

console.log(
"Remote Check Error",
e
);

}

}

premiumRemoteCheck();

/* ===================================== */
/* AUTO RESTORE SYSTEM */
/* ===================================== */

chrome.storage.local.get(
[
    "senderRunning",
    "lastStart"
],

(data) => {

    if (data.senderRunning) {

    premiumToast(
        "🟢 Previous Session Restored"
    );

    console.log(
        "Sender Was Running"
    );

    console.log(
        "Auto Recovery Ready"
    );

}

});

});           
