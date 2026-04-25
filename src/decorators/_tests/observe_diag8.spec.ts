import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {camelToKebabCase, kebabToCamelCase, parse, stringify} from "../../utils/dataManipulation/string";

describe("observe diag8 - reproducing what @define does", () => {
    it("replicates @define step by step", () => {
        const accCalls: string[] = [];
        
        class X extends HTMLElement {
            @observe fooBar = 10;
        }
        
        // Step 1: set observedAttributes getter
        Object.defineProperty(X, "observedAttributes", {
            configurable: true,
            enumerable: false,
            get: function(this: any) {
                let ctor: any = this;
                const combined = new Set<string>();
                while (ctor && ctor !== Function.prototype) {
                    const set = ctor[Symbol.metadata]?.observedAttributes as Set<string>;
                    if (set) for (const e of set) combined.add(e);
                    ctor = Object.getPrototypeOf(ctor);
                }
                return Array.from(combined);
            }
        });
        
        // Step 2: install attributeChangedCallback wrapper
        const accWrapper = function(this: any, name: string, old: string, nv: string) {
            accCalls.push(`ACC-wrapper:${name}:${old}->${nv}`);
            if (nv === old) return;
            const property = kebabToCamelCase(name);
            if (!(property in this)) return;
            this[property] = nv === null ? undefined : parse(nv);
        };
        Object.defineProperty(X.prototype, "attributeChangedCallback", {
            configurable: true, value: accWrapper
        });
        
        // Step 3: install connectedCallback
        const ccWrapper = function(this: any) {
            accCalls.push("connectedCallback");
            for (const attr of (this.constructor as any).observedAttributes ?? []) {
                const val = this[kebabToCamelCase(attr)];
                if (val === undefined) continue;
                const sv = stringify(val);
                if (this.getAttribute(attr) !== sv) this.setAttribute(attr, sv);
            }
        };
        Object.defineProperty(X.prototype, "connectedCallback", {
            configurable: true, value: ccWrapper
        });
        
        // Step 4: customElements.define
        customElements.define("obs-diag8-step", X);
        console.log("observedAttributes at define:", (X as any).observedAttributes);
        
        const el = new X();
        document.body.appendChild(el);
        accCalls.push("---after-connect---");
        
        (el as any).fooBar = 42;
        accCalls.push(`---after-set42: fooBar=${(el as any).fooBar}---`);
        
        el.setAttribute("foo-bar", "67");
        accCalls.push(`---done: fooBar=${(el as any).fooBar}---`);
        
        console.log("calls:", accCalls);
    });
});
