import {
    signal,
    effect,
    Reifect,
    Point,
    TurboBaseElement
} from "../../../../build/turbodombuilder.esm";
import {Square} from "../square/square";

export class SquareList extends TurboBaseElement {
    @signal public count: number = 10;

    private squares: Square[] = [];

    private reifect: Reifect = new Reifect<Square>({
        properties: (id, total) => {
            return {
                position: Point.linearInterpolation(this.startSquare.position, this.endSquare.position, id / total),
            }
        }
    });

    public get startSquare(): Square {
        return this.squares[0];
    }

    public get endSquare(): Square {
        return this.squares[this.squares.length - 1];
    }

    public get canvas() {
        return document.querySelector("my-canvas");
    }

    @effect private updateSquareCount() {
        // this.reifect.detach(...this.squares);
        if (this.count < this.squares.length) {
            for (let i = this.squares.length; i >= this.count; i--) this.squares[i].remove();
            this.squares.splice(this.count, this.squares.length - this.count);
        } else if (this.count > this.squares.length) {
            for (let i = this.squares.length; i < this.count; i++) this.squares[i] =
                Square.create({parent: this.canvas});
        }

        this.startSquare.modifiable = true;
        this.endSquare.modifiable = true;
        for (let i = 1; i < this.squares.length - 1; i++) this.squares[i].modifiable = false;
        this.reifect.attachAll(...this.squares);
    }
}