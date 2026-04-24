import {turbo, OnOff, TurboButton, StatefulReifect, element, flexRow, define} from "../../../build/turbodombuilder.esm";

const heading = document.createElement("h1");
heading.textContent = "Chainable Styles Test";
document.body.appendChild(heading);

class Square extends HTMLElement {
    position = {x: 0, y: 0};

    init(position) {
        position.x -= 100;
        position.y -= 100;
        this.position = position;
        turbo(this).addClass("square").addToParent(document.body);
        this.update();
    }

    update() {
        this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
}
define(Square, "test-square");

const squares = [];
for (let i = 0; i < 5; i++) {
    squares.push(element({tag: "test-square", parent: document.body, classes: "square"}));
}

const positionReifect = new StatefulReifect({
    states: OnOff,
    attachedObjects: squares,
    initialState: OnOff.off,
    styles: (state, index) => `
        top: ${state === OnOff.on ? 200 : 300}px;
        left: ${(index + 1) * 100 + index * 10}px;
        transition: top 0.3s ease-in-out ${index * 0.1}s;
    `,
});

const opacityReifect = new StatefulReifect({
    states: OnOff,
    attachedObjects: squares,
    initialState: OnOff.off,
    styles: (state, index) => `
        opacity: ${state === OnOff.on ? 1 : 0.2};
        transition: opacity 0.5s ease-in-out ${index * 0.05}s;
    `,
});

const scaleReifect = new StatefulReifect({
    states: OnOff,
    attachedObjects: squares,
    initialState: OnOff.off,
    styles: (state, index) => `
        transform: scale(${state === OnOff.on ? 1 : 0.5});
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s;
    `,
});

flexRow({
    style: "gap: 0.5em", parent: document.body, children: [
        TurboButton.create({text: "Toggle Position", onClick: () => positionReifect.toggle()}),
        TurboButton.create({text: "Toggle Opacity", onClick: () => opacityReifect.toggle()}),
        TurboButton.create({text: "Toggle Scale", onClick: () => scaleReifect.toggle()}),
        TurboButton.create({
            text: "Toggle All", onClick: () => {
                positionReifect.toggle();
                opacityReifect.toggle();
                scaleReifect.toggle();
            }
        })
    ]
});