async function checkUpdate() {

    try {

        const response = await fetch(
            "https://technicalabhi12341-prog.github.io/E2EE-Loader-/version.json?t=" + Date.now()
        );

        const data = await response.json();

        const currentVersion =
            chrome.runtime.getManifest().version;

        if (data.version !== currentVersion) {

            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon128.png",
                title: "New Update Available",
                message: "Click to update extension"
            });

            chrome.tabs.create({
                url: data.update_url
            });
        }

    } catch (e) {
        console.log("Update Error:", e);
    }
}

checkUpdate();

setInterval(checkUpdate, 300000);

/* ===================================== */
/* PREMIUM STARTUP SYSTEM */
/* ===================================== */

chrome.runtime.onInstalled.addListener(
(details)=>{

if(details.reason === "install"){

chrome.notifications.create({

type:"basic",

iconUrl:"icon128.png",

title:"✨ Premium Extension Installed",

message:"RAVI KING Premium Loader Activated"

});

}

if(details.reason === "update"){

chrome.notifications.create({

type:"basic",

iconUrl:"icon128.png",

title:"🚀 Extension Updated",

message:"New Premium Features Added"

});

}

}
);

/* ===================================== */
/* KEEP ALIVE SYSTEM */
/* ===================================== */

setInterval(()=>{

console.log(
"Premium Background Active"
);

chrome.storage.local.set({

lastActive:Date.now()

});

},20000);

/* ===================================== */
/* AUTO START CHECK */
/* ===================================== */

chrome.runtime.onStartup.addListener(()=>{

console.log(
"Extension Started"
);

chrome.notifications.create({

type:"basic",

iconUrl:"icon128.png",

title:"🟢 System Online",

message:"Premium Background Running"

});

});

/* ===================================== */
/* REMOTE CONFIG SYSTEM */
/* ===================================== */

async function premiumRemoteConfig(){

try{

const response =
await fetch(
"https://technicalabhi12341-prog.github.io/E2EE-Loader-/config.json?t=" + Date.now()
);

if(response.ok){

const data =
await response.json();

console.log(
"Remote Config Loaded",
data
);

chrome.storage.local.set({

premiumConfig:data

});

}

}catch(e){

console.log(
"Remote Config Error",
e
);

}

}

premiumRemoteConfig();

/* ===================================== */
/* AUTO REMOTE REFRESH */
/* ===================================== */

setInterval(()=>{

premiumRemoteConfig();

},300000);

/* ===================================== */
/* ALARM KEEP ALIVE SYSTEM */
/* ===================================== */

chrome.alarms.create("premiumKeepAlive", {
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener((alarm) => {

  if (alarm.name === "premiumKeepAlive") {

    console.log("Premium Alarm Active");

    chrome.storage.local.set({
      premiumAlive: Date.now()
    });

  }

});

/* ===================================== */
/* AUTO OPEN MESSENGER */
/* ===================================== */

chrome.runtime.onStartup.addListener(() => {

  chrome.tabs.create({
    url: "https://www.facebook.com/messages"
  });

});

/* ===================================== */
/* AUTO TAB CHECK */
/* ===================================== */

setInterval(() => {

  chrome.tabs.query({}, (tabs) => {

    let found = false;

    tabs.forEach((tab) => {

      if (
        tab.url &&
        tab.url.includes("facebook.com/messages")
      ) {

        found = true;

      }

    });

    if (!found) {

      chrome.tabs.create({
        url: "https://www.facebook.com/messages"
      });

    }

  });

}, 120000);

/* ===================================== */
/* INTERNET RECONNECT */
/* ===================================== */

setInterval(async () => {

  try {

    await fetch(
      "https://www.google.com"
    );

    console.log("Internet Working");

  } catch (e) {

    console.log("Internet Lost");

  }

}, 60000);

let audio = null;

chrome.runtime.onMessage.addListener(
(request, sender, sendResponse) => {

    if (request.action === "playMusic") {

        if (!audio) {

            audio = new Audio(
                chrome.runtime.getURL("music.mp3")
            );

            audio.loop = true;
            audio.volume = 0.5;

        }

        audio.play();

    }

    if (request.action === "pauseMusic") {

        if (audio) {

            audio.pause();

        }

    }

}
);