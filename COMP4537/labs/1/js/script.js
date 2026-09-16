import { UserInterface } from "./UserInterface.js";
import { AppController } from "./AppController.js";


const scoreboardContainer = document.getElementById("score-board");
const ui = new UserInterface(scoreboardContainer);
const app = new AppController(ui);