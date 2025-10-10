import {TurboElementProperties, Coordinate} from "../../../../build/turbodombuilder.esm";
import {SquareView} from "./square.view";
import {SquareModel} from "./square.model";
import {TurboButton} from "../../../../src";
import {Square} from "./square";

export type SquareProperties = TurboElementProperties<SquareView, any, SquareModel> & {
    position?: Coordinate
};