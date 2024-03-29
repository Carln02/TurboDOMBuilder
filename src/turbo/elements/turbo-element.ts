import {TurboProperties} from "../definitions/turbo-types";
import {Turbo} from "../core/turbo";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @implements ITurbo
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
abstract class TurboElement extends Turbo(HTMLElement) {
    protected constructor(properties: TurboProperties = {}) {
        super(properties);
    }
}

export {TurboElement};