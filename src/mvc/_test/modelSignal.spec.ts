import {describe, it, expect} from "vitest";
import * as Y from "yjs";
import {TurboModel} from "../model/model";
import {TurboYModel} from "../model/yModel";
import {effect, modelSignal} from "../../decorators/reactivity/reactivity";

async function flushMicrotasks(times = 4) {
    for (let i = 0; i < times; i++) await Promise.resolve();
}

class CardModel extends TurboModel {
    @modelSignal() cardData: any;
    @modelSignal("cardData", "title") cardTitle: string;
}

class CardYModel extends TurboYModel {
    @modelSignal() thumbnail: string;
    @modelSignal() cardData: any;
    @modelSignal("cardData", "title") cardTitle: string;
}

describe("@modelSignal — path-bound invalidation", () => {

    describe("plain TurboModel", () => {
        it("re-runs an effect on a nested binding when the parent key is replaced", async () => {
            const model = new CardModel({data: {}});

            const seen: string[] = [];
            const stop = effect(() => seen.push(model.cardTitle));
            expect(seen).toEqual([undefined]);

            model.cardData = {title: "hello"};
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("hello");

            model.cardData = {title: "world"};
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("world");

            stop();
        });

        it("re-runs an effect on the parent binding when a nested key changes", async () => {
            const model = new CardModel({data: {cardData: {title: "a"}}});

            let parentRuns = 0;
            const stop = effect(() => {
                parentRuns++;
                void model.cardData;
            });
            expect(parentRuns).toBe(1);

            model.set("b", "cardData", "title");
            await flushMicrotasks();
            expect(parentRuns).toBe(2);
            expect(model.cardTitle).toBe("b");

            stop();
        });

        it("re-runs path-bound effects when the whole data is reassigned, including removed keys", async () => {
            const model = new CardModel({data: {cardData: {title: "a"}}});

            const seen: string[] = [];
            const stop = effect(() => seen.push(model.cardTitle));
            expect(seen).toEqual(["a"]);

            model.data = {cardData: {title: "b"}};
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("b");

            // New data no longer contains the bound path's top-level key
            model.data = {somethingElse: true};
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe(undefined);

            stop();
        });

        it("runs an effect at most once per flush for a single write", async () => {
            const model = new CardModel({data: {cardData: {title: "a"}}});

            let runs = 0;
            const stop = effect(() => {
                runs++;
                void model.cardTitle;
            });
            expect(runs).toBe(1);

            model.cardTitle = "b";
            await flushMicrotasks();
            expect(runs).toBe(2);

            // No trailing re-runs in later flushes (no loops)
            await flushMicrotasks();
            await flushMicrotasks();
            expect(runs).toBe(2);

            stop();
        });
    });

    describe("TurboYModel", () => {
        it("re-runs effects on a second model instance bound to the same Y.Map", async () => {
            const doc = new Y.Doc();
            const ymap = doc.getMap("root");
            const m1 = CardYModel.create({data: ymap as any, initialize: true}) as CardYModel;
            const m2 = CardYModel.create({data: ymap as any, initialize: true}) as CardYModel;

            const seen: string[] = [];
            const stop = effect(() => seen.push(m2.thumbnail));
            expect(seen).toEqual([undefined]);

            m1.thumbnail = "snapshot.png";
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("snapshot.png");
            expect(m2.thumbnail).toBe("snapshot.png");

            stop();
        });

        it("re-runs nested bindings on a second instance when the parent key is replaced", async () => {
            const doc = new Y.Doc();
            const ymap = doc.getMap("root");
            const m1 = CardYModel.create({data: ymap as any, initialize: true}) as CardYModel;
            const m2 = CardYModel.create({data: ymap as any, initialize: true}) as CardYModel;

            const seen: string[] = [];
            const stop = effect(() => seen.push(m2.cardTitle));
            expect(seen).toEqual([undefined]);

            m1.cardData = new Y.Map([["title", "from m1"]]);
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("from m1");

            stop();
        });

        it("re-runs local effects when a remote Y.js transaction changes the data", async () => {
            const docA = new Y.Doc();
            const docB = new Y.Doc();
            const mapA = docA.getMap("root");
            const mapB = docB.getMap("root");

            mapA.set("cardData", new Y.Map([["title", "initial"]]));
            Y.applyUpdate(docB, Y.encodeStateAsUpdate(docA));

            const model = CardYModel.create({data: mapB as any, initialize: true}) as CardYModel;

            const seen: string[] = [];
            const stop = effect(() => seen.push(model.cardTitle));
            expect(seen).toEqual(["initial"]);

            // Remote replacement of the parent key
            mapA.set("cardData", new Y.Map([["title", "replaced"]]));
            Y.applyUpdate(docB, Y.encodeStateAsUpdate(docA, Y.encodeStateVector(docB)));
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("replaced");

            // Remote change of the nested key itself
            (mapA.get("cardData") as Y.Map<any>).set("title", "deep");
            Y.applyUpdate(docB, Y.encodeStateAsUpdate(docA, Y.encodeStateVector(docB)));
            await flushMicrotasks();
            expect(seen[seen.length - 1]).toBe("deep");

            stop();
        });

        it("runs an effect at most once per flush for a single write through the decorated setter", async () => {
            const doc = new Y.Doc();
            const ymap = doc.getMap("root");
            const model = CardYModel.create({data: ymap as any, initialize: true}) as CardYModel;
            model.cardData = new Y.Map([["title", "a"]]);
            await flushMicrotasks();

            let runs = 0;
            const stop = effect(() => {
                runs++;
                void model.cardTitle;
            });
            expect(runs).toBe(1);

            model.cardTitle = "b";
            await flushMicrotasks();
            expect(runs).toBe(2);
            expect(model.get("cardData", "title")).toBe("b");

            await flushMicrotasks();
            await flushMicrotasks();
            expect(runs).toBe(2);

            stop();
        });
    });
});
