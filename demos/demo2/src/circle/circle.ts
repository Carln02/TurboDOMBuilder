import {define, Point} from "../../../../build/turbodombuilder.esm";
import "./circle.css";
import {square, Square} from "../square/square";
import {SquareProperties} from "../square/square.types";

//Custom circle element, defined as a custom element
@define("demo-circle")
export class Circle extends Square {
    //Same as square, except when moved, it moves to the opposite direction
    public move(delta: Point) {
        this.model.position = this.model.position.sub(delta);
    }
}

//Factory function to create squares
export function circle(properties: SquareProperties = {}): Circle {
    if (!properties.tag) properties.tag = "demo-circle";
    return square({...properties}) as Circle;
}