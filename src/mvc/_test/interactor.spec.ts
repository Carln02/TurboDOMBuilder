import {describe, it, expect} from "vitest";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {TurboView} from "../core/view";
import {TurboInteractor} from "../interactor/interactor";
import {$} from "../../turboFunctions/turboFunctions";
import {div} from "../../elementCreation/basicElements";

class DemoInteractor extends TurboInteractor {
    rand = 0;
    click(e: Event): void {this.rand++}
}

describe("TurboInteractor (smoke)", () => {
    it("constructs and initialize() runs", () => {
        const element = div({parent: document.body});

        const model = new TurboModel<any>({});
        const emitter = new TurboEmitter(model);
        const view = new TurboView({ element, model, emitter });

        const itc = new DemoInteractor({ element, view, model, emitter, toolName: undefined as any });
        expect(itc.rand).toBe(0);
        expect(() => itc.initialize()).not.toThrow();

        $(element).executeAction("turbo-click", null, new Event("turbo-click"));
        expect(itc.rand).toBe(1);
    });
});
