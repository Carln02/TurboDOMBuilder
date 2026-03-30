import {turbo, OnOff, TurboButton, StatefulReifect, element} from "../../../build/turbodombuilder.esm.js";

//Creating an element in JS and adding it to the document
const heading = document.createElement("h1");
heading.textContent = "Heading 1";
document.body.appendChild(heading);

//Creating a custom "Square" element
class Square extends HTMLElement {
    //Stored position of the square
    position = {x: 0, y: 0};

    init(position) {
        position.x -= 100;
        position.y -= 100; //Center the position (according to the size of the square - 200px)
        this.position = position; //Store the position
        turbo(this).addClass("square").addToParent(document.body); //Assign CSS class and add to document
        this.update(); //Update position
    }

    update() {
        this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
}

//Define the square element to be able to create it
customElements.define("test-square", Square);

const squares = [];
for (let i = 0; i < 5; i++) {
    squares.push(element({tag: "test-square", parent: document.body, classes: "square"}));
}

const reifect = new StatefulReifect({
    states: [OnOff.on, OnOff.off],
    styles: (state, index) => `
        top: ${state === OnOff.on ? 200 : 300}px;
        left: ${(index + 1) * 100 + index * 10}px;
    `,
    transition: "top, left",
    transitionDuration: 0.3,
    transitionTimingFunction: "ease-in-out",
    transitionDelay: (state, index) => index * 0.1
});

reifect.attachAll(...squares);
reifect.apply(OnOff.off, squares);
TurboButton.create({text: "Animate", parent: document.body, onClick: () => reifect.toggle(squares)});