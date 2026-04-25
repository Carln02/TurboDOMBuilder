import {describe, it, expect} from "vitest";

declare global { interface SymbolConstructor {metadata: symbol} }
if (!("metadata" in Symbol)) {
    Object.defineProperty(Symbol, "metadata", {
        value: (Symbol as any).for("Symbol.metadata"),
        writable: false, enumerable: false, configurable: true,
    });
}

describe("metadata timing", () => {
    it("checks when Symbol.metadata is populated", () => {
        let metaInsideClassDecorator: any;
        let metaObjInsideFieldDecorator: any;
        
        function fieldDec(value: any, ctx: any) {
            metaObjInsideFieldDecorator = ctx.metadata;
            ctx.metadata.myAttr = "hello";
            ctx.addInitializer(function() {});
        }
        
        function classDec(cls: any, ctx: any) {
            metaInsideClassDecorator = {
                ctxMeta: ctx.metadata,
                clsSymMeta: cls[Symbol.metadata]
            };
            return cls;
        }
        
        @(classDec as any)
        class X extends HTMLElement {
            @(fieldDec as any) declare foo: string;
        }
        
        console.log("metaObjInsideFieldDecorator:", metaObjInsideFieldDecorator);
        console.log("metaInsideClassDecorator.ctxMeta:", metaInsideClassDecorator?.ctxMeta);
        console.log("metaInsideClassDecorator.clsSymMeta:", metaInsideClassDecorator?.clsSymMeta);
        console.log("X[Symbol.metadata]:", (X as any)[Symbol.metadata]);
        console.log("Same object?", metaObjInsideFieldDecorator === (X as any)[Symbol.metadata]);
        console.log("clsMeta === X[Symbol.metadata]?", metaInsideClassDecorator?.clsSymMeta === (X as any)[Symbol.metadata]);
        
        expect(true).toBe(true);
    });
});
