import {describe, expect, it, vi} from "vitest";
import {TurboEventManager} from "../turboEventManager";
import {ClickMode} from "../turboEventManager.types";
import {$} from "../../../turboFunctions/turboFunctions";
import {TurboKeyEventName} from "../../../types/eventNaming.types";

describe("Key controller → TurboKeyEvent dispatch + mapping", () => {
    it("keydown → keyPressed; keyup → keyReleased; key mapping toggles ClickMode.key tool", () => {
        const mgr = new TurboEventManager();
        const keyCtl = (mgr as any).keyController;

        const pressed = vi.fn();
        const released = vi.fn();
        document.addEventListener(TurboKeyEventName.keyPressed, pressed as any);
        document.addEventListener(TurboKeyEventName.keyReleased, released as any);

        // map 'b' key to 'brush' tool
        const tool = document.createElement("div");
        $(tool).makeTool("brush", {key: "b", manager: mgr});

        // key down fires event and selects 'brush' in key mode (via dispatchController)
        keyCtl.keyDown(new KeyboardEvent("keydown", { key: "b", bubbles: true }));
        expect(pressed).toHaveBeenCalledTimes(1);
        expect(mgr.getCurrentToolName(ClickMode.key)).toBe("brush");

        // key up fires release event and clears key mode tool
        keyCtl.keyUp(new KeyboardEvent("keyup", { key: "b", bubbles: true }));
        expect(released).toHaveBeenCalledTimes(1);
        expect(mgr.getCurrentToolName(ClickMode.key)).toBeUndefined();
    });
});