import {button, turbo, randomFromRange, TurboElement, trim, element, TurboIcon, div, TurboEventManager} from "../../../build/turbodombuilder.esm.js";

TurboIcon.config.defaultDirectory = "assets/";
TurboEventManager.instance.preventDefaultMouse = false;
TurboEventManager.instance.preventDefaultTouch = false;

//First custom element, a square
class Square extends TurboElement {
    //Random position on creation
    position = {x: randomFromRange(0, 600), y: randomFromRange(0, 600)};

    //Adds parameter as a CSS class and fires first update()
    init(classes = "") {
        turbo(this).addClass(classes);
        this.update();
        return this;
    }

    //Translate function that properly increments the position by delta
    translate(delta) {
        this.position.x += delta.x;
        this.position.y += delta.y;
        this.update();
    }

    update() {
        turbo(this).setStyle("transform", `translate(${this.position.x}px, ${this.position.y}px)`);
    }
}

//Second custom element, a circle (extends the square to inherit its position, init(), and update())
class Circle extends Square {
    //Translate function that subtracts delta from the position
    translate(delta) {
        this.position.x -= delta.x;
        this.position.y -= delta.y;
        this.update();
    }
}

//Third custom element, an outlined square (also extends the square to inherit its position, init(), and update())
class Outline extends Square {
    //Opacity value
    opacity = 0.5;

    //Translate function that updates the opacity according to the horizontal delta
    translate(delta) {
        this.opacity = trim(this.opacity + delta.x / 500, 1);
        this.update();
    }

    //Update the style
    update() {
        turbo(this).setStyles({
            transform: `translate(${this.position.x}px, ${this.position.y}px)`,
            opacity: this.opacity
        });
    }
}

//Define the custom elements
customElements.define("test-square", Square);
customElements.define("test-circle", Circle);
customElements.define("test-outline", Outline);

//Create 4 of each
for (let i = 0; i < 12; i++) {
    const type = i < 4 ? "square" : i < 8 ? "circle" : "outline";
    element({tag: "test-" + type, parent: document.body}).init(type);
}

//Create a "move tool" button
const moveTool = button({leftIcon: "move", text: "Move Tool", parent: document.body, classes: "moveTool"});
//Turn it into a tool, and change its color when it is active
turbo(moveTool).makeTool("move", {onActivate: () => moveTool.style.backgroundColor = "#ff8888"});

//Add a behavior to the tool --> When the tool is active and the user is dragging, fire the callback
//el is the element that is interacted with (the target of the interaction)
turbo(moveTool).addToolBehavior("turbo-drag", (e, el) => {
    //If el has a translate() function
    if (typeof el.translate === "function") {
        //Call it and pass it the delta position of the drag (the difference between the current position and
        // the position captured at the previous "turbo-drag" event).
        el.translate(e.deltaPosition);
        return true; //Stop the event from propagating
    }
});

//Create a new square that will contain an embedded tool
const newSquare = element({tag: "test-square", parent: document.body}).init("square");
//Create a handle or controller. It can be anything
const embeddedTool = div({classes: "controller", parent: newSquare});
//Turn the handle into a tool and embed it in the square
turbo(embeddedTool).makeTool("move", {customActivation: () => {}}).embedTool(newSquare);