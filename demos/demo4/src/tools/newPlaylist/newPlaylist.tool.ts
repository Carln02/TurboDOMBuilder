import {
    ClickMode,
    randomColor,
    turbo,
    TurboElement,
    TurboEvent,
    TurboTool,
    TurboView
} from "../../../../../build/turbodombuilder.esm";
import {NewPlaylistModel} from "./newPlaylist.model";
import {playlist} from "../../playlist/playlist";

export class NewPlaylistTool extends TurboTool<TurboElement, TurboView, NewPlaylistModel> {
    public toolName = "newPlaylist";

    public onActivation() {
        turbo(this).toggleClass("selected", true);
    }

    public onDeactivation() {
        turbo(this).toggleClass("selected", false);
    }

    public click(e: TurboEvent, target: Node): boolean {
        if (target !== this.model.target && target !== document.body) return;
        turbo(this.model.target).addChild(playlist({
            data: {
                name: "Playlist " + NewPlaylistModel.playlistCount,
                songs: [],
                origin: e.scaledPosition
            }
        }));
        NewPlaylistModel.playlistCount++;
    }
}