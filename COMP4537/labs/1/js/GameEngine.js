import { CONSTANTS } from "./constants.js";
import { STRINGS } from "../lang/messages/en/user.js";

export class GameEngine {
    constructor(ui) {
        this.ui = ui;
        this.numBtn = 0;
        this.colors = [...CONSTANTS.COLOR_LIST];
        this.gameBoard = document.getElementById("game-board");
        this.buttons = [];
        this.order = 1;
        this.intervalId = null;
        this.numScrambled = 0;
    }

    calculatePosition() {
        const btnWidth = this.buttons[0].offsetWidth + CONSTANTS.MARGIN;
        const btnHeight = this.buttons[0].offsetHeight + CONSTANTS.MARGIN;

        setTimeout(() => {
            for (const button of this.buttons) {
                button.classList.add("game-btn");
            }
        }, 
            CONSTANTS.SCRAMBLE_INTERVAL * CONSTANTS.SECONDS
        );
        
        this.intervalId = setInterval((btnWidth, btnHeight) => {
            this.scrambleButtons(btnWidth, btnHeight)
        }, 
            CONSTANTS.SCRAMBLE_INTERVAL * CONSTANTS.SECONDS,
            btnWidth,
            btnHeight
        );
    }

    scrambleButtons(btnWidth, btnHeight) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxWidth = windowWidth - btnWidth;
        const maxHeight = windowHeight - btnHeight;

        for (const button of this.buttons) {
            button.style.top = Math.floor(Math.random() * maxHeight) + "px";
            button.style.left = Math.floor(Math.random() * maxWidth) + "px";
        }
        this.numScrambled++;
        if (this.numScrambled == this.numBtn) {
            this.enableButtons();
            this.hideButtons();
            clearInterval(this.intervalId);
        }
    }

    disableButtons() {
        for (const button of this.buttons) {
            button.disabled = true;
        }
    }

    enableButtons() {
        for (const button of this.buttons) {
            button.disabled = false;
        }
    }

    hideButtons() {
        for (const button of this.buttons) {
            button.classList.add("hidden");
        }
    }

    showButtons() {
        for (const button of this.buttons) {
            button.classList.remove("hidden");
        }
    }

    shuffleArray(array) {
        // taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        // let's say the array length is 7. i goes from 6 to 1. j is a random number between
        // 0 and 6 for i = 6, then 0 and 5 for i = 5, and so on. Each time, i and j are swapped in the array.
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createButtons() {
        // shuffle current saved array so it's different from last time
        this.shuffleArray(this.colors);

        for (let i = 0; i < this.numBtn; i++) {
            const button = document.createElement("button");
            button.classList.add(this.colors[i], "btn");
            button.textContent = i + 1;
            button.disabled = true;
            button.addEventListener("click", (event) => {
                this.checkOrder(event);
            })
            this.gameBoard.appendChild(button);
            this.buttons.push(button);
        }
    }

    checkOrder(event) {
        const target = event.target;
        if (parseInt(target.textContent) == this.order) {
            target.classList.remove("hidden");
            target.disabled = true;
            if (this.order == this.numBtn) {
                this.ui.displayMessage(STRINGS.GAME_VICTORY_TEXT);
                this.ui.startButton.disabled = false;
            }
            this.order++;
        } else {
            this.showButtons();
            this.disableButtons();
            this.ui.displayMessage(STRINGS.GAME_DEFEAT_TEXT);
            this.ui.startButton.disabled = false;
        }
    }

    reset() {
        while (this.gameBoard.lastElementChild) {
            this.gameBoard.removeChild(this.gameBoard.lastElementChild);
        }
        this.numBtn = 0;
        this.buttons = [];
        this.order = 1;
        this.intervalId = null;
        this.numScrambled = 0;
        this.ui.displayMessage(STRINGS.APP_TITLE);
    }

    start(numBtn) {
        this.reset();
        this.numBtn = numBtn;
        this.createButtons();
        setTimeout(() => {
            this.calculatePosition()
        }, 
            (numBtn - CONSTANTS.SCRAMBLE_INTERVAL) * CONSTANTS.SECONDS
        );
    }
}