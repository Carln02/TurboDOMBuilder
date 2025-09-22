import { describe, it, expect } from "vitest";
import {TurboTool} from "../tool/tool";
import {TurboView} from "../core/view";
import {TurboEmitter} from "../core/emitter";
import {TurboModel} from "../core/model";
import {div} from "../../elementCreation/basicElements";
import {$} from "../../turboFunctions/turboFunctions";

class DemoTool extends TurboTool {
    rand = 0;
    click() {this.rand++; return true}
}

describe("TurboTool (smoke)", () => {
    it("constructs and initialize() runs when toolName is set", () => {
        const element = div({parent: document.body});
        const model = new TurboModel<any>({});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({ element, model, emitter });

        const tool = new DemoTool({
            element, view, model, emitter,
            toolName: "brush"
        });

        expect(tool.rand).toBe(0);
        expect(() => tool.initialize()).not.toThrow();
        $(div()).executeAction("turbo-click", "brush", new Event("turbo-click"));
        expect(tool.rand).toBe(1);
    });

    it("initialize() is a no-op when toolName is missing", () => {
        const element = {};
        const model = new TurboModel<any>({});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({ element, model, emitter });

        const tool = new DemoTool({ element, view, model, emitter });
        expect(() => tool.initialize()).not.toThrow();
    });
});
