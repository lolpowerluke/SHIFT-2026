import {useState, useEffect, useRef} from "react";

const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;

const countdownString = "2026-06-19T17:00:00";

export function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({days: "00", hours: "00", minutes: "00", seconds: "00"})
    const [blinkingH, setBlinkingH] = useState(null);
    const [blinkingM, setBlinkingM] = useState(null);
    const [blinkingS, setBlinkingS] = useState(null);
    const blinkSec = useRef(null)
    const blinkMins = useRef(null)
    const blinkHrs = useRef(null)

    useEffect(() => {
        const blink = (target, time, count, ref, setter) => {
        if (ref.current) return  // guard against stacking
        ref.current = target
        setter(target)             // still triggers re-render
        let blinks = 0
        const t = setInterval(() => {

            blinks++
            if (blinks >= count) {
                clearInterval(t)
                ref.current = null
                setter(null)
            }
        }, time)
    };

        const x = setInterval(function () {
            const now = new Date().getTime();
            const countDownDate = new Date(countdownString).getTime();
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

            blink("seconds", 500, 1, blinkSec, setBlinkingS);
            // not in sync for some reason, decided to turn mins and hrs off
            // if (seconds === "00") blink("minutes", 500, 2, blinkMins, setBlinkingM);
            // if (minutes === "00" && seconds === "00") blink("hours", 500, 2, blinkHrs, setBlinkingH);

            setTimeLeft({days, hours, minutes, seconds});
            }, secondInMs);

        return () => clearInterval(x)
    }, []);
    return {timeLeft, blinkingS, blinkingM, blinkingH};
}