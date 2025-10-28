import {modelSignal, signal, TurboModel} from "../../../../build/turbodombuilder.esm";
import {SongState} from "./song.types";

export class SongModel extends TurboModel {
    @modelSignal("id") id: string;
    @modelSignal("title") title: string;
    @modelSignal("artist") artist: string;
    @modelSignal("album") album: string;
    @modelSignal("cover") cover: string;
    @modelSignal("duration") duration: number;
    @signal state: SongState;
}