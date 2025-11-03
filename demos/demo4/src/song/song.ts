import {define, element, expose, TurboElement} from "../../../../build/turbodombuilder.esm";
import {SongView} from "./song.view";
import {SongData, SongProperties} from "./song.types";
import {SongModel} from "./song.model";
import "./song.css";
import {SongMoveInteractor} from "./song.moveInteractor";

@define("turbo-song")
export class Song extends TurboElement<SongView, SongData, SongModel> {
    @expose("model") public id: string;
    @expose("model") public title: string;
    @expose("model") public artist: string;
    @expose("model") public album : string;

    public isSong(id: string): boolean {
        return id === this.model.id;
    }

    public delete() {
        this.remove();
    }
}

export function song(properties: SongProperties = {}): Song {
    if (!properties.tag) properties.tag = "turbo-song";
    if (!properties.view) properties.view = SongView;
    if (!properties.model) properties.model = SongModel;
    if (!properties.interactors) properties.interactors = [SongMoveInteractor];
    return element(properties) as Song;
}