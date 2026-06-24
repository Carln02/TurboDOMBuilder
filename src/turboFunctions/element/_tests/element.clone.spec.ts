import {describe, it, expect} from "vitest";
import * as Y from "yjs";
import {TurboElement} from "../../../turboElement/turboElement";
import {TurboModel} from "../../../mvc/model/model";
import {TurboView} from "../../../mvc/view/view";
import {TurboOperator} from "../../../mvc/operator/operator";
import {TurboYModel} from "../../../mvc/model/yModel";
import {define} from "../../../decorators/define/define";
import {turbo} from "../../turboFunctions";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

class NoteModel extends TurboModel {}
class NoteView extends TurboView {}
class NoteOperator extends TurboOperator {}

@define("CloneCard")
class CloneCard extends TurboElement {
    static defaultProperties = {
        model: NoteModel,
        view: NoteView,
        operators: NoteOperator,
    };

    label: string = "";
    priority: number = 0;
    tags: string[] = [];
    meta: Record<string, number> = {};
    thumbnail: HTMLSpanElement | null = null;

    get readonlyGetter(): string {
        return "fixed-value";
    }
}

class YjsNoteModel extends TurboYModel {}

@define("YjsCard")
class YjsCard extends TurboElement {
    static defaultProperties = {
        model: YjsNoteModel,
    };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeCard(): CloneCard {
    const el = CloneCard.create() as CloneCard;
    (el as any).data = {title: "Hello World", count: 42};
    el.label = "sticky-note";
    el.priority = 7;
    el.tags = ["urgent", "work"];
    el.meta = {weight: 3, score: 100};
    el.thumbnail = document.createElement("span");
    return el;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("TurboSelector.clone — vanilla element", () => {
    it("returns a new element, not the same reference", () => {
        const div = document.createElement("div");
        const clone = turbo(div).clone();
        expect(clone).not.toBe(div);
    });

    it("preserves tagName", () => {
        const button = document.createElement("button");
        const clone = turbo(button).clone();
        expect((clone as Element).tagName).toBe("BUTTON");
    });

    it("copies id and class attributes", () => {
        const div = document.createElement("div");
        div.id = "my-id";
        div.classList.add("foo", "bar");
        const clone = turbo(div).clone() as HTMLDivElement;
        expect(clone.id).toBe("my-id");
        expect(clone.classList.contains("foo")).toBe(true);
        expect(clone.classList.contains("bar")).toBe(true);
    });

    it("does not throw when element has no attributes", () => {
        const span = document.createElement("span");
        expect(() => turbo(span).clone()).not.toThrow();
    });
});

describe("TurboSelector.clone — type and identity (CloneCard)", () => {
    it("clone is instanceof the same class", () => {
        const origin = makeCard();
        const clone = origin.clone();
        expect(clone).toBeInstanceOf(CloneCard);
    });

    it("clone is a different object reference", () => {
        const origin = makeCard();
        const clone = origin.clone();
        expect(clone).not.toBe(origin);
    });

    it("clone is initialized", () => {
        const origin = makeCard();
        const clone = origin.clone();
        expect((clone as any).initialized).toBe(true);
    });
});

describe("TurboSelector.clone — primitive and plain fields", () => {
    it("copies string field", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.label).toBe("sticky-note");
    });

    it("copies number field", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.priority).toBe(7);
    });

    it("modifying origin string after clone does not affect clone", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        origin.label = "changed";
        expect(clone.label).toBe("sticky-note");
    });
});

describe("TurboSelector.clone — object and array fields", () => {
    it("arrays are shared by reference by default", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.tags).toBe(origin.tags);
    });

    it("objects are shared by reference by default", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.meta).toBe(origin.meta);
    });

    it("shared object mutation is visible in both sides", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        origin.meta.weight = 999;
        expect(clone.meta.weight).toBe(999);
    });

    it("deep-clones objects with deepCloneObjects: true", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        expect(clone.meta).not.toBe(origin.meta);
        expect(clone.meta.weight).toBe(3);
        expect(clone.meta.score).toBe(100);
    });

    it("deep-cloned object is independent from origin", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        origin.meta.weight = 999;
        expect(clone.meta.weight).toBe(3);
    });

    it("deep-clones arrays with deepCloneObjects: true", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        expect(clone.tags).not.toBe(origin.tags);
        expect(clone.tags).toEqual(["urgent", "work"]);
    });

    it("deep-cloned array is independent from origin", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        origin.tags.push("extra");
        expect(clone.tags).toEqual(["urgent", "work"]);
    });
});

describe("TurboSelector.clone — node fields", () => {
    it("node fields are NOT copied by default (remain at field initializer value)", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.thumbnail).toBeNull();
    });

    it("node fields are shared by reference with copyNodes: true", () => {
        const origin = makeCard();
        const clone = origin.clone({copyNodes: true}) as CloneCard;
        expect(clone.thumbnail).toBe(origin.thumbnail);
    });

    it("node fields are deep-cloned with deepCloneNodes: true", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneNodes: true}) as CloneCard;
        expect(clone.thumbnail).not.toBe(origin.thumbnail);
        expect(clone.thumbnail).not.toBeNull();
        expect((clone.thumbnail as Element).tagName).toBe("SPAN");
    });

    it("per-key deepClone targets only that field", () => {
        const origin = makeCard();
        origin.meta = {weight: 5};
        const clone = origin.clone({deepClone: ["meta"]}) as CloneCard;
        expect(clone.meta).not.toBe(origin.meta);
        expect(clone.meta.weight).toBe(5);
        // thumbnail not specifically deepCloned: should stay null
        expect(clone.thumbnail).toBeNull();
    });
});

describe("TurboSelector.clone — Delegate safety", () => {
    it("onAttach is a different Delegate instance", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.onAttach).not.toBe(origin.onAttach);
    });

    it("onDetach is a different Delegate instance", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.onDetach).not.toBe(origin.onDetach);
    });

    it("listeners added to origin's onAttach don't fire on clone's attach", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        let originCount = 0;
        let cloneCount = 0;
        origin.onAttach.add(() => originCount++);
        clone.onAttach.add(() => cloneCount++);

        document.body.appendChild(origin);
        expect(originCount).toBe(1);
        expect(cloneCount).toBe(0);

        document.body.appendChild(clone);
        expect(originCount).toBe(1);
        expect(cloneCount).toBe(1);
    });
});

describe("TurboSelector.clone — getter-only and read-only fields", () => {
    it("getter-only fields are not broken in the clone (getter still works)", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect(clone.readonlyGetter).toBe("fixed-value");
    });
});

describe("TurboSelector.clone — options: exclude / forceInclude / copyReference", () => {
    it("exclude prevents the field from being copied", () => {
        const origin = makeCard();
        const clone = origin.clone({exclude: ["label"]}) as CloneCard;
        expect(clone.label).toBe(""); // field initializer default
    });

    it("exclude also suppresses that attribute from being copied", () => {
        const origin = makeCard();
        origin.id = "card-123";
        const clone = origin.clone({exclude: ["id"]}) as CloneCard;
        expect(clone.id).toBe("");
    });

    it("forceInclude can include an otherwise-excluded named field", () => {
        const origin = makeCard();
        origin.label = "overridable";
        // Without forceInclude, label is normally included — verify exclude+forceInclude round-trip
        const clone = origin.clone({exclude: ["label"], forceInclude: ["label"]}) as CloneCard;
        expect(clone.label).toBe("overridable");
    });

    it("copyReference keeps the exact object even with deepCloneObjects on", () => {
        const origin = makeCard();
        const sentinel = {weight: 3, score: 100};
        origin.meta = sentinel;
        const clone = origin.clone({deepCloneObjects: true, copyReference: ["meta"]}) as CloneCard;
        expect(clone.meta).toBe(sentinel);
    });
});

describe("TurboSelector.clone — MVC", () => {
    it("clone has its own model instance", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect((clone as any).model).not.toBe((origin as any).model);
        expect((clone as any).model).toBeInstanceOf(NoteModel);
    });

    it("clone.data has the same values as origin.data (shared reference by default)", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect((clone as any).data).toBe((origin as any).data);
        expect((clone as any).data.title).toBe("Hello World");
        expect((clone as any).data.count).toBe(42);
    });

    it("clone.data is independent with deepCloneObjects: true", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        expect((clone as any).data).not.toBe((origin as any).data);
        expect((clone as any).data.title).toBe("Hello World");
    });

    it("mutating original data does not affect deep-cloned data", () => {
        const origin = makeCard();
        const clone = origin.clone({deepCloneObjects: true}) as CloneCard;
        (origin as any).data.title = "Mutated";
        expect((clone as any).data.title).toBe("Hello World");
    });

    it("clone has a view of the same type", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect((clone as any).view).toBeInstanceOf(NoteView);
    });

    it("clone.view is a different instance from origin.view", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        expect((clone as any).view).not.toBe((origin as any).view);
    });

    it("clone has an operator of the same type", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        const cloneOps: TurboOperator[] = (clone as any).operators;
        expect(cloneOps.length).toBeGreaterThan(0);
        expect(cloneOps[0]).toBeInstanceOf(NoteOperator);
    });

    it("clone operator instance is different from origin's", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        const originOps: TurboOperator[] = (origin as any).operators;
        const cloneOps: TurboOperator[] = (clone as any).operators;
        expect(cloneOps[0]).not.toBe(originOps[0]);
    });
});

describe("TurboSelector.clone — Yjs (TurboYModel)", () => {
    function makeYjsCard() {
        const doc = new Y.Doc();
        const ymap = doc.getMap<any>("card");
        ymap.set("title", "Yjs Note");
        ymap.set("count", 7);
        const el = YjsCard.create({data: ymap} as any) as YjsCard;
        return {el, doc, ymap};
    }

    it("clone is instanceof YjsCard", () => {
        const {el} = makeYjsCard();
        const clone = el.clone();
        expect(clone).toBeInstanceOf(YjsCard);
    });

    it("clone has its own model instance", () => {
        const {el} = makeYjsCard();
        const clone = el.clone() as YjsCard;
        expect((clone as any).model).not.toBe((el as any).model);
        expect((clone as any).model).toBeInstanceOf(YjsNoteModel);
    });

    it("Y.Map data is shared by reference by default (structuredClone cannot clone Yjs types)", () => {
        const {el, ymap} = makeYjsCard();
        const clone = el.clone() as YjsCard;
        expect((clone as any).data).toBe(ymap);
    });

    it("Y.Map data is still shared even with deepCloneObjects: true (falls back to reference)", () => {
        const {el, ymap} = makeYjsCard();
        const clone = el.clone({deepCloneObjects: true}) as YjsCard;
        expect((clone as any).data).toBe(ymap);
    });

    it("mutations on the shared Y.Map are visible from both origin and clone", () => {
        const {el, ymap} = makeYjsCard();
        const clone = el.clone() as YjsCard;
        ymap.set("title", "Updated");
        expect((el as any).data.get("title")).toBe("Updated");
        expect((clone as any).data.get("title")).toBe("Updated");
    });
});

describe("TurboSelector.clone — edge cases", () => {
    it("cloning a plain div never throws", () => {
        const div = document.createElement("div");
        expect(() => turbo(div).clone()).not.toThrow();
    });

    it("returns undefined for a non-Node element (e.g. plain object)", () => {
        const obj = {};
        const result = turbo(obj as any).clone();
        expect(result).toBeUndefined();
    });

    it("does not share internal MVC collections between origin and clone", () => {
        const origin = makeCard();
        const clone = origin.clone() as CloneCard;
        // Adding an operator to origin should not appear in clone
        const extraOp = new NoteOperator((origin as any) as any);
        extraOp.keyName = "extra";
        turbo(origin).addOperator(extraOp);
        const cloneOps: TurboOperator[] = (clone as any).operators;
        expect(cloneOps.find(o => o.keyName === "extra")).toBeUndefined();
    });

    it("cloning an element with no MVC set works without throwing", () => {
        const bare = document.createElement("div");
        expect(() => turbo(bare).clone()).not.toThrow();
        const clone = turbo(bare).clone() as HTMLDivElement;
        expect(clone.tagName).toBe("DIV");
    });

    it("cloning preserves multiple css classes on the origin", () => {
        const origin = makeCard();
        origin.classList.add("highlight", "selected");
        const clone = origin.clone() as CloneCard;
        expect(clone.classList.contains("highlight")).toBe(true);
        expect(clone.classList.contains("selected")).toBe(true);
    });

    it("empty options object does not crash", () => {
        const origin = makeCard();
        expect(() => origin.clone({})).not.toThrow();
    });
});
