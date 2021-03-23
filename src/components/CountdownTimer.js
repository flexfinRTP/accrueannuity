import React, { useEffect, useState } from "react";
//import logo from './logo.svg';

function App() {
    const calcTimeLeft = () => {

        let year = new Date().getFullYear();
        const difference = +new Date(`10/01/${year}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calcTimeLeft());
    const [year] = useState(new Date().getFullYear(););

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            setYear(new Date().getFullYear());
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div>
            <h1>HacktoberFest {year}Countdown</h1>
            <h2>With React Hooks!</h2>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    )
}
// ? = if time is not up, display timer. : = else/false, then display text
export default connect()(App);