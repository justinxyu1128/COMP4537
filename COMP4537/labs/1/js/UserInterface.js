import { STRINGS } from "../lang/messages/en/user.js";
import { CONSTANTS } from "./constants.js";
export class UserInterface {

    constructor(scoreboardContainer) {
        this.scoreboard = scoreboardContainer;
        this.messageText = this.createMessageText();
        this.startButton = this.createStartButton();
        this.errorText = this.createErrorText();
        this.input = this.createInput();

        this.initialize();
    }

    displayMessage(msg) {
        this.messageText.textContent = msg;
    }

    clearMessage() {
        this.messageText.textContent = "";
    }

    displayError(msg) {
        this.errorText.textContent = msg;
    }

    clearError() {
        this.errorText.textContent = "";
    }

    createMessageText() {
        const msgText = document.createElement("p");
        msgText.classList.add(CONSTANTS.MSG_TEXT_CLASS);
        return msgText;
    }
    
    createStartButton() {
        const btn = document.createElement("button");
        btn.textContent = STRINGS.UI_BTN_START;
        btn.id = CONSTANTS.UI_BTN_START_ID;
        return btn;
    }

    createInput() {
        const input = document.createElement("input");
        input.type = 'number';
        input.id = CONSTANTS.UI_INPUT_ID;
        input.name = CONSTANTS.UI_INPUT_ID;
        return input;
    }

    createLabel() {
        const label = document.createElement("label");
        label.htmlFor = CONSTANTS.UI_INPUT_ID;
        label.textContent = STRINGS.UI_INPUT_TEXT;
        return label;
    }

    createErrorText() {
        const errorText = document.createElement("p");
        errorText.classList.add(CONSTANTS.ERROR_TEXT_CLASS);
        return errorText;
    }

    initialize() {
        this.scoreboard.appendChild(this.messageText);
        this.scoreboard.appendChild(this.createLabel());
    
        const container = document.createElement("div");
        container.appendChild(this.input);
        container.appendChild(this.startButton);
        container.classList.add('input-container');

        this.scoreboard.appendChild(container);
        this.scoreboard.appendChild(this.errorText);

        this.displayMessage(STRINGS.APP_TITLE);
    }
}