import {
    $, div, TurboButton,
    TurboSelect, TurboRichElement
} from "../../../../../build/turbodombuilder.esm";
import { box } from "../../demoBox/demoBox";
import "./select.css";

// Small helper to print the selection nicely
const logSelection = (label: string, sel: TurboSelect<any, any, any>) => {
    console.log(`[${label}] values=`, sel.selectedValues, "secondary=", sel.selectedSecondaryValues);
};

/* 1) Basics: values[] -> single select, forceSelection default */
function selectTest1() {
    const host = div({classes: "select-parent"});
    const sel = TurboSelect.create({ values: ["Alpha", "Beta", "Gamma"], parent: host });
    sel.onSelect = () => logSelection("basic", sel);

    const b = box("TurboSelect — Basics");
    b.addSubBox("host", host);
}

/* 2) Preselected via constructor + multiSelection */
function selectTest2() {
    const sel = TurboSelect.create({
        values: ["One", "Two", "Three", "Four"],
        selectedValues: ["Two", "Four"],
        multiSelection: true,
    });
    sel.onSelect = () => logSelection("multi", sel);

    const host = div({classes: "select-parent"});
    sel.parent = host;

    const b = box("TurboSelect — Multi selection");
    b.addSubBox("multi", host)
        .addContent(TurboButton.create({
            text: "Select One & Three (prog)",
            onClick: () => sel.selectedEntries = sel.findAll("One", "Three")
        }))
        .addContent(TurboButton.create({
            text: "Deselect all",
            onClick: () => sel.deselectAll()
        }));
}

/* 3) forceSelection = false (allow empty) + programmatic selectByIndex */
function selectTest3() {
    const sel = TurboSelect.create({
        values: ["A", "B", "C"],
        multiSelection: false,
    });
    sel.forceSelection = false; // allow no selection
    sel.onSelect = () => logSelection("force=false", sel);

    const host = div({classes: "select-parent"});
    sel.parent = host;

    const b = box("TurboSelect — forceSelection=false");
    b.addSubBox("host", host)
        .addContent(TurboButton.create({ text: "selectByIndex(2)", onClick: () => sel.selectByIndex(2) }))
        .addContent(TurboButton.create({ text: "Deselect all", onClick: () => sel.deselectAll() }));
}

/* 4) Custom mapping: getValue / getSecondaryValue / createEntry */
function selectTest4() {
    type Entry = HTMLElement;

    const sel = TurboSelect.create({
        values: [10, 20, 30],
    });

    // Secondary value (e.g., label code)
    sel.getSecondaryValue = (el: any) => el?.dataset?.code ?? "";

    // getValue reads number from data-value
    sel.getValue = (el: any) => Number(el?.dataset?.value ?? NaN);

    // createEntry maps number -> custom element w/ data attributes
    sel.createEntry = (num: number) => {
        const e = TurboRichElement.create({ text: `Item ${num}` }) as HTMLElement;
        e.dataset.value = String(num);
        e.dataset.code = `code-${num}`;
        return e;
    };

    // rebuild entries from values with our custom createEntry
    sel.values = [10, 20, 40, 50];

    sel.onSelect = () => logSelection("custom mapping", sel);

    const host = div({classes: "select-parent"});
    sel.parent = host;

    const b = box("TurboSelect — custom mapping");
    b.addSubBox("host", host)
        .addContent(TurboButton.create({ text: "Select value 40", onClick: () => sel.select(40) }))
        .addContent(TurboButton.create({ text: "Select by secondary (code-50)", onClick: () => {
                const entry = sel.findBySecondaryValue("code-50");
                if (entry) sel.select(entry);
            }}));
}

/* 5) Parent DOM observation: add/remove entries dynamically */
function selectTest5() {
    const host = div({classes: "select-parent"}); // container the select will watch
    const sel = TurboSelect.create({parent: host});

    // Start with two
    $(host).addChild([TurboRichElement.create({text: "Live-1"}), TurboRichElement.create({text: "Live-2"})]);
    // (select will auto-wire via MutationObserver; clicking an entry selects it)
    sel.onSelect = () => logSelection("DOM-observed", sel);

    const b = box("TurboSelect — DOM observation");
    b.addSubBox("host", host)
        .addContent(TurboButton.create({
            text: "Add node",
            onClick: () => $(host).addChild(TurboRichElement.create({text: "Live-" + Math.floor(Math.random() * 100)}))
        }))
        .addContent(TurboButton.create({
            text: "Remove last node",
            onClick: () => {
                const kids = host.children;
                if (kids.length) kids.item(kids.length - 1).remove();
            }
        }));
}

/* 6) Enable/Disable + callbacks */
function selectTest6() {
    const sel = TurboSelect.create({ values: ["Red", "Green", "Blue"] });
    const host = div({classes: "select-parent"});
    sel.parent = host;

    sel.onEnabled = (b, entry) => {
        // Default handler already toggles visibility; we’ll also add an aria-disabled
        if (entry instanceof HTMLElement) entry.setAttribute("aria-disabled", String(!b));
    };

    const [r, g, bEl] = sel.entries;
    const boxEl = box("TurboSelect — enable/disable");
    boxEl.addSubBox("host", host)
        .addContent(TurboButton.create({ text: "Disable Green", onClick: () => sel.enable(false, g as any) }))
        .addContent(TurboButton.create({ text: "Enable Green", onClick: () => sel.enable(true, g as any) }))
        .addContent(TurboButton.create({ text: "Disable all", onClick: () => sel.enable(false) }))
        .addContent(TurboButton.create({ text: "Enable all", onClick: () => sel.enable(true) }));
}

/* 7) Hidden input sync */
function selectTest7() {
    const sel = TurboSelect.create({ values: ["Cat", "Dog", "Bird"] });
    const host = div({classes: "select-parent"});
    sel.parent = host;
    sel.inputName = "pet"; // creates a hidden input next to host’s children

    sel.onSelect = () => {
        const input = sel.inputField;
        console.log("[hidden input] name=", input?.name, " value=", input?.value);
    };

    const b = box("TurboSelect — hidden input sync");
    b.addSubBox("host", host)
        .addContent(TurboButton.create({ text: "Select Dog", onClick: () => sel.select("Dog") }))
        .addContent(TurboButton.create({ text: "Select Bird", onClick: () => sel.select("Bird") }));
}

/* 8) Programmatic APIs & finders */
function selectTest8() {
    const sel = TurboSelect.create({ values: ["X", "Y", "Z"] });
    const host = div({classes: "select-parent"});
    sel.parent = host;

    const b = box("TurboSelect — API surface");
    b.addSubBox("host", host)
        .addContent(TurboButton.create({ text: "select('Y')", onClick: () => sel.select("Y") }))
        .addContent(TurboButton.create({ text: "selectByIndex(0)", onClick: () => sel.selectByIndex(0) }))
        .addContent(TurboButton.create({ text: "find('Z') & select", onClick: () => sel.select(sel.find("Z")) }))
        .addContent(TurboButton.create({ text: "Log enabled values", onClick: () => console.log("enabled:", sel.enabledValues) }));
}

/* 9) Tabbed menu (using TurboSelect as the tab controller) */
function selectTestTabs() {
    type Entry = HTMLElement;

    const tabSelect = TurboSelect.create<typeof TurboSelect<any, any, HTMLElement>>({
        createEntry: (label: string) => {
            const e = TurboRichElement.create({text: label});
            e.dataset.key = label.toLowerCase();
            return e;
        },
        getValue: (el) => el?.innerText ?? "",
        getSecondaryValue: (el) => el?.dataset?.key ?? "",
        values: ["Home", "Profile", "Settings"],
        selectedValues: ["Home"],
    });

    // Panels
    const panels = {
        home: div({ text: "🏠 Welcome home!" }),
        profile: div({ text: "👤 Your profile goes here." }),
        settings: div({ text: "⚙️ Configure your preferences." }),
    };

    const tabBar = div({ classes: "tabs-bar select-parent" });
    const tabPanels = div({ classes: "tabs-panels" });

    // Hook select -> show/hide panels
    tabSelect.onSelect = () => {
        const activeKey = tabSelect.selectedSecondaryValue;
        for (const [key, panel] of Object.entries(panels)) {
            $(panel).toggleClass("is-active", key === activeKey)
                .setStyle("display", key === activeKey ? "" : "none");
        }
    };

    // Mount
    tabSelect.parent = tabBar;
    $(tabPanels).addChild([panels.home, panels.profile, panels.settings]);
    // initialize visibility
    tabSelect.onSelect?.fire(true, tabSelect.selectedEntry, tabSelect.getIndex(tabSelect.selectedEntry));

    const b = box("TurboSelect — Tabbed menu");
    b.addSubBox("Tabs", tabBar);
    b.addSubBox("Panels", tabPanels);
}

export function setupSelectTests() {
    selectTest1();
    selectTest2();
    selectTest3();
    selectTest4();
    selectTest5();
    selectTest6();
    selectTest7();
    selectTest8();
    selectTestTabs();
}
