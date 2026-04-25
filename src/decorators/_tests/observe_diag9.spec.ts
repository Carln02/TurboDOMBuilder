import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";

describe("observe diag9 - check @define side effects", () => {
    it("check define side effects on observedAttributes during customElements.define", () => {
        const defineTime: any[] = [];
        
        // Intercept customElements.define to check observedAttributes at that moment
        const origDefine = customElements.define.bind(customElements);
        customElements.define = function(name: string, ctor: any, ...rest: any[]) {
            defineTime.push({ name, observedAttributes: ctor.observedAttributes });
            return origDefine(name, ctor, ...rest);
        } as any;
        
        @define("obs-diag9")
        class X extends HTMLElement {
            @observe fooBar = 10;
        }
        
        customElements.define = origDefine; // restore
        
        console.log("observedAttributes at customElements.define time:", defineTime);
        console.log("X.observedAttributes after:", (X as any).observedAttributes);
        console.log("ACC on prototype:", typeof X.prototype.attributeChangedCallback);
        
        const el = new X();
        document.body.appendChild(el);
        
        const before = (el as any).fooBar;
        el.setAttribute("foo-bar", "67");
        const after = (el as any).fooBar;
        
        console.log(`fooBar before: ${before}, after setAttribute: ${after}`);
        
        expect(true).toBe(true);
    });
});
