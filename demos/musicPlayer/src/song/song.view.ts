import {effect, flexCol, h3, h4, img, spacer, turbo, TurboView} from "../../../../build/turbodombuilder.esm";
import {Song} from "./song";
import {SongModel} from "./song.model";
import {SongState} from "./song.types";

export class SongView extends TurboView<Song, SongModel> {
    private cover: HTMLImageElement;
    private title: HTMLElement;
    private artist: HTMLElement;
    private duration: HTMLElement;

    protected setupUIElements() {
        super.setupUIElements();
        this.cover = img({alt: "album cover", classes: "song-cover"});
        this.title = h3({classes: "song-title"});
        this.artist = h4({classes: "song-artist"});
        this.duration = h4({classes: "song-duration"});
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild([
            this.cover,
            flexCol({children: [this.title, this.artist]}),
            spacer(),
            this.duration,
        ]);
    }

    @effect private updateCover() {
        let coverUrl = this.model.cover;
        if (!coverUrl || coverUrl.length === 0) coverUrl = "assets/album-cover.svg";
        this.cover.src = coverUrl;
    }

    @effect private updateTitle() {
        this.title.textContent = this.model.title;
    }

    @effect private updateArtist() {
        this.artist.textContent = this.model.artist;
    }

    @effect private updateDuration() {
        const duration = Math.floor(this.model.duration / 1000);
        const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
        const seconds = String(duration % 60).padStart(2, "0");
        this.duration.textContent = `${minutes}:${seconds}`;
    }

    @effect private stateChange() {
        turbo(this).setStyle("opacity", this.model.state === SongState.moving ? 0.5 : 1);
    }
}