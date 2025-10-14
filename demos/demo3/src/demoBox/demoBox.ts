import {TurboElement, $, auto, define, div, h4, effect, span, signal, randomColor, element, flexRow} from "../../../../build/turbodombuilder.esm";
import "./demoBox.css";

@define("demo-box")
export class DemoBox extends TurboElement {
    private labelElement: HTMLElement;
    private contentBox: HTMLElement;

    @signal public label: string;

    @auto({defaultValue: [], callBefore: function () {this.content?.forEach(el => el.remove())}})
    public set content(value: Element[]) {
        if (!this.contentBox) return;
        value.forEach(el => $(this.contentBox).addChild(el));
    }

    public addContent(value: Element): this {
        this.content.push(value);
        $(this.contentBox).addChild(value);
        return this;
    }

    public addSubBox(label: string, ...values: Element[]): this {
        this.addContent(element({
            classes: "case-entry",
            children: [span({text: label, classes: "tag"}), flexRow({style: "gap: 0.4rem", children: values})]
        }));
        return this;
    }

    public initialize() {
        super.initialize();
        $(this).setStyle("backgroundColor", randomColor());
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.labelElement = h4();
        this.contentBox = div();
    }

    protected setupUILayout() {
        super.setupUILayout();
        $(this).addChild([this.labelElement, this.contentBox]).childHandler = this.contentBox;
        this.content?.forEach(el => $(this.contentBox).addChild(el));
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        effect(() => {
            if (this.labelElement) this.labelElement.textContent = this.label
        });
    }
}

export function box(label: string, ...content: Element[]): DemoBox {
    return element({parent: document.body, tag: "demo-box", label, content: content}) as DemoBox;
}