import {Coordinate, modelSignal, TurboModel} from "../../../../build/turbodombuilder.esm";
import {PlaylistData} from "./playlist.types";

export class PlaylistModel extends TurboModel<PlaylistData> {
    @modelSignal("name") public name: string;
    @modelSignal("songs") public songs: string[];
    @modelSignal("origin") public origin: Coordinate;
}