import {beforeAll, beforeEach} from "vitest";
import {turbofy} from "./turboFunctions/turboFunctions";

beforeAll(() => turbofy());
beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
});