import {describe, it, expect} from "vitest";
import {TurboView} from "../view/view";
import {TurboOperator} from "../operator/operator";
import {TurboModel} from "../model/model";
import {TurboEmitter} from "../emitter/emitter";

class TrackingOperator extends TurboOperator {
    public setupCalls = 0;
    public listenerCalls = 0;

    protected override setup(): void {
        // called in constructor — track it
    }

    protected override setupChangedCallbacks(): void {
        this.setupCalls++;
    }

    protected override setupUIListeners(): void {
        this.listenerCalls++;
    }
}

describe("TurboOperator", () => {
    it("constructor assigns element, view, model, and emitter from properties", () => {
        const element = {id: 1};
        const model = new TurboModel({data: {foo: 1}});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({element, model, emitter} as any);

        const ctrl = new TrackingOperator({element, view, model, emitter} as any);

        expect(ctrl.element).toBe(element);
        expect(ctrl.view).toBe(view);
        expect(ctrl.model).toBe(model);
        expect(ctrl.emitter).toBe(emitter);
    });

    it("constructor works with only element (others are optional)", () => {
        const element = {id: 2};
        const ctrl = new TrackingOperator({element} as any);

        expect(ctrl.element).toBe(element);
        expect(ctrl.view).toBeUndefined();
        expect(ctrl.model).toBeUndefined();
        expect(ctrl.emitter).toBeUndefined();
    });

    it("view, model, emitter can be assigned after construction", () => {
        const element = {};
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter();
        const view = new TurboView({element} as any);

        const ctrl = new TrackingOperator({element} as any);
        ctrl.view = view;
        ctrl.model = model;
        ctrl.emitter = emitter;

        expect(ctrl.view).toBe(view);
        expect(ctrl.model).toBe(model);
        expect(ctrl.emitter).toBe(emitter);
    });

    it("initialize() calls setupUIListeners and setupChangedCallbacks", () => {
        const ctrl = new TrackingOperator({element: {}} as any);

        expect(ctrl.listenerCalls).toBe(0);
        expect(ctrl.setupCalls).toBe(0);

        ctrl.initialize();

        expect(ctrl.listenerCalls).toBe(1);
        expect(ctrl.setupCalls).toBe(1);
    });

    it("initialize() can be called multiple times", () => {
        const ctrl = new TrackingOperator({element: {}} as any);
        ctrl.initialize();
        ctrl.initialize();

        expect(ctrl.setupCalls).toBe(2);
        expect(ctrl.listenerCalls).toBe(2);
    });

    it("keyName can be assigned", () => {
        const ctrl = new TrackingOperator({element: {}} as any);
        ctrl.keyName = "myCtrl";
        expect(ctrl.keyName).toBe("myCtrl");
    });

    it("setup() is called during construction", () => {
        // Use a closure instead of a class field to avoid re-initialization after super()
        let setupCalled = false;

        class SetupTrackingOperator extends TurboOperator {
            protected override setup(): void { setupCalled = true; }
        }

        new SetupTrackingOperator({element: {}} as any);
        expect(setupCalled).toBe(true);
    });
});
