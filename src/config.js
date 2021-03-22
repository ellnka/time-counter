export const timers = {
    main: {
        id: "main-timer",
        label: "pomodoro",
        default: 15
    },
    longBreak: {
        id: "long-break",
        label: "long break",
        default: 5
    },
    shortBreak: {
        id: "short-break",
        label: "short break",
        default: 1
    }
}

export const labels = {
    start: "Start",
    stop: "Pause",
    reset: "Reset",
    close: "Close",
    settings: "Settings",
    time: "Time (minutes)",
    font: "Font",
    color: "Color"

};

export const themes = {
    red: {
        id: "theme-red",
        class: "theme--red"
    }, 
    blue: {
        id: "theme-blue",
        class: "theme--blue"
    },
    purple: {
        id: "theme-purple",
        class: "theme--purple"
    }
};

export const fonts = {
    kumbh: {
        id: "font-kumbh",
        class: "font--kumbh"
    }, 
    roboto: {
        id: "font-roboto",
        class: "font--roboto"
    }, 
    space: {
        id: "font-space",
        class: "font--space"
    }, 
};