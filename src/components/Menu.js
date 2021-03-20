import React, { useState } from "react";
import { timers } from './../config';

const Menu = ({activeTimer, setActiveTimer}) => {
    

    const onChangeValue = (event) => {
        setActiveTimer(event.target.value)
    }

    let items = [];
    for (let timer in timers) {
        items.push (
            <div key={timers[timer].id}>
                <input type="radio" 
                        name="active-timer" 
                        id={timers[timer].id} 
                        value={timers[timer].id} 
                        onChange={onChangeValue} 
                        checked={timers[timer].id === activeTimer}></input>
                <label htmlFor={timers[timer].id}>{timers[timer].label}</label>
            </div>);
    }

    return (
        <div className="menu" >
            {items}
        </div>

    );
}

export default Menu;