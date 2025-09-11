import {beforeEach, describe, expect, it} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../turboFunctions";

beforeEach(() => document.body.innerHTML = "");

describe("Style: closestRoot", () => {
    it("returns document.head when no shadow roots up the chain", () => {
        const el = div({parent: document.body});
        expect($(el).closestRoot).toBe(document.head);
    });

    it("returns host.shadowRoot when called on a host element with a shadow root", () => {
        const host = document.createElement("div");
        const shadow = host.attachShadow({mode: "open"});
        document.body.appendChild(host);

        expect($(host).closestRoot).toBe(shadow);
    });
});