import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";

describe("misc TurboSelector functions", () => {
    const makeDiv = () => {
        const d = document.createElement("div");
        document.body.appendChild(d);
        return d;
    };

    it("calls the callback with the TurboSelector instance", () => {
        const node = makeDiv();
        const ts = $(node);

        const cb = vi.fn();
        const ret = ts.execute(cb);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(ts);
        expect(ret).toBe(ts); // returns itself for chaining
    });

    it("supports chaining (executes callbacks in order)", () => {
        const node = makeDiv();
        const ts = $(node);

        const seen: string[] = [];
        ts.execute(() => { seen.push("a"); })
            .execute(() => { seen.push("b"); })
            .execute(() => { seen.push("c"); });

        expect(seen).toEqual(["a", "b", "c"]);
    });

    it("can mutate the underlying element via the selector", () => {
        const node = makeDiv();
        const ts = $(node);

        ts.execute((self) => (self.element as HTMLElement).id = "x");
        expect((ts.element as HTMLElement).id).toBe("x");
    });
});