import {TurboElement, $, auto, define, div, h4, effect, signal, randomColor, element} from "../../../../build/turbodombuilder.esm";
import "./demoBox.css";

@define("demo-box")
export class DemoBox<Type extends Element> extends TurboElement {
    private labelElement: HTMLElement;
    private contentBox: HTMLElement;

    @signal public label: string;

    @auto({defaultValue: [], callBefore: function () {this.content?.forEach(el => el.remove())}})
    public set content(value: Type[]) {
        if (!this.contentBox) return;
        value.forEach(el => $(this.contentBox).addChild(el));
    }

    public addContent(value: Type) {
        this.content.push(value);
        $(this.contentBox).addChild(value);
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

export function box<Type extends Element>(label: string, ...content: Type[]): DemoBox<Type> {
    return element({parent: document.body, tag: "demo-box", label, content: content}) as DemoBox<Type>;
}