import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";

describe("observe diag5 - without TurboElement", () => {
    it("observe on plain HTMLElement", () => {
        @define("obs-plain")
        class X extends HTMLElement {
            @observe fooBar = 10;
        }
        
        console.log("observedAttributes:", (X as any).observedAttributes);
        
        const el = new X();
        document.body.appendChild(el);
        
        console.log("backing after init:", (el as any)[Object.getOwnPropertySymbols(el).find(s => s.toString().includes("observed_fooBar"))]);
        console.log("fooBar:", (el as any).fooBar);
        console.log("attr foo-bar:", el.getAttribute("foo-bar"));
        
        (el as any).fooBar = 42;
        console.log("after fooBar=42, attr:", el.getAttribute("foo-bar"));
        
        el.setAttribute("foo-bar", "67");
        console.log("after setAttribute 67, fooBar:", (el as any).fooBar);
        
        expect(true).toBe(true);
    });
});
