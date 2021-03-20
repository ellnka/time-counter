import React, { useState, useEffect } from "react";
import Timer from './components/Timer';
import Menu from './components/Menu';

function App() {
  const timers = {
    main: "main-timer",
    longBreak: "long-break",
    shortBreak: "short-break"
  }

  const [shortBreakLength, setShortBreakLength] = useState(1);
  const [longBreakLength, setLongBreakLength] = useState(5);
  const [timerLength, setTimerLength] = useState(15);
  const [activeTimer, setActiveTimer] = useState(timers.main);
  const [theme, setTheme] = useState("theme--red");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <header>
        <div className="logo"></div>
        <Menu activeTimer={activeTimer} setActiveTimer={setActiveTimer}/>
      </header>
      <main>
        <Timer timerLength={(activeTimer === timers.longBreak) ? longBreakLength : (activeTimer === timers.shortBreak) ? shortBreakLength : timerLength} />
      </main>

    </div>
  );
}

export default App;
