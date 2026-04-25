import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";
import {TurboElement} from "../../turboElement/turboElement";

describe("observe diagnostic 2", () => {
    it("checks observedAttributes and callback", () => {
        @define("obs-diag2")
        class X extends TurboElement {
            @observe fooBar = 10;
        }
        
        console.log("observedAttributes:", (X as any).observedAttributes);
        console.log("has attributeChangedCallback:", "attributeChangedCallback" in X.prototype);
        
        const el = new X();
        document.body.appendChild(el);
        
        // Manually call attributeChangedCallback to see if it updates fooBar
        (el as any).attributeChangedCallback("foo-bar", "10", "67");
        console.log("fooBar after manual ACC:", (el as any).fooBar);
        
        // Reset
        (el as any).fooBar = 10;
        
        // Now setAttribute
        el.setAttribute("foo-bar", "67");
        console.log("fooBar after setAttribute:", (el as any).fooBar);
        
        expect(true).toBe(true);
    });
});
