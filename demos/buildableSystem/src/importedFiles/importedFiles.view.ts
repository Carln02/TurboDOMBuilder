import {TurboView, TurboButton, input, turbo, div, TurboRichElement, span} from "../../../../build/turbodombuilder.esm";
import {ImportedFiles} from "./importedFiles";
import {PluginEntry} from "./importedFiles.types";
import {ImportedFilesModel} from "./importedFiles.model";

export class ImportedFilesView extends TurboView<ImportedFiles, ImportedFilesModel> {
    private addFilesButton: TurboButton;
    private addFilesInput: HTMLInputElement;
    private dropZone: HTMLElement;
    private pluginList: HTMLElement;

    public initialize() {
        super.initialize();
        this.model.generateObserver({
            onAdded: (value: any, _self: any, name: string) => this.createPluginItem(name, value)
        });
    }
    protected setupUIElements() {
        super.setupUIElements();
        this.addFilesInput = input({type: "file", multiple: true, accept: ".ts,.js", hidden: true});
        this.addFilesButton = TurboButton.create({leftIcon: "add", text: "Add", onClick: () => this.addFilesInput.click()});
        this.dropZone = div({classes: "drop-zone", children: span({text: "Drop .ts / .js files here"})});
        this.pluginList = div({classes: "plugin-list"});
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this.element.popup).addChild([this.dropZone, this.addFilesButton, this.addFilesInput, this.pluginList]);
    }

    protected setupUIListeners() {
        super.setupUIListeners();

        this.addFilesInput.addEventListener("change", () => {
            if (this.addFilesInput.files?.length) {
                this.model.filesHandler.processFiles(this.addFilesInput.files).catch(console.error);
                this.addFilesInput.value = "";
            }
        });

        this.dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            this.dropZone.classList.add("drag-over");
        });

        ["dragleave", "dragend"].forEach(evt =>
            this.dropZone.addEventListener(evt, () =>
                this.dropZone.classList.remove("drag-over"))
        );

        this.dropZone.addEventListener("drop", e => {
            e.preventDefault();
            this.dropZone.classList.remove("drag-over");
            if (e.dataTransfer?.files.length) {
                this.model.filesHandler.processFiles(e.dataTransfer.files).catch(console.error);
            }
        });
    }

    private createPluginItem(name: string, entry: PluginEntry): HTMLElement {
        const removeBtn = TurboButton.create({
            text: "✕",
            classes: "imported-files-remove",
            onClick: () => this.model.delete(name),
        });

        const classTags = entry.classes.length
            ? entry.classes.map(c =>
                span({text: c, classes: "imported-files-class-tag"})
            )
            : [span({text: "no classes", classes: "imported-files-class-tag muted"})];

        const meta = div({classes: "imported-files-meta", children: [
                span({text: formatSize(entry.size)}),
                span({text: entry.addedAt.toLocaleTimeString()}),
                ...classTags,
            ]});

        return TurboRichElement.create({text: name});
        // return element({tag: "li", classes: "imported-files-item", children: [
        //         span({text: name, classes: "imported-files-name"}),
        //         meta,
        //         removeBtn,
        //     ]});
    }
}

function formatSize(bytes: number): string {
    return bytes < 1024 ? `${bytes}B` : `${(bytes / 1024).toFixed(1)}KB`;
}