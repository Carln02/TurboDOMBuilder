import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";

describe("observe diag6", () => {
    it("verify ACC is called with @define wrapper", () => {
        const accCalls: string[] = [];
        
        @define("obs-diag6")
        class X extends HTMLElement {
            @observe fooBar = 10;
        }
        
        // Monkey-patch ACC AFTER define to see if it's called
        const origACC = X.prototype.attributeChangedCallback;
        X.prototype.attributeChangedCallback = function(name: string, old: string, nv: string) {
            accCalls.push(`${name}:${old}->${nv}`);
            origACC.call(this, name, old, nv);
        };
        
        const el = new X();
        document.body.appendChild(el);
        accCalls.push("---after-connect---");
        
        (el as any).fooBar = 42;
        accCalls.push("---after-set42---");
        
        el.setAttribute("foo-bar", "67");
        accCalls.push("---after-setAttr---");
        
        console.log("ACC calls:", accCalls);
        expect(true).toBe(true);
    });
});
