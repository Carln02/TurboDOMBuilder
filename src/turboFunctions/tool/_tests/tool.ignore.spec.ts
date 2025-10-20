import {describe, it, expect} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../turboFunctions";

describe("TurboSelector.ignoreTool / isToolIgnored", () => {
    it("ignores an entire tool for an element (all event types)", () => {
        const sel = $(div());

        // Initially not ignored
        expect(sel.isToolIgnored("drag")).toBe(false);

        // Ignore all events for 'drag'
        sel.ignoreTool("drag");

        // Should be ignored for unspecified type
        expect(sel.isToolIgnored("drag")).toBe(true);

        // And also for specific types
        expect(sel.isToolIgnored("drag", "start")).toBe(true);
        expect(sel.isToolIgnored("drag", "move")).toBe(true);

        // Unignore all (ignore=false)
        sel.ignoreTool("drag", undefined, false);
        expect(sel.isToolIgnored("drag")).toBe(false);
        expect(sel.isToolIgnored("drag", "move")).toBe(false);
    });

    it("ignores only a specific event type for a tool", () => {
        const sel = $(div());

        // Ignore only 'move' for 'drag'
        sel.ignoreTool("drag", "move", true);

        expect(sel.isToolIgnored("drag", "move")).toBe(true);
        expect(sel.isToolIgnored("drag", "start")).toBe(false);
        expect(sel.isToolIgnored("drag", "end")).toBe(false);

        // Toggle back just that type
        sel.ignoreTool("drag", "move", false);
        expect(sel.isToolIgnored("drag", "move")).toBe(false);
    });

    it("multiple tools: independent ignore scopes", () => {
        const sel = $(div());

        sel.ignoreTool("drag", "move", true);
        sel.ignoreTool("hover", undefined, true);

        // drag: only move is ignored
        expect(sel.isToolIgnored("drag", "move")).toBe(true);
        expect(sel.isToolIgnored("drag", "start")).toBe(false);

        // hover: entire tool is ignored
        expect(sel.isToolIgnored("hover")).toBe(true);
        expect(sel.isToolIgnored("hover", "enter")).toBe(true);

        // Unignore hover entirely
        sel.ignoreTool("hover", undefined, false);
        expect(sel.isToolIgnored("hover")).toBe(false);
    });

    it("calling isToolIgnored without type respects 'entire tool' ignores", () => {
        const sel = $(div());
        sel.ignoreTool("scale"); // all events ignored
        expect(sel.isToolIgnored("scale")).toBe(true);
        // Specific type should also be ignored
        expect(sel.isToolIgnored("scale", "pinch")).toBe(true);
    });

    it("calling ignoreTool repeatedly for different types accumulates", () => {
        const sel = $(div());
        sel.ignoreTool("drag", "start", true);
        sel.ignoreTool("drag", "move", true);

        expect(sel.isToolIgnored("drag", "start")).toBe(true);
        expect(sel.isToolIgnored("drag", "move")).toBe(true);
        expect(sel.isToolIgnored("drag", "end")).toBe(false);

        // Unignore one type keeps the other
        sel.ignoreTool("drag", "start", false);
        expect(sel.isToolIgnored("drag", "start")).toBe(false);
        expect(sel.isToolIgnored("drag", "move")).toBe(true);
    });
});
