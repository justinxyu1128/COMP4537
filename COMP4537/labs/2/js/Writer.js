import { Note } from "./Note.js"
import { CONSTANTS } from "./util/constants.js";
import { STRINGS } from "../lang/messages/en/user.js";

export class Writer {
    constructor(root, timeRecorder) {
        this.notes = [];
        this.root = root;
        this.timeRecorder = timeRecorder;

        this.noteContainer = this.createNoteContainer();
        this.buttonContainer = this.createButtonContainer();
        
        this.createNoteButton();
        this.populateNotes();
    }

    populateNotes() {
        if (localStorage.getItem(CONSTANTS.NOTES_LOCAL_STORAGE) !== null) {
            const storageNotes = JSON.parse(localStorage.getItem(CONSTANTS.NOTES_LOCAL_STORAGE));
            for (let i = 0; i < storageNotes.length; i++) {
                this.addNote();
                this.notes[i].setContent(storageNotes[i]);
            }
        }
    }

    createNoteContainer() {
        const noteContainer = document.createElement("div");
        noteContainer.id = CONSTANTS.ID_NOTE_CONTAINER;
        this.root.appendChild(noteContainer);
        return noteContainer;
    }

    createButtonContainer() {
        const buttonContainer = document.createElement("div");
        buttonContainer.id = CONSTANTS.ID_BTN_CONTAINER;
        this.root.appendChild(buttonContainer);
        return buttonContainer;
    }

    createNoteButton() {
        const button = document.createElement("button");
        button.textContent = STRINGS.BUTTON_ADD;
        button.addEventListener("click", () => { this.addNote() });
        this.buttonContainer.appendChild(button);
    }

    addNote() {
        const noteWrapper = document.createElement("div");
        noteWrapper.classList.add(CONSTANTS.CLASS_NOTE);
        this.noteContainer.appendChild(noteWrapper);

        const note = new Note(noteWrapper);
        note.addWriter(this);
        this.notes.push(note);
    }

    removeNote(note) {
        const index = this.notes.indexOf(note);
        if (index > CONSTANTS.EXISTS) {
            this.notes.splice(index, 1); // 1 for the number of elements to remove, starting from the index
            this.update();
        }
    }

    getNoteTextList() {
        const noteTextList = [];
        for (const note of this.notes) {
            noteTextList.push(note.getContent());
        }
        return noteTextList;
    }

    displayTime() {
        this.timeRecorder.displayTime(STRINGS.TEXT_STORED);
    }

    update() {
        localStorage.setItem(CONSTANTS.NOTES_LOCAL_STORAGE, JSON.stringify(this.getNoteTextList()));
        this.displayTime();
    }
}