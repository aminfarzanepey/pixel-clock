const clickSound = new Audio("./assets/sounds/beep.mp3");

const clockContainer = document.querySelector(".clock-container");
const formatBtn = document.getElementById("format-btn");
const themeBtn = document.getElementById("theme-btn");

let is24Hour = localStorage.getItem("is24Hour");
let isDarkTheme = localStorage.getItem("isDarkTheme") === "true";

if (is24Hour === null) {
    is24Hour = true;
    localStorage.setItem("is24Hour", is24Hour);
} else {
    is24Hour = is24Hour === "true"; // it says is24Hour = false(for exmpl) === "true" => return false
}

if (isDarkTheme) {
    document.body.classList.add("dark");
}

function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24Hour) {
        hours = hours % 12 || 12;
    }


    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);

    document.getElementById("date").textContent = formattedDate;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
    console.log("called");

}

setInterval(updateClock, 1000);

updateClock();

formatBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    localStorage.setItem("is24Hour", is24Hour);
    updateClock();
})

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    isDarkTheme = document.body.classList.contains("dark");
    localStorage.setItem("isDarkTheme", isDarkTheme);

    clockContainer.classList.add("pixel-effect");
    setTimeout(() => {
       clockContainer.classList.remove("pixel-effect");
    }, 400);
})


//play sound when click
formatBtn.addEventListener("click",playClickSound);
themeBtn.addEventListener("click",playClickSound);