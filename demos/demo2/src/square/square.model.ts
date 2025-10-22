import {Point, signal, TurboModel, randomColor} from "../../../../build/turbodombuilder.esm";

//Model of the square element
export class SquareModel extends TurboModel {
    //Turned simple fields into signals (so changing their values will trigger @effect callbacks)
    @signal color: string = randomColor([60, 90], [40, 70]);
    @signal position: Point = new Point();
    @signal size: number = 100;
}