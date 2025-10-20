import {TurboInteractor} from "../../../mvc/interactor/interactor";
import {TurboInput} from "./input";
import {$} from "../../../turboFunctions/turboFunctions";

export class TurboInputInputInteractor extends TurboInteractor<TurboInput> {
    public keyName = "__input__interactor__";

    private _composing = false;
    private _resizeQueued = false;

    public options = {
        compositionStart: {capture: true},
        compositionEnd: {capture: true},
        input: {capture: true},
    }

    private get inputElement(): HTMLInputElement | HTMLTextAreaElement {
        return this.element.element;
    }

    public initialize() {
        super.initialize();
        $(this.target).bypassManagerOn = () => true;
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("valueSet", () => this.handleInput());
    }

    public click() {
        if (!this.element.locked) this.inputElement?.focus();
        return false;
    }

    public focusIn(e: Event) {
        if (e.target !== this.inputElement) return;
        if (this.element.locked) {
            this.inputElement.blur();
            return;
        }
        if (this.element.selectTextOnFocus) requestAnimationFrame(() => {
            try {this.inputElement.select?.()} catch {}
        });
        this.element.onFocus.fire();
        return true;
    }

    public focusOut(e: Event) {
        if (e.target !== this.inputElement) return;
        this.element.value = this.element.element?.value;
        this.element.onBlur.fire();
    }

    public compositionStart(e: Event) {
        if (e.target !== this.inputElement) return;
        this._composing = true;
    }

    public compositionEnd(e: Event) {
        if (e.target !== this.inputElement) return;
        this._composing = false;
        this.handleInput();
        return true;
    }

    public input(e: Event) {
        if (e.target !== this.inputElement) return;
        this.handleInput();
        return true;
    }

    private handleInput() {
        if (this._composing) return;
        if (!this.inputElement) return;

        if (this.element.dynamicVerticalResize && this.inputElement instanceof HTMLTextAreaElement) {
            if (!this._resizeQueued) {
                this._resizeQueued = true;
                queueMicrotask(() => {
                    this._resizeQueued = false;
                    $(this.inputElement)
                        .setStyle("height", "auto", true)
                        .setStyle("height", this.inputElement.scrollHeight + "px", true);
                });
            }
        }

        this.emitter.fire("processValue");
    }
}