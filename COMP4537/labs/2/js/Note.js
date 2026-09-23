import { STRINGS } from "../lang/messages/en/user.js";

export class Note {
    constructor(container) {
        this.container = container;
        this.writer = null;
        this.text = this.createTextArea();
        this.button = this.createRemoveButton();
    }

    // updates localStorage when the textarea is changed and then unfocused
    createTextArea() {
        const text = document.createElement("textarea");
        text.addEventListener("change", () => { this.writer.update() });
        this.container.appendChild(text);
        return text;
    }

    createRemoveButton() {
        const button = document.createElement("button");
        button.textContent = STRINGS.BUTTON_REMOVE;
        button.addEventListener("click", () => { this.remove() });
        this.container.appendChild(button);
        return button;
    }

    addWriter(writer) {
        this.writer = writer;
    }

    save() {
        this.writer.update();
    }

    getContent() {
        return this.text.value;
    }

    setContent(content) {
        this.text.value = content;
    }

    remove() {
        this.container.remove();
        this.writer.removeNote(this);
    }
}