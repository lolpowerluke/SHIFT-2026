// // https://www.w3schools.com/howto/howto_js_countdown.asp
// const countDownDate = new Date(countdownString).getTime();
//
// const x = setInterval(function () {
//     const now = new Date().getTime();
//     const distance = countDownDate - now;
//
//     const days = Math.floor(distance / dayInMs)
//         .toString()
//         .padStart(2, 0);
//     const hours = Math.floor((distance % dayInMs) / hourInMs)
//         .toString()
//         .padStart(2, 0);
//     const minutes = Math.floor((distance % hourInMs) / minuteInMs)
//         .toString()
//         .padStart(2, 0);
//     const seconds = Math.floor((distance % minuteInMs) / secondInMs)
//         .toString()
//         .padStart(2, 0);
//
//     blink("seconds", 500, 2);
//
//     if (seconds === "00") {
//         blink("minutes", 500, 2);
//     }
//
//     if (minutes === "00" && seconds === "00") {
//         blink("hours", 500, 2);
//     }
//
//     timer.innerHTML = `<span class="xlarge">${days}</span>D <span id="hours" class="xlarge">${hours}</span>H <span id="minutes" class="xlarge">${minutes}</span>M <span id="seconds" class="xlarge">${seconds}</span>S`;
//
//     if (timer.classList.contains("hidden")) timer.classList.remove("hidden");
//
//     // When countdown finishes
//     if (distance <= 0) {
//         clearInterval(x);
//         timer.innerHTML = "LIVE NOW";
//     }
// }, secondInMs);
//
// const blink = (target, time, count) => {
//     let blinks = 0;
//     const blinking = setInterval(() => {
//         document.getElementById(target).classList.toggle("hidden");
//         blinks++;
//         if (blinks >= count) {
//             clearInterval(blinking);
//             document.getElementById(target).classList.toggle("hidden");
//         }
//     }, time);
// };
import {useState, useEffect} from "react";

const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;
let previousMinute = null;

const countdownString = "2026-06-19T17:00:00";

const timer = document.getElementById("timer");

// base from W3schools

export function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({days: "00", hours: "00", minutes: "00", seconds: "00"})
    const [blinking, setBlinking] = useState(null);

    useEffect(() => {
        const blink = (target, time, count) => {
            let blinks = 0;
            setBlinking(target)
            const t = setInterval(() => {
                blinks++;
                if (blinks >= count) {
                    clearInterval(t);
                    setBlinking(null);
                }
            }, time);
        };
        const x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            // When countdown finishes
            if (distance <= 0) {
                clearInterval(x);
                setTimeLeft(null);
                return;
            }

            const days = Math.floor(distance / dayInMs)
                .toString()
                .padStart(2, 0);
            const hours = Math.floor((distance % dayInMs) / hourInMs)
                .toString()
                .padStart(2, 0);
            const minutes = Math.floor((distance % hourInMs) / minuteInMs)
                .toString()
                .padStart(2, 0);
            const seconds = Math.floor((distance % minuteInMs) / secondInMs)
                .toString()
                .padStart(2, 0);

            blink("seconds", 500, 2);
            if (seconds === "00") blink("minutes", 500, 2);
            if (minutes === "00" && seconds === "00") blink("hours", 500, 2);

            setTimeLeft({days, hours, minutes, seconds});
            }, secondInMs);

        return () => clearInterval(x)
    }, []);
    return {timeLeft, blinking};
}