import {modelSignal, signal, TurboModel} from "../../../../build/turbodombuilder.esm";
import {SongState} from "./song.types";

export class SongModel extends TurboModel {
    @modelSignal() id: string;
    @modelSignal() title: string;
    @modelSignal() artist: string;
    @modelSignal() album: string;
    @modelSignal() cover: string;
    @modelSignal() duration: number;
    @signal state: SongState;
}