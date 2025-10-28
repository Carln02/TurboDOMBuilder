import {songsPanel} from "./songsPanel/songsPanel";
import {div, icon, TurboEventManager, TurboIcon} from "../../../build/turbodombuilder.esm";
import "./main.css";
import "./scrollbar.css";
import {toolbar} from "./toolbar/toolbar";
import {NewPlaylistTool} from "./tools/newPlaylist/newPlaylist.tool";
import {NewPlaylistModel} from "./tools/newPlaylist/newPlaylist.model";
import {SelectTool} from "./tools/select/select.tool";
import {DataHandler} from "./dataHandler";
import {DeleteTool} from "./tools/delete/delete.tool";

TurboIcon.config.defaultDirectory = "assets";
TurboEventManager.instance.preventDefaultWheel = false;

const canvasEl = div({id: "canvas", parent: document.body});
const toolbarEl = toolbar({parent: document.body});

toolbarEl.addTool(icon({icon: "cursor", tools: SelectTool}));

const newPlaylistTool = icon({icon: "new-playlist", tools: NewPlaylistTool, model: NewPlaylistModel});
newPlaylistTool.model.target = canvasEl;
toolbarEl.addTool(newPlaylistTool);

toolbarEl.addTool(icon({icon: "trash", tools: DeleteTool}));

DataHandler.getSongs().then(data => songsPanel({data, parent: document.body}));