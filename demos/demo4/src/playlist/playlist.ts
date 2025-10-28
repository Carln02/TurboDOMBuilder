import {Coordinate, define, element, expose, isUndefined, TurboElement, substrate} from "../../../../build/turbodombuilder.esm";
import {PlaylistView} from "./playlist.view";
import {PlaylistData, PlaylistProperties} from "./playlist.types";
import {PlaylistModel} from "./playlist.model";
import "./playlist.css";
import {Song} from "../song/song";
import {PlaylistSubstrate} from "./playlist.substrate";

@define("turbo-playlist")
export class Playlist extends TurboElement<PlaylistView, PlaylistData, PlaylistModel> {
    @expose("model") public origin: Coordinate;
    @substrate("substrate") private substrate: PlaylistSubstrate;

    public addSong(song: Song, yCoordinate: number) {
        if (!this.substrate.testAddingSong(song)) return;
        const targetIndex = this.getSongIndexFromCoordinate(yCoordinate);
        if (!isUndefined(targetIndex)) this.model.songs.splice(targetIndex, 0, song.id);
        else this.model.songs.push(song.id);
        this.view.updateSongs();
    }

    public removeSong(song: Song) {
        const id = this.model.songs.indexOf(song.id);
        if (id >= 0) this.model.songs.splice(id, 1);
        this.view.updateSongs();
    }

    private getSongIndexFromCoordinate(yCoordinate: number) {
        let smallestY = Infinity;
        let targetIndex: number;

        this.view.songElements.forEach((entry, index) => {
            const rect = entry.getBoundingClientRect();
            if (rect.top < smallestY && rect.top > yCoordinate) {
                smallestY = rect.top;
                targetIndex = index;
            }
        });

        return targetIndex;
    }

    public delete() {
        this.remove();
    }
}

export function playlist(properties: PlaylistProperties = {}): Playlist {
    if (!properties.tag) properties.tag = "turbo-playlist";
    if (!properties.view) properties.view = PlaylistView;
    if (!properties.model) properties.model = PlaylistModel;
    if (!properties.substrates) properties.substrates = PlaylistSubstrate;
    return element(properties) as Playlist;
}