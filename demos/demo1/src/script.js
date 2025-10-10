import {button, $, randomFromRange, TurboElement, trim, element, TurboIcon, div} from "../../../build/turbodombuilder.esm.js";

TurboIcon.config.defaultDirectory = "assets/";

class Square extends TurboElement {
    position = {x: randomFromRange(0, 600), y: randomFromRange(0, 600)};

    init() {
        $(this).addClass("square");
        this.update();
    }

    translate(delta) {
        this.position.x += delta.x;
        this.position.y += delta.y;
        this.update();
    }

    update() {
        $(this).setStyle("transform", `translate(${this.position.x}px, ${this.position.y}px)`);
    }
}

class Circle extends Square {
    init() {
        $(this).addClass("circle");
        this.update();
    }

    translate(delta) {
        this.position.x -= delta.x;
        this.position.y -= delta.y;
        this.update();
    }
}

class Outline extends TurboElement {
    position = {x: randomFromRange(0, 600), y: randomFromRange(0, 600)};
    opacity = 0.5;

    init() {
        $(this).addClass("outline");
        this.update();
    }

    translate(delta) {
        this.opacity += delta.x / 500;
        this.opacity = trim(this.opacity, 1);
        this.update();
    }

    update() {
        $(this).setStyle("transform", `translate(${this.position.x}px, ${this.position.y}px)`)
            .setStyle("opacity", this.opacity);
    }
}

customElements.define("test-square", Square);
customElements.define("test-circle", Circle);
customElements.define("test-outline", Outline);

for (let i = 0; i < 12; i++) {
    const tag = "test-" + (i < 4 ? "square" : i < 8 ? "circle" : "outline");
    element({tag, parent: document.body}).init();
}

const embeddedSquare = element({tag: "test-square", parent: document.body});
embeddedSquare.init();
const controller = div({classes: "controller", parent: embeddedSquare});
$(controller).makeTool("move").embedTool(embeddedSquare);

const moveTool = button({leftIcon: "chevron-top", text: "Move Tool", parent: document.body, classes: "moveTool"});

$(moveTool).on("turbo-click", () => moveTool.style.backgroundColor = "red");
$(moveTool).makeTool("move");

$(moveTool).addToolBehavior("turbo-drag", (e, el) => {
    if (typeof el.translate === "function") {
        el.translate(e.deltaPosition);
        return true;
    }
    return false;
});