import {addStylesheet} from "../../turbo-functions/style-manipulation/add-stylesheet";
import {StylesRoot} from "../../core/definitions/turbo-types";

class StylesRecord {
    private addedStylesheets: Map<StylesRoot, Set<string>> = new Map();

    private getStylesheets(root: StylesRoot): Set<string> {
        let stylesheets = this.addedStylesheets.get(root);

        if (!stylesheets) {
            this.addedStylesheets.set(root, new Set());
            stylesheets = this.addedStylesheets.get(root);
        }

        return stylesheets;
    }

    public addStylesheet(styles: string, id: string, root: StylesRoot = document.head) {
        if (!styles || styles.length == 0) return;
        let stylesheets = this.getStylesheets(root);
        if (stylesheets.has(id)) return;

        addStylesheet(styles);
        stylesheets.add(id);
    }
}

export {StylesRecord};