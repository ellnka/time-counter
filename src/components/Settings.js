import React, { useState, useEffect } from 'react';
import { timers } from './../config';

const Settings = ({shortBreakLength, longBreakLength, timerLength, setShortBreakLength, setLongBreakLength, setTimerLength}) => {
    
    const [isModalOpened, setIsModalOpened] = useState(true);
    const [theme, setTheme] = useState("theme--red");

    useEffect(() => {
        document.body.className = theme;
      }, [theme]);
    
    const toggleModal = () => {
        setIsModalOpened(!isModalOpened);
    }

    const onChangeLengthValue = (event) => {
        switch (event.target.name) {
            case timers.main.id :  setTimerLength(event.target.value); break;
            case timers.shortBreak.id :  setShortBreakLength(event.target.value); break;
            case timers.longBreak.id :  setLongBreakLength(event.target.value); break;
            default: setTimerLength(event.target.value); break;
        }
    }

    const onChangeThemeValue = (event) => {
        setTheme(event.target.value);
    }

    const onChangeValue = (event) => {
        console.log(event.target.value);
    }

    return (
        <div>
            <div><button onClick={toggleModal}> open </button></div>

            { isModalOpened && 
                <div className="modal">
                    <div className="modal__header">
                        <div className="modal__title">Settings</div>
                        <button className="modal__close" onClick={toggleModal}></button>
                    </div>

                    <div className="modal__row setting"> 
                        <div className="setting__title">Time (minutes)</div>
                        <div className="setting__items">
                            <div className="setting__item">
                                <label>{timers.main.label}</label>
                                <input type="number" name={timers.main.id} value={timerLength}  onChange={onChangeLengthValue} />
                            </div>  

                            <div className="setting__item">
                                <label>{timers.shortBreak.label}</label>
                                <input type="number" name={timers.shortBreak.id} value={shortBreakLength}  onChange={onChangeLengthValue} />
                            </div>  

                            <div className="setting__item">
                                <label>{timers.longBreak.label}</label>
                                <input type="number" name={timers.longBreak.id} value={longBreakLength}  onChange={onChangeLengthValue} />
                            </div>  
                        </div>
                    </div>

                    <div className="modal__row setting setting--row">
                        <div className="setting__title">Font</div>
                        <div className="setting__items">
                            <div className="setting__item">
                                <input type="radio"  name="font"  id="font-1"  value="font-1" onChange={onChangeValue} checked={true}></input>
                                <label htmlFor="font-1">Aa</label>
                            </div>  

                            <div className="setting__item">
                                <input type="radio"  name="font"  id="font-2"  value="font-2" onChange={onChangeValue} ></input>
                                <label htmlFor="font-2">Aa</label>
                            </div>  

                            <div className="setting__item">
                                <input type="radio"  name="font"  id="font-3"  value="font-3" onChange={onChangeValue} ></input>
                                <label htmlFor="font-3">Aa</label>
                            </div>  
                        </div>
                    </div>
                
                    <div className="modal__row setting setting--row">
                        <div className="setting__title">Color</div>
                        <div className="setting__items">
                            <div className="setting__item">
                                <input type="radio"  name="theme"  id="theme-red"  value="theme--red" onChange={onChangeThemeValue} checked={true}></input>
                                <label htmlFor="theme-red" className="red"></label>
                            </div>  

                            <div className="setting__item">
                                <input type="radio"  name="theme"  id="theme-blue"  value="theme--blue" onChange={onChangeThemeValue} ></input>
                                <label htmlFor="theme-blue" className="blue"></label>
                            </div>  

                            <div className="setting__item">
                                <input type="radio"  name="theme"  id="theme-purple"  value="theme--purple" onChange={onChangeThemeValue}></input>
                                <label htmlFor="theme-purple" className="purple"></label>
                            </div>  
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default Settings;