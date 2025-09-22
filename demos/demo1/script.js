import {button, $, randomFromRange, TurboElement, trim} from "../../build/turbodombuilder.esm.js";

class Square extends TurboElement {
    position = {x: randomFromRange(0, 600), y: randomFromRange(0, 600)};

    constructor() {
        super();
        this.init();
        document.body.appendChild(this);
        this.update();
    }

    init() {
        $(this).addClass("square");
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

    constructor() {
        super();
        this.init();
        document.body.appendChild(this);
        this.update();
    }

    init() {
        $(this).addClass("outline");
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

for (let i = 0; i < 4; i++) new Square();
for (let i = 0; i < 4; i++) new Circle();
for (let i = 0; i < 4; i++) new Outline();

const moveTool = button({text: "Move Tool", parent: document.body, classes: "moveTool"});
$(moveTool).on("turbo-click", () => moveTool.style.backgroundColor = "red");
$(moveTool).makeTool("move");

$(moveTool).addToolBehavior("turbo-drag", (e, el) => {
    if (typeof el.translate === "function") {
        el.translate(e.deltaPosition);
        return true;
    }
    return false;
});