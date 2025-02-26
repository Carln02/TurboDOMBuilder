import {TurboElement} from "./turboElement";
import {TurboModel} from "./turboModel";


class TurboView<
    ElementType extends TurboElement = TurboElement,
    ModelType extends TurboModel = TurboModel
> {
    public element: ElementType;
    public model: ModelType;

    protected callbackMap: Map<string, (...args: any[]) => void> = new Map();

    public constructor(element: ElementType, model?: ModelType) {
        this.element = element;
        if (model) this.model = model;
    }

    public initialize(): void {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

    protected setupUIListeners(): void {
    }

    public fireChangedCallback(keyName: string, ...args: any[]): void {
        const callback = this.callbackMap.get(keyName);
        if (callback && typeof callback == "function") callback(...args);
    }

    protected setChangedCallback(keyName: string, callback: (...args: any[]) => void): void {
        this.callbackMap.set(keyName, callback);
    }
}

export {TurboView};