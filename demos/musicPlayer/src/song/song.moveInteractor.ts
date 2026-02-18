import {ClosestOrigin, Coordinate, turbo, TurboDragEvent, TurboInteractor} from "../../../../build/turbodombuilder.esm";
import {SongView} from "./song.view";
import {SongModel} from "./song.model";
import {Song} from "./song";
import {SongState} from "./song.types";
import {Playlist} from "../playlist/playlist";

export class SongMoveInteractor extends TurboInteractor<Song, SongView, SongModel> {
    public toolName = "select";
    private clone: Song;
    private clonePosition: Coordinate;

    private get originParent(): Playlist | null {
        let parent = this.element.parentElement;
        while (parent && parent !== document.body && !(parent instanceof Playlist)) parent = parent.parentElement;
        return parent instanceof Playlist ? parent : null;
    }

    public dragStart(e: Event): boolean | void {
        this.clone = this.element.cloneNode(true) as Song;
        const computedStyle = this.element.getBoundingClientRect();
        this.clonePosition = {x: computedStyle.left, y: computedStyle.top};

        turbo(this.clone).setStyles({position: "absolute", top: 0, left: 0}).addToParent(document.body);
        this.updatePosition();
        this.model.state = SongState.moving;
        return true;
    }

    public drag(e: TurboDragEvent): boolean | void {
        this.updatePosition(e.scaledDeltaPosition);
        return true;
    }

    public dragEnd(e: TurboDragEvent): boolean | void {
        this.clonePosition = undefined;
        this.clone.remove();
        this.clone = undefined;
        this.model.state = SongState.default;

        const targetPlaylist = e.closest(Playlist, false, ClosestOrigin.position);
        if (!targetPlaylist) return true;
        this.originParent?.removeSong(this.element);
        targetPlaylist.addSong(this.element, e.scaledPosition.y);
        return true;
    }

    private updatePosition(delta: Coordinate = {x: 0, y: 0}) {
        this.clonePosition = {x: this.clonePosition.x + delta.x, y: this.clonePosition.y + delta.y};
        if (this.clone) turbo(this.clone).setStyle("transform",
            `translate(${this.clonePosition.x}px, ${this.clonePosition.y}px)`);
    }
}