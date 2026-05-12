import {TurboModel, handler} from "../../../../build/turbodombuilder.esm";
import {PluginEntry} from "./importedFiles.types";
import {ImportedFilesFilesHandler} from "./importedFiles.filesHandler";

export class ImportedFilesModel extends TurboModel<Map<string, PluginEntry>> {
    @handler() public filesHandler: ImportedFilesFilesHandler;

    public clear(clearData: boolean = true) {
        for (const entry of this.values) URL.revokeObjectURL(entry.blobUrl);
        super.clear(clearData);
    }

    protected deleteAction(data: any, key: string) {
        const entry = this.getAction(data, key);
        if (!entry) return;
        URL.revokeObjectURL(entry.blobUrl);
        super.deleteAction(data, key);
    }
}