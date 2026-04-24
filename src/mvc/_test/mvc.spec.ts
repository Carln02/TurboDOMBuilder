import {describe, it, expect} from "vitest";
import {TurboView} from "../view/view";
import {TurboHandler} from "../handler/handler";
import {TurboEmitter} from "../emitter/emitter";
import {TurboController} from "../controller/controller";
import {TurboModel} from "../model/model";
import {TurboInteractor} from "../interactor/interactor";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

type TestData = { foo?: number; bar?: string };

class MyModel extends TurboModel<TestData> {}

class MyView extends TurboView<object, MyModel, TurboEmitter> {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyController extends TurboController<object, MyView, MyModel, TurboEmitter> {
    public inits = 0;
    public override initialize(): void { super.initialize(); this.inits++; }
}

class MyHandler extends TurboHandler<MyModel> {}

class MyInteractor extends TurboInteractor<object, MyView, MyModel, TurboEmitter> {}

describe("MVC", () => {
    // ------------------------------------------------------------------
// Construction & wiring
// ------------------------------------------------------------------

    describe("Mvc — construction & wiring", () => {
        it("creates model, view, emitter, controller, and handler from constructors", () => {
            const element = {name: "widget"};

            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                emitter: TurboEmitter,
                controllers: [MyController],
                handlers: [MyHandler],
                data: {foo: 1, bar: "a"},
                initialize: true,
            });

            expect(mvc.model).toBeInstanceOf(MyModel);
            expect(mvc.data).toEqual({foo: 1, bar: "a"});
            expect(mvc.view).toBeInstanceOf(MyView);
            expect(mvc.view.element).toBe(element);
            expect(mvc.view.model).toBe(mvc.model);
            expect(mvc.emitter).toBeInstanceOf(TurboEmitter);
            expect(mvc.view.emitter).toBe(mvc.emitter);
        });

        it("element reference is stored on the mvc instance", () => {
            const element = {id: "root"};
            const mvc = new Mvc({element});
            expect(mvc.element).toBe(element);
        });

        it("a default TurboEmitter is created when none is provided", () => {
            const mvc = new Mvc({element: {}});
            expect(mvc.emitter).toBeInstanceOf(TurboEmitter);
        });

        it("view and controller are wired to the same model and emitter", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                controllers: [MyController],
                initialize: false,
            });

            expect(mvc.view.model).toBe(mvc.model);
            expect(mvc.view.emitter).toBe(mvc.emitter);
            expect(mvc.controllers[0].model).toBe(mvc.model);
            expect(mvc.controllers[0].emitter).toBe(mvc.emitter);
            expect(mvc.controllers[0].view).toBe(mvc.view);
        });

        it("handlers are wired to the model", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                handlers: [MyHandler],
                initialize: false,
            });

            expect(mvc.handlers[0]).toBeInstanceOf(MyHandler);
            expect(mvc.handlers[0].model).toBe(mvc.model);
        });
    });

// ------------------------------------------------------------------
// Data accessors
// ------------------------------------------------------------------

    describe("Mvc — data accessors", () => {
        it("data getter returns the model's data", () => {
            const mvc = new Mvc<object, MyView, TestData, MyModel>({
                element: {},
                model: MyModel,
                data: {foo: 42},
                initialize: false,
            });
            expect(mvc.data).toEqual({foo: 42});
        });

        it("data setter updates the model's data", () => {
            const mvc = new Mvc<object, MyView, TestData, MyModel>({
                element: {},
                model: MyModel,
                data: {foo: 1},
                initialize: false,
            });
            mvc.data = {foo: 99};
            expect(mvc.data).toEqual({foo: 99});
        });

        it("dataId / dataIndex map to model.id", () => {
            const mvc = new Mvc<object, MyView, TestData, MyModel>({
                element: {},
                model: MyModel,
                initialize: false,
            });
            mvc.dataId = "42";
            expect(mvc.dataId).toBe("42");
            expect(mvc.dataIndex).toBe(42);

            mvc.dataIndex = 7;
            expect(mvc.dataId).toBe("7");
        });

        it("dataSize reflects the number of top-level keys in the model", () => {
            const mvc = new Mvc<object, MyView, TestData, MyModel>({
                element: {},
                model: MyModel,
                data: {foo: 1, bar: "x"},
                initialize: false,
            });
            expect(mvc.dataSize).toBe(2);
        });
    });

// ------------------------------------------------------------------
// Model → Emitter propagation
// ------------------------------------------------------------------

    describe("Mvc — model → emitter propagation", () => {
        it("model key changes are forwarded to emitter.fireKey", () => {
            const element = {name: "widget"};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                emitter: TurboEmitter,
                data: {foo: 1},
                initialize: true,
            });

            const emitter = mvc.emitter;
            const model = mvc.model as MyModel;
            const observed: number[] = [];

            // Use addKey (not add) to listen for model key changes
            emitter.addKey((v) => observed.push(v), "foo");

            model.set(42, "foo");
            expect(observed).toEqual([42]);

            model.set(43, "foo");
            expect(observed).toEqual([42, 43]);
        });

        it("model changes to multiple keys fire independent emitter callbacks", () => {
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element: {},
                model: MyModel,
                emitter: TurboEmitter,
                data: {foo: 0, bar: "x"},
                initialize: true,
            });

            const foos: number[] = [];
            const bars: string[] = [];

            mvc.emitter.addKey((v) => foos.push(v), "foo");
            mvc.emitter.addKey((v) => bars.push(v), "bar");

            mvc.model.set(10, "foo");
            mvc.model.set("y", "bar");

            expect(foos).toEqual([10]);
            expect(bars).toEqual(["y"]);
        });
    });

// ------------------------------------------------------------------
// get/add/remove pieces
// ------------------------------------------------------------------

    describe("Mvc — getController / getHandler / getInteractor", () => {
        it("getController retrieves a controller by auto-derived key", () => {
            const element = {};
            const mvc = new Mvc({
                element,
                controllers: [MyController],
                initialize: false,
            });

            // At least one controller should exist in the map
            expect((mvc as any)._controllers.size).toBe(1);
            const key = (mvc as any)._controllers.keys().next().value;
            expect(mvc.getController(key)).toBeInstanceOf(MyController);
        });

        it("getHandler retrieves a handler by auto-derived key", () => {
            const element = {};
            const mvc = new Mvc({
                element,
                model: MyModel,
                handlers: [MyHandler],
                initialize: false,
            });

            expect((mvc as any)._handlers.size).toBe(1);
            const key = (mvc as any)._handlers.keys().next().value;
            expect(mvc.getHandler(key)).toBeInstanceOf(MyHandler);
        });

        it("addController wires the new controller to existing pieces", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                emitter: TurboEmitter,
                initialize: false,
            });

            const ctrl = new MyController({element} as any);
            ctrl.keyName = "extra";
            mvc.addController(ctrl);

            expect(mvc.getController("extra")).toBe(ctrl);
            expect(ctrl.model).toBe(mvc.model);
            expect(ctrl.emitter).toBe(mvc.emitter);
        });

        it("addHandler wires the new handler to the model", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel>({
                element,
                model: MyModel,
                initialize: false,
            });

            const handler = new MyHandler();
            handler.keyName = "extra";
            mvc.addHandler(handler);

            expect(mvc.getHandler("extra")).toBe(handler);
            expect(handler.model).toBe(mvc.model);
        });
    });

// ------------------------------------------------------------------
// generate() and getDifference()
// ------------------------------------------------------------------

    describe("Mvc — generate()", () => {
        it("generate() adds pieces incrementally without resetting existing ones", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                initialize: false,
            });

            mvc.generate({
                controllers: MyController,
                handlers: [MyHandler],
                initialize: false,
            });

            expect((mvc as any)._controllers.size).toBeGreaterThan(0);
            expect((mvc as any)._handlers.size).toBeGreaterThan(0);
        });

        it("generate() with initialize:true calls initialize on all pieces", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                initialize: false,
            });

            mvc.generate({initialize: true});

            expect((mvc.view as MyView).inits).toBe(1);
        });
    });

    describe("Mvc — getDifference()", () => {
        it("returns empty object when configurations match (including default emitter)", () => {
            const element = {};
            const mvc = new Mvc({
                element,
                model: MyModel,
                view: MyView,
                initialize: false,
            });

            // Mvc always creates a default TurboEmitter; include it in the comparison
            const diff = mvc.getDifference({model: MyModel, view: MyView, emitter: TurboEmitter});
            expect(Object.keys(diff).length).toBe(0);
        });

        it("returns the constructors not present in the provided config", () => {
            const element = {};
            const mvc = new Mvc({
                element,
                model: MyModel,
                view: MyView,
                initialize: false,
            });

            // Provide an empty config → both model and view are "extra"
            const diff = mvc.getDifference({});
            expect(diff.model).toBeDefined();
            expect(diff.view).toBeDefined();
        });

        it("returns only the collection entries not present in the provided config", () => {
            const element = {};
            const mvc = new Mvc({
                element,
                controllers: [MyController],
                initialize: false,
            });

            const diff = mvc.getDifference({});
            expect(Array.isArray(diff.controllers)).toBe(true);
            expect((diff.controllers as any[]).length).toBeGreaterThan(0);
        });
    });

// ------------------------------------------------------------------
// initialize()
// ------------------------------------------------------------------

    describe("Mvc — initialize()", () => {
        it("initialize() calls initialize on view, controllers, interactors, tools, substrates, model", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                controllers: [MyController],
                initialize: false,
            });

            mvc.initialize();

            expect((mvc.view as MyView).inits).toBe(1);
            expect((mvc.controllers[0] as MyController).inits).toBe(1);
        });

        it("initialize() is idempotent in that it can be called multiple times", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                initialize: false,
            });

            mvc.initialize();
            mvc.initialize();

            expect((mvc.view as MyView).inits).toBe(2);
        });
    });

// ------------------------------------------------------------------
// Re-assigning pieces re-links everything
// ------------------------------------------------------------------

    describe("Mvc — re-assigning pieces", () => {
        it("replacing model re-links view and emitter to the new model", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                initialize: false,
            });

            const newModel = new MyModel({data: {foo: 99}});
            mvc.model = newModel;

            expect(mvc.view.model).toBe(newModel);
            expect(mvc.emitter.model).toBe(newModel);
        });

        it("replacing emitter re-links view and controllers", () => {
            const element = {};
            const mvc = new Mvc<object, MyView, TestData, MyModel, TurboEmitter>({
                element,
                model: MyModel,
                view: MyView,
                controllers: [MyController],
                initialize: false,
            });

            const newEmitter = new TurboEmitter();
            mvc.emitter = newEmitter;

            expect(mvc.view.emitter).toBe(newEmitter);
            expect(mvc.controllers[0].emitter).toBe(newEmitter);
        });
    });
})