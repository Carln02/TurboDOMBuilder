import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";
import {TurboElement} from "../../turboElement/turboElement";

describe("observe diagnostic", () => {
    it("traces attribute callback", () => {
        const calls: string[] = [];
        
        @define("obs-diag")
        class X extends TurboElement {
            @observe fooBar = 10;
            
            attributeChangedCallback(name: string, old: string, nv: string) {
                calls.push(`ACC:${name}=${nv}(from ${old})`);
            }
        }

        const el = new X();
        document.body.appendChild(el);
        
        calls.push(`after-connect:fooBar=${(el as any).fooBar}`);
        (el as any).fooBar = 42;
        calls.push(`after-set42:fooBar=${(el as any).fooBar}`);
        el.setAttribute("foo-bar", "67");
        calls.push(`after-setAttr67:fooBar=${(el as any).fooBar}`);
        
        console.log("Calls:", JSON.stringify(calls, null, 2));
        expect(calls).toBeDefined();
    });
});
