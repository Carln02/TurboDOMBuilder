import {Coordinate, TurboElementProperties} from "../../../../build/turbodombuilder.esm";
import {PlaylistView} from "./playlist.view";
import {PlaylistModel} from "./playlist.model";

export type PlaylistData = {
    name: string,
    songs: string[],
    origin: Coordinate
}

export type PlaylistProperties = TurboElementProperties<PlaylistView, PlaylistData, PlaylistModel>;