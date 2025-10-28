import {TurboSubstrate} from "../../../../build/turbodombuilder.esm";
import {Playlist} from "./playlist";
import {PlaylistView} from "./playlist.view";
import {PlaylistModel} from "./playlist.model";
import {Song} from "../song/song";

export class PlaylistSubstrate extends TurboSubstrate<Playlist, PlaylistView, PlaylistModel> {
    public keyName = "substrate";
    public substrateName = "playlist";

    public testAddingSong(song: Song) {
        return !this.model.songs.find(entry => entry === song.id);
    }
}