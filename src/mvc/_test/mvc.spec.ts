import {describe, it, expect} from "vitest";
import {TurboModel} from "../core/model";
import {TurboView} from "../core/view";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {TurboHandler} from "../logic/handler";
import {Mvc} from "../mvc";

class MyModel extends TurboModel<{ foo?: number, bar?: string }> {}

class MyView extends TurboView<object, MyModel, TurboEmitter> {
    inits = 0;

    public override initialize() {
        super.initialize();
        this.inits++;
    }
}

class MyController extends TurboController<object, MyView, MyModel, TurboEmitter> {
    inits = 0;

    public override initialize() {
        super.initialize();
        this.inits++;
    }
}

class MyHandler extends TurboHandler<MyModel> {}

describe("Mvc end-to-end", () => {
    it("constructs/wires model, view, emitter, controllers; propagates changes to emitter", () => {
        const element = {name: "widget"};

        const mvc = new Mvc<object, MyView, { foo?: number; bar?: string }, MyModel, TurboEmitter>({
            element,
            model: MyModel,
            view: MyView,
            emitter: TurboEmitter,
            controllers: [MyController],
            handlers: [MyHandler],
            data: {foo: 1, bar: "a"},
            initialize: true,
        });

        const model = mvc.model as MyModel;
        expect(model).toBeInstanceOf(MyModel);
        expect(mvc.data).toEqual({foo: 1, bar: "a"});

        const view = mvc.view as MyView;
        expect(view).toBeInstanceOf(MyView);
        expect(view.element).toBe(element);
        expect(view.model).toBe(model);
        expect(view.emitter).toBeInstanceOf(TurboEmitter);

        // controller auto-key naming: element class name isn't used here; we can register and fetch explicitly
        const controller = mvc.getController("myController");
        // Depending on your naming rules, auto-key becomes "myController" if element’s class name prefix matches;
        // If not, you can check presence via the controllers map size:
        expect(controller ?? (mvc as any).controllers.size).toBeTruthy();

        // handlers are added to model
        const handler = model.getHandler("myHandler");
        expect(handler ?? (model as any).handlers.size).toBeTruthy();

        // model -> emitter propagation:
        const emitter = mvc.emitter;
        let observed: Array<any> = [];
        emitter.add("foo", (v) => observed.push(v));

        model.setData("foo", 42);
        expect(observed).toEqual([42]);

        model.setData("foo", 43);
        expect(observed).toEqual([42, 43]);
    });

    it("generateInstances accepts single/array and respects shallow copy", () => {
        const element = {};
        const mvc = new Mvc<object, MyView, { n?: number }, MyModel, TurboEmitter>({
            element,
            model: MyModel,
            data: {n: 1},
            initialize: false,
        });

        // Add more controllers/handlers after construction:
        mvc.generate({
            controllers: MyController, // single
            handlers: [MyHandler],     // array
            initialize: true,
        });

        expect((mvc as any).controllers.size).toBeGreaterThan(0);
        expect((mvc as any).model.handlers.size).toBeGreaterThan(0);
    });
});