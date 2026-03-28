import {describe, it, expect} from "vitest";
import {TurboView} from "../view/view";
import {TurboEmitter} from "../emitter/emitter";
import {TurboModel} from "../model/model";

class ProbeView extends TurboView {
    public calls: string[] = [];

    protected override setupChangedCallbacks(): void { this.calls.push("changed"); }
    protected override setupUIElements(): void { this.calls.push("elements"); }
    protected override setupUILayout(): void { this.calls.push("layout"); }
    protected override setupUIListeners(): void { this.calls.push("listeners"); }
}

describe("TurboView", () => {
    it("constructor assigns element, model, and emitter", () => {
        const element = {};
        const model = new TurboModel({data: {a: 1}});
        const emitter = new TurboEmitter(model);

        const view = new TurboView({element, model, emitter} as any);

        expect(view.element).toBe(element);
        expect(view.model).toBe(model);
        expect(view.emitter).toBe(emitter);
    });

    it("constructor works with only element (model and emitter are optional)", () => {
        const element = {id: 42};
        const view = new TurboView({element} as any);

        expect(view.element).toBe(element);
        expect(view.model).toBeUndefined();
        expect(view.emitter).toBeUndefined();
    });

    it("model and emitter can be set after construction", () => {
        const element = {};
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter();

        const view = new TurboView({element} as any);
        view.model = model;
        view.emitter = emitter;

        expect(view.model).toBe(model);
        expect(view.emitter).toBe(emitter);
    });

    it("initialize() calls setup methods in the correct order", () => {
        const element = {};
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter(model);

        const view = new ProbeView({element, model, emitter} as any);
        view.initialize();

        // elements → layout → listeners → changed
        expect(view.calls).toEqual(["elements", "layout", "listeners", "changed"]);
    });

    it("initialize() can be called multiple times (each call re-runs setup)", () => {
        const element = {};
        const view = new ProbeView({element} as any);

        view.initialize();
        view.initialize();

        // Each initialize re-runs all four setup methods
        expect(view.calls).toHaveLength(8);
    });

    it("setup() is called during construction (before initialize)", () => {
        // Use a closure instead of a class field to avoid re-initialization after super()
        let setupCalled = false;

        class SetupTrackingView extends TurboView {
            protected override setup(): void { setupCalled = true; }
            protected override setupUIElements(): void {}
            protected override setupUILayout(): void {}
            protected override setupUIListeners(): void {}
            protected override setupChangedCallbacks(): void {}
        }

        new SetupTrackingView({element: {}} as any);
        expect(setupCalled).toBe(true);
    });
});