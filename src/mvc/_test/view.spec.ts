import {describe, it, expect} from "vitest";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

class TestModel extends TurboModel<Record<string, any>, string, string, "map"> {
    private _enabled = true;

    //@ts-ignore
    public get enabledCallbacks() { return this._enabled; }

    public set enabledCallbacks(v: boolean) { this._enabled = v; }
}

class ProbeView extends TurboView<object, TestModel, TurboEmitter> {
    public calls: string[] = [];

    protected setupChangedCallbacks(): void { this.calls.push("changed"); }

    protected setupUIElements(): void { this.calls.push("elements"); }

    protected setupUILayout(): void { this.calls.push("layout"); }

    protected setupUIListeners(): void { this.calls.push("listeners"); }
}

describe("TurboView", () => {
    it("constructor assigns element, model, emitter", () => {
        const element = {};
        const model = new TestModel({a: 1}, "map");
        const emitter = new TurboEmitter(model);

        const v = new TurboView({element, model, emitter} as any);
        expect(v.element).toBe(element);
        expect(v.model).toBe(model);
        expect(v.emitter).toBe(emitter);
    });

    it("initialize runs setup methods in order", () => {
        const element = {};
        const model = new TestModel({}, "map");
        const emitter = new TurboEmitter(model);

        const view = new ProbeView({element, model, emitter} as any);
        view.initialize();

        expect(view.calls).toEqual(["elements", "layout", "listeners", "changed"]);
    });
});
