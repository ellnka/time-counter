import React, { useState, useEffect } from 'react';
import { timers, themes, labels, fonts } from './../config';

const Settings = ({shortBreakLength, longBreakLength, timerLength, setShortBreakLength, setLongBreakLength, setTimerLength}) => {
    
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [activeTheme, setActiveTheme] = useState(themes.red.class);
    const [activeFont, setActiveFont] = useState(fonts.kumbh.class);
    const [initValues, setInitValues] = useState({});

    useEffect(() => {
        document.body.className = activeTheme + " " + activeFont;
    }, [activeTheme, activeFont]);

    useEffect(() => {
        if (isModalOpened) {
            setInitValues( { activeTheme, activeFont, shortBreakLength, longBreakLength, timerLength });
            dragModal();
        }
      }, [isModalOpened]); 

    const toggleModal = () => {
        
        setIsModalOpened(!isModalOpened);
    }

    const onChangeLengthValue = (event) => {
        switch (event.target.name) {
            case timers.main.id :  setTimerLength(event.target.value); break;
            case timers.shortBreak.id :  setShortBreakLength(event.target.value); break;
            case timers.longBreak.id :  setLongBreakLength(event.target.value); break;
        }
    }

    const onChangeFontValue = (event) => {
        setActiveFont(event.target.value);
    }

    const onChangeThemeValue = (event) => {
        setActiveTheme(event.target.value);
    }

    const onResetChanges = () => {
        setTimerLength(initValues.timerLength);
        setShortBreakLength(initValues.shortBreakLength);
        setLongBreakLength(initValues.longBreakLength);
        setActiveTheme(initValues.activeTheme);
        setActiveFont(initValues.activeFont);
    }

    const dragModal = () => {
        const elmnt = document.querySelector(".modal");
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      
        const dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
      
        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        if (document.querySelector(".modal__header")) {
            document.querySelector(".modal__header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
    }

    let timerItems = [];
    for (let timer in timers) {
        let value = (timer === "longBreak") ? longBreakLength : (timer === "shortBreak") ? shortBreakLength : timerLength
        timerItems.push (
                <div key={timers[timer].id}  className="setting__item">
                    <label>{timers[timer].label}</label>
                    <input type="number" name={timers[timer].id} value={value} onChange={onChangeLengthValue} />
                </div>);
    }

    let fontItems = [];
    for (let font in fonts) {
        fontItems.push (
            <div key={fonts[font].id} className="setting__item">
                <input type="radio" 
                        name="fonts" 
                        id={fonts[font].id} 
                        value={fonts[font].class} 
                        onChange={onChangeFontValue} 
                        checked={fonts[font].class === activeFont} />
                <label htmlFor={fonts[font].id} className={fonts[font].class}>Aa</label>
            </div>);
    }

    let themeItems = [];
    for (let theme in themes) {
        themeItems.push (
            <div key={themes[theme].id} className="setting__item theme-item">
                <input type="radio" 
                        name="theme" 
                        id={themes[theme].id} 
                        value={themes[theme].class} 
                        onChange={onChangeThemeValue} 
                        checked={themes[theme].class === activeTheme} />
                <label htmlFor={themes[theme].id} className={themes[theme].id}></label>
            </div>);
    }

    return (
        <div className="footer">
            <div><button className="settings-btn" onClick={toggleModal}> </button></div>

            { isModalOpened && 
                <div className="modal">
                    <div className="modal__header">
                        <div className="modal__title">{labels.settings}</div>
                        <button className="modal__close" onClick={toggleModal}></button>
                    </div>

                    <div className="modal__row setting"> 
                        <div className="setting__title">{labels.time}</div>
                        <div className="setting__items">
                            {timerItems}
                        </div>
                    </div>

                    <div className="modal__row setting setting--row">
                        <div className="setting__title">{labels.font}</div>
                        <div className="setting__items">
                            {fontItems}
                        </div>
                    </div>
                
                    <div className="modal__row setting setting--row">
                        <div className="setting__title">{labels.color}</div>
                        <div className="setting__items">
                            {themeItems}
                        </div>
                    </div>

                    <div className="modal__footer">
                        <button onClick={onResetChanges}>{labels.reset}</button>
                        <button onClick={toggleModal}>{labels.close}</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Settings;