import {describe, it, expect, vi} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";

describe("observe diagnostic 3", () => {
    it("plain HTMLElement with static observedAttributes", () => {
        const calls: string[] = [];
        
        class Y extends HTMLElement {
            static observedAttributes = ["my-val"];
            #v = 0;
            get myVal() { return this.#v; }
            set myVal(v: any) { this.#v = v; calls.push(`set:${v}`); }
            
            attributeChangedCallback(name: string, old: string, nv: string) {
                calls.push(`ACC:${name}=${nv}`);
                this["myVal"] = Number(nv);
            }
        }
        
        customElements.define("plain-y-test", Y);
        const el = new Y();
        document.body.appendChild(el);
        el.setAttribute("my-val", "42");
        
        console.log("calls:", calls);
        expect(calls).toContain("ACC:my-val=42");
    });
});
