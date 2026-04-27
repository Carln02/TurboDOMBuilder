import {TurboInteractor} from "../../../mvc/interactor/interactor";
import {TurboInput} from "./input";
import {listener} from "../../../decorators/listener/listener";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {Propagation} from "../../../turboFunctions/event/event.types";

export class TurboInputInputInteractor extends TurboInteractor<TurboInput> {
    public keyName = "__input__interactor__";

    private _composing = false;
    private _resizeQueued = false;

    public get target() {
        return this.element.element;
    }

    public initialize() {
        super.initialize();
        turbo(this.target).bypassManagerOn = () => true;
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("valueSet", () => this.handleInput());
    }

    @listener() public focusIn(e: Event) {
        if (this.element.locked) {
            this.target.blur();
            return Propagation.propagate;
        }
        if (this.element.selectTextOnFocus) requestAnimationFrame(() => {
            try {this.target.select?.()} catch {}
        });
        this.element.onFocus.fire();
    }

    @listener() public focusOut(e: Event) {
        this.element.rawValue = this.element.element?.value ?? "";
        this.element.onBlur.fire();
    }

    @listener({options: {capture: true}}) public compositionStart(e: Event) {
        this._composing = true;
    }

    @listener({options: {capture: true}}) public compositionEnd(e: Event) {
        this._composing = false;
        this.handleInput();
        this.emitter.fire("processValue");
    }

    @listener({options: {capture: true}}) public input(e: Event) {
        this.handleInput();
        this.emitter.fire("processValue");
    }

    private handleInput() {
        if (this._composing) return;
        if (this.element.dynamicVerticalResize && this.target instanceof HTMLTextAreaElement) {
            if (!this._resizeQueued) {
                this._resizeQueued = true;
                queueMicrotask(() => {
                    this._resizeQueued = false;
                    turbo(this.target)
                        .setStyle("height", "auto", true)
                        .setStyle("height", this.target.scrollHeight + "px", true);
                });
            }
        }
    }
}