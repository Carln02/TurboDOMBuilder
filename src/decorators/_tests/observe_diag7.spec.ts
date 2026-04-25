import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";

describe("observe diag7 - manual customElements.define", () => {
    it("manually define with Object.defineProperty getter on observedAttributes", () => {
        const accCalls: string[] = [];
        
        class X extends HTMLElement {
            @observe fooBar = 10;
            
            attributeChangedCallback(name: string, old: string, nv: string) {
                accCalls.push(`ACC:${name}:${old}->${nv}`);
            }
        }
        
        // Replicate what @define does
        Object.defineProperty(X, "observedAttributes", {
            configurable: true,
            enumerable: false,
            get: function() { return ["foo-bar"]; }
        });
        
        console.log("observedAttributes:", (X as any).observedAttributes);
        customElements.define("obs-manual-test", X);
        
        const el = new X();
        document.body.appendChild(el);
        accCalls.push("---after-connect---");
        
        (el as any).fooBar = 42;
        accCalls.push("---after-fooBar=42---");
        el.setAttribute("foo-bar", "67");
        accCalls.push("---done---");
        
        console.log("ACC calls:", accCalls);
        console.log("fooBar:", (el as any).fooBar);
    });
});
