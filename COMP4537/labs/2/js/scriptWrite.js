import { TimeRecorder } from "./TimeRecorder.js";
import { Writer } from "./Writer.js";
import { CONSTANTS } from "./util/constants.js";

const root = document.getElementById(CONSTANTS.ID_WRITER);
const timeRecorder = new TimeRecorder();
const writer = new Writer(root, timeRecorder);