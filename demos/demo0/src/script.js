import {turbo, randomColor, button} from "../../../build/turbodombuilder.esm.js";

//Creating an element in JS and adding it to the document
const heading = document.createElement("h1");
heading.textContent = "Heading 1";
document.body.appendChild(heading);

//Creating another element and adding interaction
const colorChangingButton = document.createElement("button");
colorChangingButton.textContent = "Change color";
document.body.appendChild(colorChangingButton);
colorChangingButton.addEventListener("click", () => colorChangingButton.style.backgroundColor = randomColor());

//Do it in one line with the toolkit
const addSquareButton = button({text: "+ Add Square", parent: document.body, onClick: (e, el) => el.style.backgroundColor = "lightblue"});

//Creating a custom "Square" element
class Square extends HTMLElement {
    //Stored position of the square
    position = {x: 0, y: 0};

    init(position) {
        position.x -= 100; position.y -= 100; //Center the position (according to the size of the square - 200px)
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

//turn add square button into a tool
turbo(addSquareButton).makeTool("addSquare");

//Define interaction with tool
turbo(document.body).onTool("click", "addSquare", (e) => {
    document.createElement("test-square").init({x: e.clientX, y: e.clientY});
});