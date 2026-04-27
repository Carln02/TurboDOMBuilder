import {describe, it, expect} from "vitest";
import {operator, handler, interactor, tool, substrate} from "../mvc";
import {TurboOperator} from "../../mvc/operator/operator";
import {TurboHandler} from "../../mvc/handler/handler";
import {TurboInteractor} from "../../mvc/interactor/interactor";
import {TurboTool} from "../../mvc/tool/tool";
import {TurboSubstrate} from "../../mvc/substrate/substrate";
import {TurboHeadlessElement} from "../../turboElement/turboHeadlessElement/turboHeadlessElement";
import {TurboModel} from "../../mvc/model/model";

describe("MVC decorators", () => {
    describe("operator decorator", () => {
        it("infers key from <name>Operator and fetches via getOperator()", () => {
            class DispatchOperator extends TurboOperator {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {operators: DispatchOperator};
                @operator() dispatchOperator!: unknown;
            }

            const h = Host.create();
            expect(h.dispatchOperator).toBeInstanceOf(DispatchOperator);
        });

        it("uses explicit name when provided", () => {
            class MyOperator extends TurboOperator {keyName = "my"}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {operators: MyOperator};
                @operator("my") toolOperator!: unknown;
            }

            const h = Host.create();
            expect(h.toolOperator).toBeInstanceOf(MyOperator);
        });

        it("throws helpful error when operator not found", () => {
            class Host extends TurboHeadlessElement {
                @operator() missingOperator!: unknown;
            }

            const h = Host.create();
            expect(() => (h as any).missingOperator).toThrow(/Operator "missing"/);
        });

        it("setter overrides cached value", () => {
            class AOperator extends TurboOperator {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {operators: AOperator};
                @operator() aOperator!: unknown;
            }

            const h = Host.create();
            const first = h.aOperator;
            expect(first).toBeInstanceOf(AOperator);

            const second = new AOperator(h as any);
            h.aOperator = second;
            expect(h.aOperator).toBe(second);
            expect(h.aOperator).not.toBe(first);
        });

        it("property is non-enumerable", () => {
            class DemoOperator extends TurboOperator {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {operators: DemoOperator};
                @operator() demoOperator!: unknown;
            }

            const h = Host.create();
            expect(h.demoOperator).toBeInstanceOf(DemoOperator);
            expect(Object.keys(h)).not.toContain("demoOperator");
        });
    });

    describe("handler decorator", () => {
        it("infers key from <name>Handler and fetches via getHandler()", () => {
            class StateHandler extends TurboHandler {}
            class MyModel extends TurboModel {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {
                    model: MyModel,
                    handlers: StateHandler
                };
                @handler() stateHandler!: unknown;
            }

            const h = Host.create();
            expect(h.stateHandler).toBeInstanceOf(StateHandler);
        });

        it("uses explicit name for handler", () => {
            class CtxHandler extends TurboHandler {keyName = "ctx"}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {
                    model: TurboModel,
                    handlers: CtxHandler
                };
                @handler("ctx") local!: unknown;
            }

            const h = Host.create();
            expect(h.local).toBeInstanceOf(CtxHandler);
        });

        it("throws when handler not found", () => {
            class Host extends TurboHeadlessElement {
                @handler() missingHandler!: unknown;
            }

            const h = Host.create();
            expect(() => (h as any).missingHandler).toThrow(/Handler "missing"/);
        });
    });

    describe("interactor decorator", () => {
        it("infers key from <name>Interactor and fetches via getInteractor()", () => {
            class DragInteractor extends TurboInteractor {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {interactors: DragInteractor};
                @interactor() dragInteractor!: unknown;
            }

            const h = Host.create();
            expect(h.dragInteractor).toBeInstanceOf(DragInteractor);
        });

        it("uses explicit name for interactor", () => {
            class MyInteractor extends TurboInteractor {keyName = "my"}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {interactors: MyInteractor};
                @interactor("my") local!: unknown;
            }

            const h = Host.create();
            expect(h.local).toBeInstanceOf(MyInteractor);
        });

        it("throws when interactor not found", () => {
            class Host extends TurboHeadlessElement {
                @interactor() missingInteractor!: unknown;
            }

            const h = Host.create();
            expect(() => (h as any).missingInteractor).toThrow(/Interactor "missing"/);
        });
    });

    describe("tool decorator", () => {
        it("infers key from <name>Tool and fetches via getTool()", () => {
            class SelectTool extends TurboTool {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {tools: SelectTool};
                @tool() selectTool!: unknown;
            }

            const h = Host.create();
            expect(h.selectTool).toBeInstanceOf(SelectTool);
        });

        it("uses explicit name for tool", () => {
            class MyTool extends TurboTool {keyName = "my"}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {tools: MyTool};
                @tool("my") local!: unknown;
            }

            const h = Host.create();
            expect(h.local).toBeInstanceOf(MyTool);
        });

        it("throws when tool not found", () => {
            class Host extends TurboHeadlessElement {
                @tool() missingTool!: unknown;
            }

            const h = Host.create();
            expect(() => (h as any).missingTool).toThrow(/Tool "missing"/);
        });
    });

    describe("substrate decorator", () => {
        it("infers key from <name>Substrate and fetches via getSubstrate()", () => {
            class GridSubstrate extends TurboSubstrate {}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {substrates: GridSubstrate};
                @substrate() gridSubstrate!: unknown;
            }

            const h = Host.create();
            expect(h.gridSubstrate).toBeInstanceOf(GridSubstrate);
        });

        it("uses explicit name for substrate", () => {
            class MySubstrate extends TurboSubstrate {keyName = "my"}
            class Host extends TurboHeadlessElement {
                static defaultProperties = {substrates: MySubstrate};
                @substrate("my") local!: unknown;
            }

            const h = Host.create();
            expect(h.local).toBeInstanceOf(MySubstrate);
        });

        it("throws when substrate not found", () => {
            class Host extends TurboHeadlessElement {
                @substrate() missingSubstrate!: unknown;
            }

            const h = Host.create();
            expect(() => (h as any).missingSubstrate).toThrow(/Substrate "missing"/);
        });
    });
})
