import {describe, it, expect} from "vitest";
import {TurboTool} from "../tool/tool";
import {TurboOperator} from "../operator/operator";
import {TurboView} from "../view/view";
import {div} from "../../elementCreation/basicElements";
import {$, turbo} from "../../turboFunctions/turboFunctions";
import {behavior} from "../../decorators/listener/listener";
import {TurboModel} from "../model/model";
import {TurboEmitter} from "../emitter/emitter";

class DemoTool extends TurboTool {
    public rand = 0;

    @behavior() click(_e: any, _target: any): void { this.rand++; }
}

class MinimalTool extends TurboTool {}

describe("TurboTool", () => {
    it("is a subclass of TurboOperator", () => {
        const element = div({parent: document.body});
        const tool = new MinimalTool({element});
        expect(tool).toBeInstanceOf(TurboOperator);
    });

    it("constructor assigns element, view, model, emitter, toolName", () => {
        const element = div({parent: document.body});
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({element, model, emitter} as any);

        const tool = new MinimalTool({element, view, model, emitter, toolName: "brush"} as any);

        expect(tool.element).toBe(element);
        expect(tool.view).toBe(view);
        expect(tool.model).toBe(model);
        expect(tool.emitter).toBe(emitter);
        expect(tool.toolName).toBe("brush");
    });

    it("toolName defaults to undefined when not provided", () => {
        const element = div({parent: document.body});
        const tool = new MinimalTool({element} as any);
        expect(tool.toolName).toBeUndefined();
    });

    it("key property is set from properties", () => {
        const element = div({parent: document.body});
        const tool = new MinimalTool({element, key: "b"} as any);
        expect(tool.key).toBe("b");
    });

    it("initialize() does not throw when toolName is undefined", () => {
        const element = {};
        const tool = new MinimalTool({element} as any);
        expect(() => tool.initialize()).not.toThrow();
    });

    it("initialize() does not throw when toolName is set", () => {
        const element = div({parent: document.body});
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({element, model, emitter} as any);

        const tool = new DemoTool({element, view, model, emitter, toolName: "brush"} as any);
        expect(() => tool.initialize()).not.toThrow();
    });

    it("@behavior decorator wires click events after initialize() with a toolName", () => {
        const element = div({parent: document.body});
        const model = new TurboModel({data: {}});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({element, model, emitter} as any);

        const tool = new DemoTool({element, view, model, emitter, toolName: "brush"} as any);
        tool.initialize();

        expect(tool.rand).toBe(0);
        $(div()).executeAction("turbo-click", "brush", new Event("turbo-click"));
        expect(tool.rand).toBe(1);
    });

    it("keyName can be assigned explicitly", () => {
        const tool = new MinimalTool({element: {}} as any);
        tool.keyName = "myTool";
        expect(tool.keyName).toBe("myTool");
    });
});