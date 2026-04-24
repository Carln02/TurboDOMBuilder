import {$, div, span, TurboDropdown, PopupFallbackMode, TurboPopup, TurboButton, TurboRichElement} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";

TurboDropdown.defaultProperties.popupClasses = "select-parent";

function ddTest1() {
    const dd = TurboDropdown.create({values: ["Alpha", "Beta", "Gamma", "Delta"]});
    box("TurboDropdown — Basics")
        .addSubBox("click selector to open", dd)
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => {
                console.log("[dd1] selected:", dd.selectedValue, dd.selectedValues)
            }
        }));
}

function ddTest2() {
    const dd = TurboDropdown.create({
        values: ["Small", "Medium", "Large", "XL"],
        selectorTag: "h5" as any,
        selectorClasses: ["btn", "btn--ghost"],
        popupClasses: ["popup-surface", "popup--elevated"]
    });

    box("TurboDropdown — custom selector / popup")
        .addSubBox("custom tag & classes", dd)
        .addContent(TurboButton.create({
            text: "Open",
            onClick: () => (dd as any).popup.show(true)
        }))
        .addContent(TurboButton.create({
            text: "Close",
            onClick: () => (dd as any).popup.show(false)
        }));
}

function ddTest3() {
    const entries = [
        TurboRichElement.create({text: "Home", leftIcon: "link"}),
        TurboRichElement.create({text: "Profile", leftIcon: "chevron-left"}),
        TurboRichElement.create({text: "Settings", leftIcon: "chevron-top"}),
        TurboRichElement.create({text: "Logout", leftIcon: "share"}),
    ];

    box("TurboDropdown — element entries")
        .addSubBox("rich entries", TurboDropdown.create({entries}))
        .addContent(span({text: "Selected: "}))
        .addContent(span({text: "(watch selector text update on click)"}));
}

function ddTest4() {
    const dd = TurboDropdown.create({values: ["One", "Two"]});

    box("TurboDropdown — dynamic entries")
        .addSubBox("start", dd)
        .addContent(TurboButton.create({
            text: "Add entry: Three",
            onClick: () => {
                const entry = TurboRichElement.create({text: "Three", leftIcon: "chevron-left"});
                (dd.select as any).addEntry(entry);
            }
        }))
        .addContent(TurboButton.create({
            text: "Remove last entry",
            onClick: () => {
                const list = dd.select.entries;
                const last = list[list.length - 1];
                if (last instanceof HTMLElement) last.remove();
                //TODO MAKE A REMOVE ENTRY FN
            }
        }))
        .addContent(TurboButton.create({
            text: "Log values",
            onClick: () => console.log("[dd4] values:", dd.select.values)
        }));
}

function ddTest5() {
    const dd = TurboDropdown.create({values: ["Red", "Green", "Blue", "Yellow"]});

    // Configure the underlying select for multi
    dd.select.multiSelection = true;
    dd.select.forceSelection = false;

    box("TurboDropdown — multi selection")
        .addSubBox("click multiple entries", dd)
        .addContent(TurboButton.create({
            text: "Select All",
            onClick: () => dd.select.selectedEntries = dd.select.entries
        }))
        .addContent(TurboButton.create({
            text: "Clear",
            onClick: () => dd.select.deselectAll()
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[dd5] selected:", dd.selectedValues)
        }));
}

function ddTest6() {
    const dd = TurboDropdown.create({
        values: ["Top", "Middle", "Bottom", "Custom"]
    });

    const p = dd.popup as TurboPopup;

    box("TurboDropdown — popup anchors & fallback")
        .addSubBox("dropdown", dd)
        .addContent(TurboButton.create({
            text: "ParentAnchor: top (50,0)", onClick: () => {
                p.anchorPosition = {x: 50, y: 0};
                p.show(true);
                return true;
            }
        }))
        .addContent(TurboButton.create({
            text: "ParentAnchor: bottom (50,100)", onClick: () => {
                p.anchorPosition = {x: 50, y: 100};
                p.show(true);
                return true;
            }
        }))
        .addContent(TurboButton.create({
            text: "PopupAnchor: top (50,0)", onClick: () => {
                p.popupPosition = {x: 50, y: 0};
                p.show(true);
                return true;
            }
        }))
        .addContent(TurboButton.create({
            text: "PopupAnchor: bottom (50,100)", onClick: () => {
                p.popupPosition = {x: 50, y: 100};
                p.show(true);
                return true;
            }
        }))
        .addContent(TurboButton.create({
            text: "Fallback: invert", onClick: () => {
                p.fallbackModes = PopupFallbackMode.invert;
                p.show(true);
                return true;
            }
        }))
        .addContent(TurboButton.create({
            text: "Fallback: offset", onClick: () => {
                p.fallbackModes = PopupFallbackMode.offset;
                p.show(true);
                return true;
            }
        }));
}

function ddTest7() {
    const dd = TurboDropdown.create({values: ["A", "B", "C", "D"]});

    box("TurboDropdown — programmatic")
        .addSubBox("start", dd)
        .addContent(TurboButton.create({
            text: "Open",
            onClick: () => (dd as any).popup.show(true)
        }))
        .addContent(TurboButton.create({
            text: "Close",
            onClick: () => (dd as any).popup.show(false)
        }))
        .addContent(TurboButton.create({
            text: "Select 'C'",
            onClick: () => dd.select.select("C")
        }))
        .addContent(TurboButton.create({
            text: "Replace values",
            onClick: () => dd.values = ["Epsilon", "Zeta", "Eta"]
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[dd7] value:", dd.selectedValue)
        }));
}

function ddTestTabs() {
    const tabs = [
        {key: "overview", label: "Overview", content: div({text: "Overview content..."})},
        {key: "details", label: "Details", content: div({text: "Details content..."})},
        {key: "stats", label: "Stats", content: div({text: "Stats content..."})},
    ];

    const entries = tabs.map(t =>
        TurboRichElement.create({text: t.label, leftIcon: "chevron-left"})
    );

    const dd = TurboDropdown.create({entries});

    const contentWrap = div({
        classes: "tab-content",
        children: [tabs[0].content]
    });

    // When selection changes, render the corresponding panel
    dd.select.onSelect = (_b, entry) => {
        const label = (entry as HTMLElement).innerText;
        const tab = tabs.find(t => t.label === label);
        if (!tab) return;
        $(contentWrap).addChild([tab.content]);
        if ((dd.selector as any)?.text !== label) (dd.selector as any).text = label; // extra safety for non-TurboButton selectors
    };

    box("TurboDropdown — Tabbed menu")
        .addSubBox("tabs (select to switch)", dd)
        .addSubBox("panel", contentWrap);
}

export function setupDropdownTests() {
    ddTest1();
    ddTest2();
    ddTest3();
    ddTest4();
    ddTest5();
    ddTest6();
    ddTest7();
    ddTestTabs();
}