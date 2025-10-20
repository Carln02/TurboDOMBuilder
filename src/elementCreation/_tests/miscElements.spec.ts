import {describe, it, expect} from "vitest";
import {stylesheet} from "../miscElements";

describe("misc elements", () => {
    it("adds a <style> to document.head by default", () => {
        const css = ".foo{color:red;}";
        const before = document.head.querySelectorAll("style").length;

        stylesheet(css);

        const after = document.head.querySelectorAll("style").length;
        expect(after).toBe(before + 1);

        const lastStyle = document.head.querySelector("style:last-of-type") as HTMLStyleElement;
        expect(lastStyle).toBeInstanceOf(HTMLStyleElement);
        // jsdom keeps innerHTML/textContent of <style>
        expect(lastStyle.textContent).toContain(css);
    });

    it("adds a <style> to a provided ShadowRoot", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const root = host.attachShadow({mode: "open"});

        const css = ":host{display:block}";
        expect(root.querySelector("style")).toBeNull();

        stylesheet(css, root);

        const s = root.querySelector("style") as HTMLStyleElement;
        expect(s).not.toBeNull();
        expect(s.textContent).toContain(css);
    });

    it("does nothing when styles is falsy", () => {
        const before = document.head.querySelectorAll("style").length;
        stylesheet(undefined);
        stylesheet("");
        const after = document.head.querySelectorAll("style").length;
        expect(after).toBe(before);
    });

    it("can be called multiple times (appends multiple style elements)", () => {
        const before = document.head.querySelectorAll("style").length;

        stylesheet(".a{margin:0}");
        stylesheet(".b{padding:0}");

        const styles = document.head.querySelectorAll("style");
        expect(styles.length).toBe(before + 2);
        expect(styles[styles.length - 2].textContent).toContain(".a{margin:0}");
        expect(styles[styles.length - 1].textContent).toContain(".b{padding:0}");
    });
});