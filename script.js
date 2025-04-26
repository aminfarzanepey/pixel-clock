//sounds
const alarmSound = new Audio("./assets/sounds/alarm.mp3")
const clickSound = new Audio("./assets/sounds/beep.mp3");

//variables
const clockContainer = document.querySelector(".clock-container");
const formatBtn = document.getElementById("format-btn");
const themeBtn = document.getElementById("theme-btn");

const setAlarmBtn = document.getElementById("set-alarm-btn");
const stopAlarmBtn = document.getElementById("stop-alarm-btn");
const showAlarmBtn = document.getElementById("alarm-btn");

const stopwatchDisplay = document.getElementById("stopwatch");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const showStopwatchBtn = document.getElementById("stopwatch-btn");

let is24Hour = localStorage.getItem("is24Hour");
let isDarkTheme = localStorage.getItem("isDarkTheme") === "true";
let alarmTime = null;
let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

//checking from localStorage
if (is24Hour === null) {
    is24Hour = true;
    localStorage.setItem("is24Hour", is24Hour);
} else {
    is24Hour = is24Hour === "true"; // it says is24Hour = false(for exmpl) === "true" => return false
}

if (isDarkTheme) {
    document.body.classList.add("dark");
}

//clock function
function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "";

    if (!is24Hour) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    }


    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
    document.getElementById("ampm").textContent = ampm; //show AM/PM

    document.getElementById("date").textContent = formattedDate;
}

//adding zero before number
function pad(num) {
    return num.toString().padStart(2, '0');
}

//play btn sounds function
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

//calling clock function each 1s
setInterval(updateClock, 1000);
updateClock();

//stopwatch
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${milliseconds.toString().padStart(3, "0")}`;
}

function updateStopwatch() {
    elapsedTime += 10; // Update every 10ms
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

//#region event listeners---------------------------------------

// 24/12 format btn event
formatBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    localStorage.setItem("is24Hour", is24Hour);
    updateClock();
})

//theme btn event
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    isDarkTheme = document.body.classList.contains("dark");
    localStorage.setItem("isDarkTheme", isDarkTheme);

    clockContainer.classList.add("pixel-effect");
    setTimeout(() => {
        clockContainer.classList.remove("pixel-effect");
    }, 400);
})

//set alarm event
setAlarmBtn.addEventListener("click", () => {
    const alarmHour = document.getElementById("alarm-hour").value.padStart(2, "0");
    const alarmMinute = document.getElementById("alarm-minute").value.padStart(2, "0");
    alarmTime = `${alarmHour}:${alarmMinute}`;
    document.getElementById("alarm-status").textContent = `Alarm set for ${alarmTime}`;

});

//check for alarm
setInterval(() => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0");

    if (alarmTime === currentTime) {
        alarmSound.play();
        document.getElementById("alarm-status").textContent = "RING RING!";
        stopAlarmBtn.style.display = "inline-block"; // show stop btn
        alarmTime = null;
    }
}, 1000);

stopAlarmBtn.addEventListener("click", () => {
    alarmSound.pause();//alarmSound is global
    alarmSound.currentTime = 0;
    document.getElementById("alarm-status").textContent = "Alarm stopped!";
    stopAlarmBtn.style.display = "none";
})

//show alarm container event listenner
showAlarmBtn.addEventListener("click", () => {
    document.getElementById("alarm-container").classList.toggle("show");
    document.getElementById("alarm-container").classList.add("pixel-effect");
})

//stopwatch event listenners
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchDisplay.classList.add("pixel-effect");
        setTimeout(() => stopwatchDisplay.classList.remove("pixel-effect"), 400);
    }
});

pauseBtn.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatchInterval);
    }
})

resetBtn.addEventListener("click", () => {
    isRunning = false;
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    stopwatchDisplay.textContent = "00:00:00:000";

    stopwatchDisplay.classList.add("pixel-effect");
    setTimeout(() => stopwatchDisplay.classList.remove("pixel-effect"), 400);
})

showStopwatchBtn.addEventListener("click", () => {
    stc = document.querySelector(".stopwatch-container");
    console.log(stc);

    document.querySelector(".stopwatch-container").classList.toggle("show");
    document.querySelector(".stopwatch-container").classList.add("pixel-effect");
})

//play sound when click
formatBtn.addEventListener("click", playClickSound);
themeBtn.addEventListener("click", playClickSound);
setAlarmBtn.addEventListener("click", playClickSound);
stopAlarmBtn.addEventListener("click", playClickSound);
showAlarmBtn.addEventListener("click", playClickSound);

startBtn.addEventListener("click", playClickSound);//stopwatch btns
pauseBtn.addEventListener("click", playClickSound);
resetBtn.addEventListener("click", playClickSound);
showStopwatchBtn.addEventListener("click", playClickSound);

//#endregion