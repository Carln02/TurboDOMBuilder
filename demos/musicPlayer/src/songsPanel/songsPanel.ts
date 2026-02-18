import {define, element, TurboElement, TurboModel} from "../../../../build/turbodombuilder.esm";
import {SongsPanelView} from "./songsPanel.view";
import {SongsPanelData, SongsPanelProperties} from "./songsPanel.types";
import "./songsPanel.css";

@define("turbo-songs-panel")
export class SongsPanel extends TurboElement<SongsPanelView, SongsPanelData> {
}

export function songsPanel(properties: SongsPanelProperties = {}) {
    if (!properties.tag) properties.tag = "turbo-songs-panel";
    if (!properties.view) properties.view = SongsPanelView;
    if (!properties.model) properties.model = TurboModel;
    return element(properties);
}