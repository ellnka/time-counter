import React, { useState, useEffect } from "react";
import { labels } from './../config';

const Timer = ({timerLength}) => {
    const SECONDS = 60;
    const FULL_DASH_ARRAY = 283;
    let   TIME_LIMIT = timerLength * SECONDS;

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerSecond, setTimerSecond] = useState(0);
    const [timerMinute, setTimerMinute] = useState(timerLength);
    const [intervalId, setIntervalId] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

    useEffect(() => {
        
        if (isTimerRunning) {
            const intervalId = setInterval(
                () => {
                    decreaseTimer(); 
                    setTimeLeft(timerMinute * SECONDS + timerSecond);
                }, 1000
            );
            setIntervalId(intervalId);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
     }, [isTimerRunning, timerSecond]);


    useEffect(() => {
        setCircleDasharray();
    }, [timeLeft, timerSecond]);

    useEffect(() => {
        onResetTimer();
    }, [timerLength]);

    const decreaseTimer = () => {
        if (timerSecond === 0) { 
            if (timerMinute === 0) {
                setIsTimerRunning(false);
            } else {
                setTimerMinute(timerMinute - 1);
                setTimerSecond(59);              
            }
        } else {
            setTimerSecond(timerSecond - 1);
        }
    }

    const onToggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    }

    const onResetTimer = () => {
        setIsTimerRunning(false);
        setTimerSecond(0);
        setTimerMinute(timerLength);
        setTimeLeft(TIME_LIMIT);
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      }
      
    function setCircleDasharray() {
        const circleDasharray = `${(
          calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
          .querySelector(".base-timer__path-remaining")
          .setAttribute("stroke-dasharray", circleDasharray);
    }


    function formatTime(minutes, seconds) {
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    return (
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className ="base-timer__circle">
                  <circle className ="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                  <path
                    strokeDasharray = {FULL_DASH_ARRAY}
                    className ="base-timer__path-remaining"
                    d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                    "
                  ></path>
                </g>
                </svg>
                <div className="base-timer__controls">
                    <div  className="base-timer__labels">
                        <span>{formatTime(timerMinute, timerSecond)}</span>
                    </div>
                    <div  className="base-timer__buttons">
                        <button onClick={onToggleTimer}>{isTimerRunning ? labels.stop : labels.start}</button>
                        {!isTimerRunning && timeLeft !== TIME_LIMIT  && <button onClick={onResetTimer}>{labels.reset}</button>}
                    </div>
                </div>
            </div>
    );

}

export default Timer;