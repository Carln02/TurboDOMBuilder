import {SongData} from "../song/song.types";
import {TurboElementProperties} from "../../../../build/turbodombuilder.esm";
import {SongsPanelView} from "./songsPanel.view";

export type SongsPanelData = SongData[];

export type SongsPanelProperties = TurboElementProperties<SongsPanelView, SongsPanelData>;