import { STRINGS } from "../lang/messages/en/user.js";
import { CONSTANTS } from "./constants.js";
import { GameEngine } from "./GameEngine.js";

export class AppController {
    constructor(ui) {
        this.ui = ui;
        this.ui.startButton.onclick = () => {this.startGame();};
        this.game = new GameEngine(ui);
    }

    startGame() {
        let gameInput = this.ui.input.value;
        this.ui.clearError();
        try {
            if (gameInput.trim() == "") {
                throw STRINGS.ERROR_EMPTY;
            } else if (gameInput > CONSTANTS.UI_INPUT_HIGH) {
                throw STRINGS.ERROR_HIGH;
            } else if (gameInput < CONSTANTS.UI_INPUT_LOW) {
                throw STRINGS.ERROR_LOW;
            } else if (Number.isNaN(parseInt(gameInput))) {
                throw STRINGS.ERROR_NAN;
            }
            this.ui.startButton.disabled = true;
            this.game.start(parseInt(gameInput), this.ui);
        } catch(err) {
            this.ui.displayError(err);
        }
    }
}