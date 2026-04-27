import {TurboView, TurboSelect, div, turbo, untrack, effect, TurboInput, getRegisteredEntry, TurboRichElement} from "../../../../build/turbodombuilder.esm";
import {EditObject} from "./editObject";

export class EditObjectView extends TurboView<EditObject> {
    private readonly tabs: Map<string, HTMLElement> = new Map();

    private tabSelector: TurboSelect;
    private tabsParent: HTMLElement;

    private panelSelector: TurboSelect;
    private panelsParent: HTMLElement;

    protected setupUIElements() {
        super.setupUIElements();

        this.tabs.set("Properties", div({classes: "properties-panel"}));
        this.tabs.set("MVC", div({classes: "mvc-panel"}));

        this.tabsParent = div({classes: "tabs"});
        this.panelsParent = div({classes: "panels"});
        this.panelSelector = TurboSelect.create<any>({entries: Array.from(this.tabs.values()), parent: this.panelsParent});
        this.tabSelector = TurboSelect.create<any>({values: Array.from(this.tabs.keys()), parent: this.tabsParent});

        this.tabSelector.onSelect.add((b, entry) => {
            if (!b) return;
            const panel = this.tabs.get(this.tabSelector.getValue(entry));
            this.panelSelector.select(panel);
        });
        this.tabSelector.select("MVC").select("Properties");
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild([this.tabsParent, this.panelsParent]);
    }

    @effect updateProperties() {
        const anchor = this.element.anchor;
        if (!anchor) return;
        const panel = this.tabs.get("Properties");
        if (!panel) return;
        turbo(panel).removeAllChildren();

        untrack(() => {
            const properties = turbo(anchor).getFields();
            for (const [key, value] of Object.entries(properties)) {
                if (value === undefined || value === null) continue;
                const input = TurboInput.create({label: key, parent: panel, value});
                let timer: number;
                input.onInput.add(() => {
                    cancelAnimationFrame(timer);
                    timer = requestAnimationFrame(() => anchor[key] = input.value);
                });
            }
        })
    }

    @effect updateMVC() {
        const panel = this.tabs.get("MVC");
        if (!panel) return;
        turbo(panel).removeAllChildren();
        const mvc = turbo(this.element.anchor).mvc;
        for (const value of Object.values(mvc)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
                for (const entry of value) {
                    const registryEntry = getRegisteredEntry(entry);
                    if (!registryEntry) continue;
                    TurboRichElement.create({text: registryEntry.name, parent: panel});
                }
                continue;
            }
            const registryEntry = getRegisteredEntry(value);
            if (!registryEntry) continue;
            TurboRichElement.create({text: registryEntry.name, parent: panel});
        }
    }
}