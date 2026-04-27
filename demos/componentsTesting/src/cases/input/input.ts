import {
    $, div, span, TurboInput, TurboNumericalInput, TurboButton
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import {DefaultEventName} from "../../../../../build/turbodombuilder.esm";
import "./input.css";

const valueProbe = (label: string, el: any) => {
    const wrap = div({class: "case-entry"});
    const l = span({text: label + ": "});
    const v = span({text: ""});
    const r = span({text: ""});

    const sep = span({text: "  |  "});
    wrap.append(l, v, sep, r);

    const update = () => {
        v.textContent = `value = ${String(el.value)} (${typeof el.value})`;
        r.textContent = `stringValue = "${el["element"]?.value ?? ""}"`;
    };

    // initial & on input
    update();
    $(el).on(DefaultEventName.input, update);

    return wrap;
};

/* 1) Basics: label, default input, clicking label focuses input, programmatic value */
function inputTest1() {
    const ti = TurboInput.create({
        label: "Your name",
        input: {placeholder: "type here…"}
    });

    box("TurboInput.create( — Basics")
        .addSubBox("basic field", ti)
        .addContent(valueProbe("probe", ti))
        .addContent(TurboButton.create({
            text: 'value="Ada"',
            onClick: () => {
                ti.value = "Ada";
            }
        }))
        .addContent(TurboButton.create({
            text: 'element.placeholder="Hello!"',
            onClick: () => {
                ti.element.placeholder = "Hello!";
            }
        }));
}

/* 2) Label/id wiring & late element creation */
function inputTest2() {
    const ti = TurboInput.create({
        // no element.id provided -> TurboInput.create( should assign defaultId
        label: "Has for/id wiring"
    });

    box("TurboInput.create( — label <-> input id")
        .addSubBox("for/id link", ti)
        .addContent(TurboButton.create({
            text: "log label.htmlFor & element.id",
            onClick: () => {
                // @ts-ignore
                const labelEl = (ti as any).labelElement as HTMLLabelElement;
                console.log("label.for =", labelEl?.htmlFor, "element.id =", ti.element?.id);
            }
        }))
        .addContent(TurboButton.create({
            text: "assign explicit id",
            onClick: () => {
                ti.element.id = "custom-id-123";
                // @ts-ignore
                const labelEl = (ti as any).labelElement as HTMLLabelElement;
                if (labelEl) labelEl.htmlFor = ti.element.id;
            }
        }));
}

/* 3) elementTag swap: input <-> textarea + dynamicVerticalResize */
function inputTest3() {
    const ti = TurboInput.create({
        label: "Multi-line",
        inputTag: "textarea" as any, //TODO FIX
        input: {rows: 2, placeholder: "Type multiple lines…"}
    });

    ti.dynamicVerticalResize = true;

    box("TurboInput.create( — textarea & auto-resize")
        .addSubBox("textarea (auto-resize)", ti)
        .addContent(valueProbe("probe", ti));
}

/* 4) Focus behavior: selectTextOnFocus & locked */
function inputTest4() {
    const ti = TurboInput.create({
        label: "Focus behavior",
        input: {value: "Select me on focus"}
    });

    box("TurboInput.create( — focus modes")
        .addSubBox("field", ti)
        .addContent(TurboButton.create({
            text: "selectTextOnFocus = true",
            onClick: () => {
                ti.selectTextOnFocus = true;
                ti.element.focus();
            }
        }))
        .addContent(TurboButton.create({
            text: "selectTextOnFocus = false",
            onClick: () => {
                ti.selectTextOnFocus = false;
            }
        }))
        .addContent(TurboButton.create({
            text: "locked = true (blur on focus)",
            onClick: () => {
                ti.locked = true;
                ti.element.focus();
            }
        }))
        .addContent(TurboButton.create({
            text: "locked = false",
            onClick: () => {
                ti.locked = false;
            }
        }));
}

/* 5) Regex guards: inputRegexCheck + blurRegexCheck */
function inputTest5() {
    const ti = TurboInput.create({
        label: "Only lowercase letters",
        input: {placeholder: "live guard: /^[a-z]*$/"}
    });

    // live: only lowercase ascii
    ti.inputRegexCheck = /^[a-z]*$/;
    // on blur: must end with a letter (no empty), otherwise revert
    ti.blurRegexCheck = /^[a-z]+$/;

    box("TurboInput.create( — regex guards")
        .addSubBox("live (input) & final (blur)", ti)
        .addContent(valueProbe("probe", ti))
        .addContent(TurboButton.create({
            text: 'programmatic value "abc123" (will clamp live)',
            onClick: () => {
                ti.value = "abc123";
            }
        }))
        .addContent(TurboButton.create({
            text: "clear",
            onClick: () => {
                ti.value = "";
            }
        }));
}

/* 6) Programmatic vs DOM value differences */
function inputTest6() {
    const ti = TurboInput.create({label: "Programmatic vs DOM"});

    box("TurboInput.create( — programmatic vs DOM")
        .addSubBox("field", ti)
        .addContent(valueProbe("probe", ti))
        .addContent(TurboButton.create({
            text: 'ti.value = "42"',
            onClick: () => {
                ti.value = "42";
            }
        }))
        .addContent(TurboButton.create({
            text: 'element.value = "DOM-only" (no setter)',
            onClick: () => {
                ti.element.value = "DOM-only";
                ti.dispatchEvent(new InputEvent("input"));
            }
        }))
        .addContent(TurboButton.create({
            text: "reset",
            onClick: () => {
                ti.value = "";
            }
        }));
}

/* 7) Numerical: basics with live probing */
function numTest1() {
    const ni = TurboNumericalInput.create({
        label: "Number",
        inputRegexCheck: undefined, // let factory defaults handle it if omitted
        blurRegexCheck: undefined
    });

    box("TurboNumericalInput — basics")
        .addSubBox("field", ni)
        .addContent(valueProbe("probe", ni))
        .addContent(TurboButton.create({
            text: "value = 12.345",
            onClick: () => {
                ni.value = 12.345;
            }
        }))
        .addContent(TurboButton.create({
            text: "value = '-7.8' (string)",
            onClick: () => {
                ni.value = "-7.8";
            }
        }))
        .addContent(TurboButton.create({
            text: "clear",
            onClick: () => {
                ni.value = "";
            }
        }));
}

/* 8) Numerical: min/max, multiplier, decimalPlaces */
function numTest2() {
    const ni = TurboNumericalInput.create({
        label: "Scaled + clamped"
    });

    ni.multiplier = 100;
    ni.decimalPlaces = 2;
    ni.min = -50;
    ni.max = 50;

    box("TurboNumericalInput — min/max/multiplier/decimalPlaces")
        .addSubBox("field", ni)
        .addContent(valueProbe("probe (scaled view)", ni))
        .addContent(TurboButton.create({
            text: "set raw 0.1234 → shows 12.34 (x100 & rounded)",
            onClick: () => {
                ni.value = 0.1234;
            }
        }))
        .addContent(TurboButton.create({
            text: "set raw 1000 → clamped to 50",
            onClick: () => {
                ni.value = 1000;
            }
        }))
        .addContent(TurboButton.create({
            text: "set raw -999 → clamped to -50",
            onClick: () => {
                ni.value = -999;
            }
        }))
        .addContent(TurboButton.create({
            text: "multiplier = 10 (now 0.1234 → 1.23)",
            onClick: () => {
                ni.multiplier = 10;
                ni.value = 0.1234;
            }
        }))
        .addContent(TurboButton.create({
            text: "decimalPlaces = 0 (round to int)",
            onClick: () => {
                ni.decimalPlaces = 0;
                ni.value = 12.9;
            }
        }));
}

/* 9) Numerical: regex defaults smoke (factory injects if missing) */
function numTest3() {
    const ni = TurboNumericalInput.create({
        label: "Regex defaults"
    });

    box("TurboNumericalInput — regex defaults")
        .addSubBox("field", ni)
        .addContent(valueProbe("probe", ni))
        .addContent(TurboButton.create({
            text: "enter weird chars manually to test guard",
            onClick: () => {
                console.log("Type into the field to test live/blur regex.");
            }
        }));
}

export function setupInputTests() {
    inputTest1();
    inputTest2();
    inputTest3();
    inputTest4();
    inputTest5();
    inputTest6();

    numTest1();
    numTest2();
    numTest3();
}