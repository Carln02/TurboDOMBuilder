import {describe, it, expect} from "vitest";

describe("observe diagnostic 4 - dynamic getter observedAttributes", () => {
    it("dynamic getter for observedAttributes", () => {
        const calls: string[] = [];
        const attrs = new Set(["my-val"]);
        
        class Z extends HTMLElement {
            static get observedAttributes() { return Array.from(attrs); }
            
            attributeChangedCallback(name: string, old: string, nv: string) {
                calls.push(`ACC:${name}=${nv}`);
            }
        }
        
        customElements.define("dynamic-z-test", Z);
        const el = new Z();
        document.body.appendChild(el);
        el.setAttribute("my-val", "42");
        
        console.log("calls:", calls);
        expect(calls).toContain("ACC:my-val=42");
    });
    
    it("defineProperty getter for observedAttributes", () => {
        const calls: string[] = [];
        
        class W extends HTMLElement {
            attributeChangedCallback(name: string, old: string, nv: string) {
                calls.push(`ACC:${name}=${nv}`);
            }
        }
        Object.defineProperty(W, "observedAttributes", {
            configurable: true,
            get: function() { return ["my-val2"]; }
        });
        
        customElements.define("defined-w-test", W);
        const el = new W();
        document.body.appendChild(el);
        el.setAttribute("my-val2", "99");
        
        console.log("calls:", calls);
        expect(calls).toContain("ACC:my-val2=99");
    });
});
