import { describe, it, expect } from "vitest";
import {TurboController} from "../logic/controller";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

class TestController extends TurboController {
    setupCalls = 0;
    protected override setupChangedCallbacks(): void {
        this.setupCalls++;
    }
    // expose protected for assertions (no mocks, just getters)
    get _element() { return (this as any).element; }
    get _view() { return (this as any).view; }
    get _model() { return (this as any).model; }
    get _emitter() { return (this as any).emitter; }
}

describe("TurboController", () => {
    it("stores references and calls setup on initialize", () => {
        const m = new TurboModel<any>({ foo: 1 });
        const e = new TurboEmitter(m);
        const v = new TurboView({ element: { id: 1 }, model: m, emitter: e });

        const c = new TestController({ element: v.element, view: v, model: m, emitter: e });
        expect(c._element).toBe(v.element);
        expect(c._view).toBe(v);
        expect(c._model).toBe(m);
        expect(c._emitter).toBe(e);

        expect(c.setupCalls).toBe(0);
        c.initialize();
        expect(c.setupCalls).toBe(1);
    });
});
