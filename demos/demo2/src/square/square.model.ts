import {Coordinate, signal, TurboModel} from "../../../../build/turbodombuilder.esm";

export class SquareModel extends TurboModel {
    @signal color: string = "#2e82d5";
    @signal position: Coordinate = {x: 0, y: 0};
    @signal size: number = 100;
}