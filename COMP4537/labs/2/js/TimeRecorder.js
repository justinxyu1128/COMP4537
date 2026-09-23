import { CONSTANTS } from "./util/constants.js";

export class TimeRecorder {
    constructor() {
        this.timeDisplay = this.createDisplay();
    }

    createDisplay() {
        const display = document.createElement("p");
        display.classList.add(CONSTANTS.CLASS_TIME_DISPLAY);
        const header = document.getElementById(CONSTANTS.ID_HEADER);
        header.appendChild(display);
        return display;
    }

    displayTime(text = "") {
        const currentTime = new Date().toLocaleTimeString();
        this.timeDisplay.textContent = `${text} ${currentTime}`;
    }
}