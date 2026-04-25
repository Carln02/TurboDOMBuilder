import {Point, signal, TurboModel, Color} from "../../../../build/turbodombuilder.esm";

//Model of the square element
export class SquareModel extends TurboModel {
    //Turned simple fields into signals (so changing their values will trigger @effect callbacks)
    @signal color: Color = Color.random([60, 90], [40, 70]);
    @signal position: Point = new Point();
    @signal rotation: number = 0;
    @signal elementSize: number = 100;
    @signal centerAnchor: boolean = true;
}