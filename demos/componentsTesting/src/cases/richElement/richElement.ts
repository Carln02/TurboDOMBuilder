import {TurboIcon, div, span, TurboRichElement, TurboButton, Color
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import "./richElement.css";

function richTest1() {
    // Basics: element as text, left/right icons, prefix/suffix strings
    const r1 = TurboRichElement.create({
        text: "Hello world",
        leftIcon: "chevron-left",
        rightIcon: "chevron-top",
        prefixEntry: "pre",
        suffixEntry: "suf"
    });

    box("RichElement — Basics")
        .addSubBox("basic composition", r1);
}

function richTest2() {
    // String→in-place update (prefix/suffix), icon string→instance reuse
    const r = TurboRichElement.create({
        text: "Editable",
        leftIcon: "link",
        rightIcon: "share",
        prefixEntry: "prefix",
        suffixEntry: "suffix"
    });

    box("RichElement — in-place updates")
        .addSubBox("start", r)
        .addContent(TurboButton.create({
            text: "prefix = 'PRE*'",
            onClick: () => r.prefixEntry = "PRE*"
        }))
        .addContent(TurboButton.create({
            text: "suffix = 'SUF*'",
            onClick: () => r.suffixEntry = "SUF*"
        }))
        .addContent(TurboButton.create({
            text: "leftIcon = 'chevron-top' (reuses instance)",
            onClick: () => r.leftIcon = "chevron-top"
        }))
        .addContent(TurboButton.create({
            text: "rightIcon = 'chevron-left' (reuses instance)",
            onClick: () => r.rightIcon = "chevron-left"
        }))
        .addContent(TurboButton.create({
            text: "text = 'Updated!'",
            onClick: () => r.text = "Updated!"
        }));
}

function richTest4() {
    // Replace center element with custom element; also provide via object props
    const r = TurboRichElement.create({text: "Center text"});

    box("RichElement — center replacement")
        .addSubBox("start", r)
        .addContent(TurboButton.create({
            text: "element = pill('CENTER')",
            onClick: () => r.element = div({text: "CENTER", style: "background: " + Color.random().toString(), classes: "pill"})
        }))
        .addContent(TurboButton.create({
            text: "element = { tag:'span', text:'from props' }",
            onClick: () => r.element = {tag: "span", text: "from props"}
        }))
        .addContent(TurboButton.create({
            text: "element = 'Back to string'",
            onClick: () => r.element = "Back to string"
        }));
}

function richTest5() {
    // Left/Right custom elements array + ordering check
    const r = TurboRichElement.create({
        text: "Order matters",
        leftIcon: "link",
        rightIcon: "share",
    });

    box("RichElement — custom elements & order")
        .addSubBox("base", r)
        .addContent(TurboButton.create({
            text: "leftCustomElements = [pill('L1'), pill('L2')]",
            onClick: () => r.leftCustomElements = [
                div({text: "L1", style: "background: " + Color.random().toString(), classes: "pill"}),
                div({text: "L2", style: "background: " + Color.random().toString(), classes: "pill"})
            ]
        }))
        .addContent(TurboButton.create({
            text: "rightCustomElements = [pill('R1')]",
            onClick: () => r.rightCustomElements = div({
                text: "R1",
                style: "background: " + Color.random().toString(),
                classes: "pill"
            })
        }))
        .addContent(TurboButton.create({
            text: "prefixEntry = 'P:'; suffixEntry = ':S'",
            onClick: () => {
                r.prefixEntry = "P:";
                r.suffixEntry = ":S";
            }
        }))
        .addContent(TurboButton.create({
            text: "Swap text",
            onClick: () => r.text = "Order still good?"
        }));
}

function richTest6() {
    // Icon instances reuse & property updates on the instance
    const left = TurboIcon.create({icon: "chevron-left", type: "svg"}) as TurboIcon;
    const right = TurboIcon.create({icon: "chevron-top", type: "svg"}) as TurboIcon;

    const r = TurboRichElement.create({
        text: "Reuse icon instances",
        leftIcon: left,
        rightIcon: right
    });

    box("RichElement — icon instance reuse")
        .addSubBox("start", r)
        .addContent(TurboButton.create({
            text: "leftIcon.icon = 'link'",
            onClick: () => left.icon = "link"
        }))
        .addContent(TurboButton.create({
            text: "rightIcon.icon = 'share'",
            onClick: () => right.icon = "share"
        }))
        .addContent(TurboButton.create({
            text: "replace leftIcon with string (new)",
            onClick: () => r.leftIcon = "photo"
        }))
        .addContent(TurboButton.create({
            text: "replace rightIcon with instance (back)",
            onClick: () => r.rightIcon = right
        }));
}

function richTest7() {
    // Stress: rapid flips across all parts to smoke test addAtPosition & cleanup
    const r = TurboRichElement.create({
        text: "Stress me",
        leftIcon: "link",
        rightIcon: "share",
        prefixEntry: "pre",
        suffixEntry: "suf"
    });

    box("RichElement — stress / race-ish")
        .addSubBox("start", r)
        .addContent(TurboButton.create({
            text: "Rapid flip 12x",
            onClick: () => {
                let i = 0;
                const id = setInterval(() => {
                    r.text = "Tick " + i;
                    r.prefixEntry = (i % 2) ? "P" : "PRE";
                    r.suffixEntry = (i % 3) ? "S" : "SUF";
                    r.leftIcon = (i % 2) ? "chevron-top" : "chevron-left";
                    r.rightIcon = (i % 2) ? "share" : "link";
                    if (++i > 12) clearInterval(id);
                }, 80);
            }
        }));
}

function richTest8() {
    // Transition between strings and HTMLElements for prefix/suffix
    const r = TurboRichElement.create({text: "Hybrid prefix/suffix"});

    box("RichElement — prefix/suffix hybrids")
        .addSubBox("start", r)
        .addContent(TurboButton.create({
            text: "prefixEntry = pill('PILL')",
            onClick: () => r.prefixEntry = div({text: "PILL", style: "background: " + Color.random().toString(), classes: "pill"})
        }))
        .addContent(TurboButton.create({
            text: "prefixEntry = 'pre again'",
            onClick: () => r.prefixEntry = "pre again"
        }))
        .addContent(TurboButton.create({
            text: "suffixEntry = span('ok')",
            onClick: () => r.suffixEntry = span({text: "ok"})
        }))
        .addContent(TurboButton.create({
            text: "suffixEntry = 'suf again'",
            onClick: () => r.suffixEntry = "suf again"
        }));
}

export function setupRichElementTests() {
    richTest1();
    richTest2();
    richTest4();
    richTest5();
    richTest6();
    richTest7();
    richTest8();
}