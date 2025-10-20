import {
    $, richElement, icon, TurboIcon,
    button, div, span, randomColor
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import "./richElement.css";

function richTest1() {
    // Basics: element as text, left/right icons, prefix/suffix strings
    const r1 = richElement({
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
    const r = richElement({
        text: "Editable",
        leftIcon: "link",
        rightIcon: "share",
        prefixEntry: "prefix",
        suffixEntry: "suffix"
    });

    box("RichElement — in-place updates")
        .addSubBox("start", r)
        .addContent(button({
            text: "prefix = 'PRE*'",
            onClick: () => r.prefixEntry = "PRE*"
        }))
        .addContent(button({
            text: "suffix = 'SUF*'",
            onClick: () => r.suffixEntry = "SUF*"
        }))
        .addContent(button({
            text: "leftIcon = 'chevron-top' (reuses instance)",
            onClick: () => r.leftIcon = "chevron-top"
        }))
        .addContent(button({
            text: "rightIcon = 'chevron-left' (reuses instance)",
            onClick: () => r.rightIcon = "chevron-left"
        }))
        .addContent(button({
            text: "text = 'Updated!'",
            onClick: () => r.text = "Updated!"
        }));
}

function richTest4() {
    // Replace center element with custom element; also provide via object props
    const r = richElement({text: "Center text"});

    box("RichElement — center replacement")
        .addSubBox("start", r)
        .addContent(button({
            text: "element = pill('CENTER')",
            onClick: () => r.element = div({text: "CENTER", style: "background: " + randomColor(), classes: "pill"})
        }))
        .addContent(button({
            text: "element = { tag:'span', text:'from props' }",
            onClick: () => r.element = {tag: "span", text: "from props"}
        }))
        .addContent(button({
            text: "element = 'Back to string'",
            onClick: () => r.element = "Back to string"
        }));
}

function richTest5() {
    // Left/Right custom elements array + ordering check
    const r = richElement({
        text: "Order matters",
        leftIcon: "link",
        rightIcon: "share",
    });

    box("RichElement — custom elements & order")
        .addSubBox("base", r)
        .addContent(button({
            text: "leftCustomElements = [pill('L1'), pill('L2')]",
            onClick: () => r.leftCustomElements = [
                div({text: "L1", style: "background: " + randomColor(), classes: "pill"}),
                div({text: "L2", style: "background: " + randomColor(), classes: "pill"})
            ]
        }))
        .addContent(button({
            text: "rightCustomElements = [pill('R1')]",
            onClick: () => r.rightCustomElements = div({
                text: "R1",
                style: "background: " + randomColor(),
                classes: "pill"
            })
        }))
        .addContent(button({
            text: "prefixEntry = 'P:'; suffixEntry = ':S'",
            onClick: () => {
                r.prefixEntry = "P:";
                r.suffixEntry = ":S";
            }
        }))
        .addContent(button({
            text: "Swap text",
            onClick: () => r.text = "Order still good?"
        }));
}

function richTest6() {
    // Icon instances reuse & property updates on the instance
    const left = icon({icon: "chevron-left", type: "svg"}) as TurboIcon;
    const right = icon({icon: "chevron-top", type: "svg"}) as TurboIcon;

    const r = richElement({
        text: "Reuse icon instances",
        leftIcon: left,
        rightIcon: right
    });

    box("RichElement — icon instance reuse")
        .addSubBox("start", r)
        .addContent(button({
            text: "leftIcon.icon = 'link'",
            onClick: () => left.icon = "link"
        }))
        .addContent(button({
            text: "rightIcon.icon = 'share'",
            onClick: () => right.icon = "share"
        }))
        .addContent(button({
            text: "replace leftIcon with string (new)",
            onClick: () => r.leftIcon = "photo"
        }))
        .addContent(button({
            text: "replace rightIcon with instance (back)",
            onClick: () => r.rightIcon = right
        }));
}

function richTest7() {
    // Stress: rapid flips across all parts to smoke test addAtPosition & cleanup
    const r = richElement({
        text: "Stress me",
        leftIcon: "link",
        rightIcon: "share",
        prefixEntry: "pre",
        suffixEntry: "suf"
    });

    box("RichElement — stress / race-ish")
        .addSubBox("start", r)
        .addContent(button({
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
    const r = richElement({text: "Hybrid prefix/suffix"});

    box("RichElement — prefix/suffix hybrids")
        .addSubBox("start", r)
        .addContent(button({
            text: "prefixEntry = pill('PILL')",
            onClick: () => r.prefixEntry = div({text: "PILL", style: "background: " + randomColor(), classes: "pill"})
        }))
        .addContent(button({
            text: "prefixEntry = 'pre again'",
            onClick: () => r.prefixEntry = "pre again"
        }))
        .addContent(button({
            text: "suffixEntry = span('ok')",
            onClick: () => r.suffixEntry = span({text: "ok"})
        }))
        .addContent(button({
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