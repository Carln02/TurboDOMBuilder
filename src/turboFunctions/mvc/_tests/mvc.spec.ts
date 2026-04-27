import {describe, it, expect} from "vitest";
import {$} from "../../turboFunctions";
import {TurboModel} from "../../../mvc/model/model";
import {TurboView} from "../../../mvc/view/view";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboOperator} from "../../../mvc/operator/operator";
import {TurboHandler} from "../../../mvc/handler/handler";
import {TurboInteractor} from "../../../mvc/interactor/interactor";
import {TurboTool} from "../../../mvc/tool/tool";
import {TurboEnforcer} from "../../../mvc/enforcer/enforcer";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

type TestData = {foo?: number; bar?: string};

class MyModel extends TurboModel<TestData> {}

class MyView extends TurboView {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyOperator extends TurboOperator {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyHandler extends TurboHandler {}

class MyInteractor extends TurboInteractor {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyTool extends TurboTool {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyEnforcer extends TurboEnforcer {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

const sel = () => $({});

// ------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------

describe("TurboSelector MVC functions", () => {

    // ------------------------------------------------------------------
    // model getter / setter
    // ------------------------------------------------------------------

    describe("model getter / setter", () => {
        it("model getter returns undefined on a fresh selector", () => {
            expect(sel().model).toBeUndefined();
        });

        it("model setter from constructor creates a TurboModel instance", () => {
            const s = sel();
            s.model = MyModel;
            expect(s.model).toBeInstanceOf(MyModel);
        });

        it("model setter from instance stores that exact instance", () => {
            const s = sel();
            const m = new MyModel({data: {foo: 1}});
            s.model = m;
            expect(s.model).toBe(m);
        });

        it("replacing model updates the getter to return the new instance", () => {
            const s = sel();
            const m1 = new MyModel({data: {foo: 1}});
            const m2 = new MyModel({data: {foo: 2}});
            s.model = m1;
            s.model = m2;
            expect(s.model).toBe(m2);
        });
    });

    // ------------------------------------------------------------------
    // view getter / setter
    // ------------------------------------------------------------------

    describe("view getter / setter", () => {
        it("view getter returns undefined on a fresh selector", () => {
            expect(sel().view).toBeUndefined();
        });

        it("view setter from constructor creates an instance wired to the element", () => {
            const s = sel();
            s.view = MyView;
            expect(s.view).toBeInstanceOf(MyView);
            expect(s.view.element).toBe(s.element);
        });

        it("view setter from instance stores that exact instance", () => {
            const s = sel();
            const v = new MyView({element: s.element} as any);
            s.view = v;
            expect(s.view).toBe(v);
        });
    });

    // ------------------------------------------------------------------
    // emitter getter / setter
    // ------------------------------------------------------------------

    describe("emitter getter / setter", () => {
        it("emitter getter returns undefined on a fresh selector (no writes yet)", () => {
            expect(sel().emitter).toBeUndefined();
        });

        it("emitter setter from constructor creates a TurboEmitter instance", () => {
            const s = sel();
            s.emitter = TurboEmitter;
            expect(s.emitter).toBeInstanceOf(TurboEmitter);
        });

        it("emitter setter from instance stores that exact instance", () => {
            const s = sel();
            const e = new TurboEmitter();
            s.emitter = e;
            expect(s.emitter).toBe(e);
        });
    });

    // ------------------------------------------------------------------
    // data getter / setter
    // ------------------------------------------------------------------

    describe("data getter / setter", () => {
        it("data getter returns undefined when no model is attached", () => {
            expect(sel().data).toBeUndefined();
        });

        it("data getter returns model.data when a model is set", () => {
            const s = sel();
            s.model = new MyModel({data: {foo: 42}});
            expect(s.data).toEqual({foo: 42});
        });

        it("data setter updates model.data", () => {
            const s = sel();
            s.model = new MyModel({data: {foo: 1}});
            s.data = {foo: 99};
            expect(s.data).toEqual({foo: 99});
        });

        it("data setter is a no-op when no model is attached", () => {
            const s = sel();
            expect(() => { s.data = {foo: 1}; }).not.toThrow();
        });
    });

    // ------------------------------------------------------------------
    // dataId / dataIndex
    // ------------------------------------------------------------------

    describe("dataId / dataIndex", () => {
        it("dataId getter reflects model.id", () => {
            const s = sel();
            const m = new MyModel({data: {}});
            m.id = "abc" as any;
            s.model = m;
            expect(s.dataId).toBe("abc");
        });

        it("dataId setter updates model.id", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            s.dataId = "42";
            expect(s.dataId).toBe("42");
        });

        it("dataIndex getter returns parseInt of dataId", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            s.dataId = "7";
            expect(s.dataIndex).toBe(7);
        });

        it("dataIndex setter updates dataId to the given value", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            s.dataIndex = 5;
            expect(s.dataId).toBe(5);
        });
    });

    // ------------------------------------------------------------------
    // dataSize
    // ------------------------------------------------------------------

    describe("dataSize", () => {
        it("dataSize reflects the number of top-level keys in the model", () => {
            const s = sel();
            s.model = new MyModel({data: {foo: 1, bar: "x"}});
            expect(s.dataSize).toBe(2);
        });

        it("dataSize is undefined when no model is attached", () => {
            expect(sel().dataSize).toBeUndefined();
        });
    });

    // ------------------------------------------------------------------
    // operators getter / setter
    // ------------------------------------------------------------------

    describe("operators getter / setter", () => {
        it("operators getter returns an empty array on a fresh selector", () => {
            expect(sel().operators).toEqual([]);
        });

        it("operators setter from constructor array creates instances", () => {
            const s = sel();
            s.operators = MyOperator as any;
            expect(s.operators).toHaveLength(1);
            expect(s.operators[0]).toBeInstanceOf(MyOperator);
        });

        it("operators setter from instance array stores those instances", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "myOp";
            s.operators = [ctrl];
            expect(s.operators).toContain(ctrl);
        });
    });

    // ------------------------------------------------------------------
    // handlers getter / setter
    // ------------------------------------------------------------------

    describe("handlers getter / setter", () => {
        it("handlers getter returns an empty array when no model is attached", () => {
            expect(sel().handlers).toEqual([]);
        });

        it("handlers setter adds handler instances to the model", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            s.handlers = MyHandler as any;
            expect(s.handlers).toHaveLength(1);
            expect(s.handlers[0]).toBeInstanceOf(MyHandler);
        });
    });

    // ------------------------------------------------------------------
    // interactors getter / setter
    // ------------------------------------------------------------------

    describe("interactors getter / setter", () => {
        it("interactors getter returns an empty array on a fresh selector", () => {
            expect(sel().interactors).toEqual([]);
        });

        it("interactors setter from constructor creates instances", () => {
            const s = sel();
            s.interactors = MyInteractor as any;
            expect(s.interactors).toHaveLength(1);
            expect(s.interactors[0]).toBeInstanceOf(MyInteractor);
        });
    });

    // ------------------------------------------------------------------
    // tools getter / setter
    // ------------------------------------------------------------------

    describe("tools getter / setter", () => {
        it("tools getter returns an empty array on a fresh selector", () => {
            expect(sel().tools).toEqual([]);
        });

        it("tools setter from constructor creates instances", () => {
            const s = sel();
            s.tools = MyTool as any;
            expect(s.tools).toHaveLength(1);
            expect(s.tools[0]).toBeInstanceOf(MyTool);
        });
    });

    // ------------------------------------------------------------------
    // enforcers getter / setter
    // ------------------------------------------------------------------

    describe("enforcers getter / setter", () => {
        it("enforcers getter returns an empty array on a fresh selector", () => {
            expect(sel().enforcers).toEqual([]);
        });

        it("enforcers setter from constructor creates instances", () => {
            const s = sel();
            s.enforcers = MyEnforcer as any;
            expect(s.enforcers).toHaveLength(1);
            expect(s.enforcers[0]).toBeInstanceOf(MyEnforcer);
        });
    });

    // ------------------------------------------------------------------
    // setMvc
    // ------------------------------------------------------------------

    describe("setMvc", () => {
        it("creates model, view, and emitter from constructors", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, emitter: TurboEmitter, initialize: false});
            expect(s.model).toBeInstanceOf(MyModel);
            expect(s.view).toBeInstanceOf(MyView);
            expect(s.emitter).toBeInstanceOf(TurboEmitter);
        });

        it("creates a default TurboEmitter when none is provided", () => {
            const s = sel();
            s.setMvc({model: MyModel, initialize: false});
            expect(s.emitter).toBeInstanceOf(TurboEmitter);
        });

        it("sets data on the model when data is provided", () => {
            const s = sel();
            s.setMvc({model: MyModel, data: {foo: 7}, initialize: false});
            expect(s.data).toEqual({foo: 7});
        });

        it("initializes all pieces by default (when initialize is not specified)", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView});
            expect((s.view as MyView).inits).toBe(1);
        });

        it("skips initialization when initialize: false", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, initialize: false});
            expect((s.view as MyView).inits).toBe(0);
        });

        it("wires view.model and view.emitter after setMvc", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, emitter: TurboEmitter, initialize: false});
            expect(s.view.model).toBe(s.model);
            expect(s.view.emitter).toBe(s.emitter);
        });

        it("wires operator.model, operator.emitter, and operator.view after setMvc", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, operators: [MyOperator], initialize: false});
            expect(s.operators[0].model).toBe(s.model);
            expect(s.operators[0].view).toBe(s.view);
        });

        it("returns itself for method chaining", () => {
            const s = sel();
            expect(s.setMvc({initialize: false})).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // initializeMvc
    // ------------------------------------------------------------------

    describe("initializeMvc", () => {
        it("calls initialize() on all attached pieces", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, operators: [MyOperator], initialize: false});
            s.initializeMvc();
            expect((s.view as MyView).inits).toBe(1);
            expect((s.operators[0] as MyOperator).inits).toBe(1);
        });

        it("can be called multiple times", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, initialize: false});
            s.initializeMvc();
            s.initializeMvc();
            expect((s.view as MyView).inits).toBe(2);
        });

        it("is a no-op when the selector has no mvc data", () => {
            const s = sel();
            expect(() => s.initializeMvc()).not.toThrow();
        });

        it("returns itself for method chaining", () => {
            const s = sel();
            s.setMvc({initialize: false});
            expect(s.initializeMvc()).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // getMvcDifference
    // ------------------------------------------------------------------

    describe("getMvcDifference", () => {
        it("returns an empty object when configuration matches exactly", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, initialize: false});
            const diff = s.getMvcDifference({model: MyModel, view: MyView, emitter: TurboEmitter});
            expect(Object.keys(diff)).toHaveLength(0);
        });

        it("includes singular pieces not present in the provided config", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, initialize: false});
            const diff = s.getMvcDifference({});
            expect(diff.model).toBeDefined();
            expect(diff.view).toBeDefined();
        });

        it("includes collection entries not present in the provided config", () => {
            const s = sel();
            s.setMvc({operators: [MyOperator], initialize: false});
            const diff = s.getMvcDifference({});
            expect(Array.isArray(diff.operators)).toBe(true);
            expect((diff.operators as any[]).length).toBeGreaterThan(0);
        });

        it("omits collection entries that match the provided config", () => {
            const s = sel();
            s.setMvc({operators: [MyOperator], initialize: false});
            const diff = s.getMvcDifference({operators: MyOperator});
            expect(diff.operators).toBeUndefined();
        });

        it("returns an empty object when no mvc pieces are set", () => {
            const s = sel();
            const diff = s.getMvcDifference({});
            expect(Object.keys(diff)).toHaveLength(0);
        });
    });

    // ------------------------------------------------------------------
    // addOperator / getOperator / removeOperator
    // ------------------------------------------------------------------

    describe("addOperator / getOperator / removeOperator", () => {
        it("addOperator stores the operator under the provided keyName", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "snap";
            s.addOperator(ctrl);
            expect(s.getOperator("snap")).toBe(ctrl);
        });

        it("addOperator auto-derives keyName when not set", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            s.addOperator(ctrl);
            expect(ctrl.keyName).toBeDefined();
            expect(s.getOperator(ctrl.keyName)).toBe(ctrl);
        });

        it("addOperator wires operator to the mvc model and emitter", () => {
            const s = sel();
            s.setMvc({model: MyModel, emitter: TurboEmitter, initialize: false});
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "wired";
            s.addOperator(ctrl);
            expect(ctrl.model).toBe(s.model);
            expect(ctrl.emitter).toBe(s.emitter);
        });

        it("removeOperator by key removes it from the map", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "rm";
            s.addOperator(ctrl);
            s.removeOperator("rm");
            expect(s.getOperator("rm")).toBeUndefined();
        });

        it("removeOperator by instance removes it from the map", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "rmByRef";
            s.addOperator(ctrl);
            s.removeOperator(ctrl);
            expect(s.getOperator("rmByRef")).toBeUndefined();
        });

        it("addOperator returns itself for method chaining", () => {
            const s = sel();
            const ctrl = new MyOperator({element: s.element} as any);
            ctrl.keyName = "chain";
            expect(s.addOperator(ctrl)).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // addHandler / getHandler / removeHandler
    // ------------------------------------------------------------------

    describe("addHandler / getHandler / removeHandler", () => {
        it("addHandler registers the handler on the model", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            const h = new MyHandler();
            h.keyName = "myH";
            s.addHandler(h);
            expect(s.getHandler("myH")).toBe(h);
        });

        it("addHandler wires handler.model to the selector's model", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            const h = new MyHandler();
            h.keyName = "myH2";
            s.addHandler(h);
            expect(h.model).toBe(s.model);
        });

        it("removeHandler by key unregisters the handler", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            const h = new MyHandler();
            h.keyName = "rmH";
            s.addHandler(h);
            s.removeHandler("rmH");
            expect(s.getHandler("rmH")).toBeUndefined();
        });

        it("removeHandler by instance unregisters the handler", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            const h = new MyHandler();
            h.keyName = "rmHRef";
            s.addHandler(h);
            s.removeHandler(h);
            expect(s.getHandler("rmHRef")).toBeUndefined();
        });

        it("getHandler returns undefined when no model is attached", () => {
            expect(sel().getHandler("nope")).toBeUndefined();
        });

        it("addHandler returns itself for method chaining", () => {
            const s = sel();
            s.model = new MyModel({data: {}});
            const h = new MyHandler();
            h.keyName = "chain";
            expect(s.addHandler(h)).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // addInteractor / getInteractor / removeInteractor
    // ------------------------------------------------------------------

    describe("addInteractor / getInteractor / removeInteractor", () => {
        it("addInteractor stores the interactor and makes it retrievable", () => {
            const s = sel();
            const itc = new MyInteractor({element: s.element} as any);
            itc.keyName = "myI";
            s.addInteractor(itc);
            expect(s.getInteractor("myI")).toBe(itc);
        });

        it("removeInteractor by key removes it", () => {
            const s = sel();
            const itc = new MyInteractor({element: s.element} as any);
            itc.keyName = "rmI";
            s.addInteractor(itc);
            s.removeInteractor("rmI");
            expect(s.getInteractor("rmI")).toBeUndefined();
        });

        it("removeInteractor by instance removes it", () => {
            const s = sel();
            const itc = new MyInteractor({element: s.element} as any);
            itc.keyName = "rmIRef";
            s.addInteractor(itc);
            s.removeInteractor(itc);
            expect(s.getInteractor("rmIRef")).toBeUndefined();
        });

        it("addInteractor returns itself for method chaining", () => {
            const s = sel();
            const itc = new MyInteractor({element: s.element} as any);
            itc.keyName = "chain";
            expect(s.addInteractor(itc)).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // addTool / getTool / removeTool
    // ------------------------------------------------------------------

    describe("addTool / getTool / removeTool", () => {
        it("addTool stores the tool and makes it retrievable", () => {
            const s = sel();
            const tool = new MyTool({element: s.element} as any);
            tool.keyName = "myT";
            s.addTool(tool);
            expect(s.getTool("myT")).toBe(tool);
        });

        it("removeTool by key removes it", () => {
            const s = sel();
            const tool = new MyTool({element: s.element} as any);
            tool.keyName = "rmT";
            s.addTool(tool);
            s.removeTool("rmT");
            expect(s.getTool("rmT")).toBeUndefined();
        });

        it("removeTool by instance removes it", () => {
            const s = sel();
            const tool = new MyTool({element: s.element} as any);
            tool.keyName = "rmTRef";
            s.addTool(tool);
            s.removeTool(tool);
            expect(s.getTool("rmTRef")).toBeUndefined();
        });

        it("addTool returns itself for method chaining", () => {
            const s = sel();
            const tool = new MyTool({element: s.element} as any);
            tool.keyName = "chain";
            expect(s.addTool(tool)).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // addEnforcer / getEnforcer / removeEnforcer
    // ------------------------------------------------------------------

    describe("addEnforcer / getEnforcer / removeEnforcer", () => {
        it("addEnforcer stores the enforcer and makes it retrievable", () => {
            const s = sel();
            const sub = new MyEnforcer({element: s.element} as any);
            sub.keyName = "myS";
            s.addEnforcer(sub);
            expect(s.getEnforcer("myS")).toBe(sub);
        });

        it("removeEnforcer by key removes it", () => {
            const s = sel();
            const sub = new MyEnforcer({element: s.element} as any);
            sub.keyName = "rmS";
            s.addEnforcer(sub);
            s.removeEnforcer("rmS");
            expect(s.getEnforcer("rmS")).toBeUndefined();
        });

        it("removeEnforcer by instance removes it", () => {
            const s = sel();
            const sub = new MyEnforcer({element: s.element} as any);
            sub.keyName = "rmSRef";
            s.addEnforcer(sub);
            s.removeEnforcer(sub);
            expect(s.getEnforcer("rmSRef")).toBeUndefined();
        });

        it("addEnforcer returns itself for method chaining", () => {
            const s = sel();
            const sub = new MyEnforcer({element: s.element} as any);
            sub.keyName = "chain";
            expect(s.addEnforcer(sub)).toBe(s);
        });
    });

    // ------------------------------------------------------------------
    // Cross-wiring
    // ------------------------------------------------------------------

    describe("cross-wiring", () => {
        it("setting model after view wires view.model to the new model", () => {
            const s = sel();
            s.setMvc({view: MyView, initialize: false});
            const m = new MyModel();
            s.model = m;
            expect(s.view.model).toBe(m);
        });

        it("replacing model re-links view and emitter to the new model", () => {
            const s = sel();
            s.setMvc({model: MyModel, view: MyView, initialize: false});
            const newModel = new MyModel({data: {foo: 99}});
            s.model = newModel;
            expect(s.view.model).toBe(newModel);
        });

        it("model changes propagate to the emitter via fireKey", () => {
            const s = sel();
            s.setMvc({model: MyModel, emitter: TurboEmitter, data: {foo: 0}, initialize: true});
            const observed: number[] = [];
            s.emitter.addKey((v: number) => observed.push(v), "foo");
            s.model.set(42, "foo");
            expect(observed).toEqual([42]);
        });
    });
});