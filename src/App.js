import React, { useState, useEffect } from "react";
import Timer from './components/Timer';
import Menu from './components/Menu';
import Settings from './components/Settings';
import { timers } from './config';

function App() {

  const [shortBreakLength, setShortBreakLength] = useState(timers.shortBreak.default);
  const [longBreakLength, setLongBreakLength] = useState(timers.longBreak.default);
  const [timerLength, setTimerLength] = useState(timers.main.default);
  const [activeTimer, setActiveTimer] = useState(timers.main.id);

  const activeTimerLength = (activeTimer === timers.longBreak.id) ? longBreakLength : 
                            (activeTimer === timers.shortBreak.id) ? shortBreakLength : timerLength;

  return (
    <div>
      <header>
        <div className="logo"></div>
        <Menu activeTimer={activeTimer} setActiveTimer={setActiveTimer}/>
      </header>
      <main>
        <Timer timerLength={activeTimerLength} />
      </main>
      <Settings shortBreakLength={shortBreakLength} longBreakLength={longBreakLength} timerLength={timerLength}
            setShortBreakLength={setShortBreakLength} setLongBreakLength={setLongBreakLength} setTimerLength={setTimerLength}/>
    </div>
  );
}

export default App;
