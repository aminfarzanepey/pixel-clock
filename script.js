const formatBtn = document.getElementById("format-btn");
const themeBtn = document.getElementById("theme-btn");
let is24Hour = true;

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if(!is24Hour){
        hours = hours % 12 || 12;
    }


    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

setInterval(updateClock,1000);

updateClock();

formatBtn.addEventListener("click", ()=>{
    is24Hour = !is24Hour;
    updateClock();
})

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
})