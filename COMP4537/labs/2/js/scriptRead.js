import { TimeRecorder } from "./TimeRecorder.js";
import { Reader } from "./Reader.js";
import { CONSTANTS } from "./util/constants.js";

const root = document.getElementById(CONSTANTS.ID_READER);
const timeRecorder = new TimeRecorder();
const reader = new Reader(root, timeRecorder);