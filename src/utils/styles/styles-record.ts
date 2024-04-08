import {addStylesheet} from "../../turbo-functions/style-manipulation/add-stylesheet";
import {addStylesheetFile} from "../../turbo-functions/style-manipulation/add-stylesheet-file";

class StylesRecord {
    private addedStylesheets: Map<ShadowRoot | HTMLHeadElement, Set<string>> = new Map();

    private getStylesheets(root: ShadowRoot | HTMLHeadElement): Set<string> {
        let stylesheets = this.addedStylesheets.get(root);

        if (!stylesheets) {
            this.addedStylesheets.set(root, new Set());
            stylesheets = this.addedStylesheets.get(root);
        }

        return stylesheets;
    }

    public addStylesheet(styles: string, id: string, root: ShadowRoot | HTMLHeadElement = document.head) {
        if (!styles || styles.length == 0) return;
        let stylesheets = this.getStylesheets(root);
        if (stylesheets.has(id)) return;

        addStylesheet(styles);
        stylesheets.add(id);
    }

    public addStylesheetFile(href: string, id: string, root: ShadowRoot | HTMLHeadElement = document.head) {
        if (!href || href.length == 0) return;
        let stylesheets = this.getStylesheets(root);
        if (stylesheets.has(id)) return;

        addStylesheetFile(href);
        stylesheets.add(id);
    }
}

export {StylesRecord};