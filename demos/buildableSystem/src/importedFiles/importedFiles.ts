import {define, TurboButtonPopup} from "../../../../build/turbodombuilder.esm";
import {ImportedFilesView} from "./importedFiles.view";
import {ImportedFilesFilesHandler} from "./importedFiles.filesHandler";
import {ImportedFilesModel} from "./importedFiles.model";

export class ImportedFiles extends TurboButtonPopup {
    public static defaultProperties = {
        view: ImportedFilesView,
        handlers: ImportedFilesFilesHandler,
        model: ImportedFilesModel,
        data: new Map()
    }
}
define(ImportedFiles);