import { CONSTANTS } from "./util/constants.js";
import { STRINGS } from "../lang/messages/en/user.js";

export class Reader {
    constructor(root, timeRecorder) {
        this.root = root;
        this.timeRecorder = timeRecorder;
        this.read()
        this.update();
    }

    read() {
        while (this.root.lastElementChild) {
            this.root.removeChild(this.root.lastElementChild);
        }
        if (localStorage.getItem(CONSTANTS.NOTES_LOCAL_STORAGE) !== null) {
            const storageNotes = JSON.parse(localStorage.getItem(CONSTANTS.NOTES_LOCAL_STORAGE));
            for (let i = 0; i < storageNotes.length; i++) {
                this.createText(storageNotes[i])
            }
        }
        this.displayTime();
    }

    createText(textContent) {
        const text = document.createElement("textarea");
        text.textContent = textContent;
        text.disabled = true;
        this.root.appendChild(text);
    }

    displayTime() {
        this.timeRecorder.displayTime(STRINGS.TEXT_UPDATED);
    }
    
    update() {
        setInterval(() => { this.read() }, CONSTANTS.UPDATE_INTERVAL);
    }
}