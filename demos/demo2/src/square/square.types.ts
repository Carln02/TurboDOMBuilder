import {TurboElementProperties, Point} from "../../../../build/turbodombuilder.esm";
import {SquareView} from "./square.view";
import {SquareModel} from "./square.model";

export type SquareProperties = TurboElementProperties<SquareView, any, SquareModel> & {
    position?: Point
};