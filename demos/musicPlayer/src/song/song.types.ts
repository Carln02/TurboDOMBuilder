import {TurboElementProperties} from "../../../../build/turbodombuilder.esm";
import {SongModel} from "./song.model";
import {SongView} from "./song.view";

export type SongData = {
    id: string,
    title: string,
    album: string,
    artist: string,
    cover?: string,
    duration?: number
};

export type SongProperties = TurboElementProperties<SongView, SongData, SongModel>;

export enum SongState {
    default = "default",
    moving = "moving",
}