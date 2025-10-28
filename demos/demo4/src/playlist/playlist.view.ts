import {
    css,
    DefaultEventName,
    drawer, effect,
    richElement,
    Side,
    turbo,
    TurboDrawer,
    TurboRichElement,
    TurboView
} from "../../../../build/turbodombuilder.esm";
import {Playlist} from "./playlist";
import {PlaylistModel} from "./playlist.model";
import {Song, song} from "../song/song";
import {DataHandler} from "../dataHandler";

export class PlaylistView extends TurboView<Playlist, PlaylistModel> {
    private drawer: TurboDrawer;
    private toggle: TurboRichElement;
    private emptyDrawer: HTMLElement;

    public songElements: Song[] = [];

    protected setupUIElements() {
        super.setupUIElements();
        this.drawer = drawer({side: Side.bottom, hideOverflow: true, offset: {open: 20}});
        this.toggle = richElement({leftIcon: "album-cover"});
        this.emptyDrawer = richElement({
            classes: "empty-playlist-placeholder",
            leftIcon: "add-song",
            text: "Drag and drop songs here to add them to the playlist."
        });
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild([this.toggle, this.drawer]);
        this.drawer.thumb.style.display = "none";
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(this).on(DefaultEventName.click, () => {
            this.drawer.open = !this.drawer.open;
            return true;
        });
    }

    @effect private updateColor() {
        this.toggle.leftIcon.style.fill = this.model.color;
    }

    @effect private updateName() {
        const newEl = !this.toggle.element;
        this.toggle.element = this.model.name;
        if (newEl) {
            (this.toggle.element as HTMLElement).contentEditable = "true";
            turbo(this.toggle.element).bypassManagerOn = () => true;
            turbo(this.toggle.element).on(DefaultEventName.click, () => {
                this.toggle.element.focus();
                return true;
            });
        }
    }

    @effect private updatePosition() {
        turbo(this).setStyle("transform", css`translate(
            calc(${this.model.origin.x}px - 50%), 
            calc(${this.model.origin.y}px - 50%)
        )`);
    }

    @effect public updateSongs() {
        if (!this.model.songs || !this.model.songs.length) {
            turbo(this.drawer.panel).removeAllChildren().addChild(this.emptyDrawer);
            return;
        }

        turbo(this.drawer.panel).removeAllChildren();
        this.songElements = [];

        this.model.songs.forEach(id =>
            DataHandler.getSong(id).then(data =>
                this.songElements.push(song({data, parent: this.drawer}))
            ));
    }
}