import {DefaultEventName, div, turbo, turboInput, TurboInput, TurboSelect, TurboView} from "../../../../build/turbodombuilder.esm";
import {SongsPanel} from "./songsPanel";
import {Song, song} from "../song/song";

export class SongsPanelView extends TurboView<SongsPanel> {
    private search: TurboInput;
    private panel: HTMLElement;
    private select: TurboSelect<string, string, Song>;

    protected setupUIElements() {
        super.setupUIElements();
        this.search = turboInput({rightIcon: "search", input: {type: "search", placeholder: "Search..."}});
        this.panel = div({classes: "songs-panel-container"});

        this.select = new TurboSelect({
            parent: this.panel,
            getValue: entry => entry.title,
            getSecondaryValue: entry => entry.artist,
            onEnabled: (b, entry) => turbo(entry).setStyle("display", b ? "" : "none"),
        });

        this.model.data
            .sort((a, b) => a.title.localeCompare(b.title))
            .forEach(entry => this.select.addEntry(song({data: entry})));
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild([this.search, this.panel]);
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(this.search).on(DefaultEventName.input, () => {
            const value = this.search.value.toLowerCase();
            this.select.entriesArray.forEach(entry => {
                const enable = entry.title.toLowerCase().includes(value)
                    || entry.artist.toLowerCase().includes(value)
                    || entry.album.toLowerCase().includes(value);
                this.select.enable(enable, entry);
            });
        });
    }
}