import {describe, it, expect} from "vitest";
import {controller, handler} from "../controller";

describe("controller decorator", () => {
    it("infers key from <name>Controller and fetches via getController()", () => {
        const ctrlObj = {kind: "ctrl"};

        class Host {
            calls: string[] = [];

            getController(name: string) {
                this.calls.push(name);
                return name === "dispatch" ? ctrlObj : undefined;
            }

            @controller() dispatchController!: unknown;
        }

        const h = new Host();

        expect(h.dispatchController).toBe(ctrlObj);
        expect(h.dispatchController).toBe(ctrlObj);
        expect(h.calls).toEqual(["dispatch"]);
    });

    it("uses explicit name when provided", () => {
        const ctrlObj = {name: "explicit"};

        class Host {
            calls: string[] = [];

            getController(name: string) {
                this.calls.push(name);
                return name === "my" ? ctrlObj : undefined;
            }

            @controller("my") toolController!: unknown;
        }

        const h = new Host();
        expect(h.toolController).toBe(ctrlObj);
        expect(h.calls).toEqual(["my"]);
    });

    it("falls back to property name when no suffix", () => {
        const ctrlObj = {any: true};

        class Host {
            calls: string[] = [];

            getController(name: string) {
                this.calls.push(name);
                return name === "picker" ? ctrlObj : undefined;
            }

            @controller() picker!: unknown;
        }

        const h = new Host();
        expect(h.picker).toBe(ctrlObj);
        expect(h.calls).toEqual(["picker"]);
    });

    it("throws helpful error when controller not found", () => {
        class Host {
            getController(_name: string) {
                return undefined;
            }

            @controller() missingController!: unknown;
        }

        const h = new Host();
        expect(() => (h as any).missingController).toThrow(/Controller "missing"/);
    });

    it("setter overrides cached value", () => {
        const first = {id: 1};
        const second = {id: 2};

        class Host {
            calls = 0;

            getController(name: string) {
                this.calls++;
                return name === "a" ? first : undefined;
            }

            @controller() aController!: unknown;
        }

        const h = new Host();
        expect(h.aController).toBe(first);
        expect(h.calls).toBe(1);

        (h as any).aController = second;
        expect(h.aController).toBe(second);
        expect(h.calls).toBe(1);
    });

    it("property is non-enumerable", () => {
        const val = {};

        class Host {
            getController() { return val; }

            @controller() demoController!: unknown;
        }

        const h = new Host();

        expect(h.demoController).toBe(val);
        expect(Object.keys(h)).not.toContain("demoController");
    });
});

describe("handler decorator", () => {
    it("infers key from <name>Handler and fetches via getHandler()", () => {
        const hObj = {kind: "handler"};

        class Host {
            calls: string[] = [];

            getHandler(name: string) {
                this.calls.push(name);
                return name === "state" ? hObj : undefined;
            }

            @handler() stateHandler!: unknown;
        }

        const h = new Host();
        expect(h.stateHandler).toBe(hObj);
        expect(h.calls).toEqual(["state"]);
    });

    it("explicit name for handler", () => {
        const hObj = {tag: "ok"};

        class Host {
            calls: string[] = [];

            getHandler(n: string) {
                this.calls.push(n);
                return n === "ctx" ? hObj : undefined;
            }

            @handler("ctx") local!: unknown;
        }

        const h = new Host();
        expect(h.local).toBe(hObj);
        expect(h.calls).toEqual(["ctx"]);
    });

    it("throws when handler not found", () => {
        class Host {
            getHandler() { return undefined; }

            @handler() missingHandler!: unknown;
        }

        const h = new Host();
        expect(() => (h as any).missingHandler).toThrow(/Handler "missing"/);
    });
});
