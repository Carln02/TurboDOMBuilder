import {Turbo, TurbofyOptions} from "./turboFunctions.types";
import {setupHierarchyFunctions} from "./hierarchy/hierarchy";
import {setupMiscFunctions} from "./misc/misc";
import {setupClassFunctions} from "./class/class";
import {setupElementFunctions} from "./element/element";
import {setupEventFunctions} from "./event/event";
import {setupStyleFunctions} from "./style/style";
import {setupToolFunctions} from "./tool/tool";
import {setupSubstrateFunctions} from "./substrate/substrate";
import {TurboSelector} from "./turboSelector";
import {callOnce} from "../decorators/callOnce";
import {setupReifectFunctions} from "./reifect/reifect";
import {ValidElement, ValidTag} from "../core.types";
import {element} from "../elementCreation/element";

/**
 * @overload
 * @function turbo
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `tu()`,
 * `t()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
function turbo<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;

/**
 * @overload
 * @function turbo
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `tu()`, `t()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
function turbo<Type extends object = Node>(object: Type): Turbo<Type>;

/**
 * @overload
 * @function turbo
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `tu()`, `t()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
function turbo(tag?: string): Turbo<Element>;
function turbo(tagOrElement?: object | string): Turbo {
    turbofy();
    let el: object;

    if (!tagOrElement) tagOrElement = "div" as any;
    if (typeof tagOrElement === "string") el = element({tag: tagOrElement});
    else if (typeof tagOrElement === "object") {
        if (tagOrElement instanceof TurboSelector) return tagOrElement;
        if (tagOrElement instanceof Node) el = tagOrElement;
        else if (tagOrElement["element"] && typeof tagOrElement["element"] === "object") el = tagOrElement["element"];
        else el = tagOrElement;
    }

    const turboSelector = new TurboSelector<object>();
    turboSelector.element = el;
    return turboSelector as Turbo;
}

/**
 * @overload
 * @function tu
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `turbo()`,
 * `t()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
function tu<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;

/**
 * @overload
 * @function tu
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `t()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
function tu<Type extends object = Node>(object: Type): Turbo<Type>;

/**
 * @overload
 * @function tu
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `t()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
function tu(tag: string): Turbo<Element>;
function tu(tagOrElement?: object | string): Turbo {
    return turbo(tagOrElement as any);
}

/**
 * @overload
 * @function t
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use `turbo()`,
 * `tu()`, or `$()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
function t<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;

/**
 * @overload
 * @function t
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `tu()`, or `$()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
function t<Type extends object = Node>(object: Type): Turbo<Type>;

/**
 * @overload
 * @function t
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `tu()`, or `$()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
function t(tag: string): Turbo<Element>;
function t(tagOrElement?: object | string): Turbo {
    return turbo(tagOrElement as any);
}

/**
 * @overload
 * @function $
 * @template {ValidTag} Tag
 * @description All-in-one selector function that instantiates an element with the given tag and returns it wrapped
 * in a proxied selector that augments it with useful functions for manipulating it.You can alternatively use `turbo()`,
 * `tu()`, or `t()` for the same behavior.
 * @param {Tag} [tag="div"] - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<ValidElement<Tag>>} - The instantiated, wrapped, and proxied element.
 */
function $<Tag extends ValidTag = "div">(tag?: Tag): Turbo<ValidElement<Tag>>;

/**
 * @overload
 * @function $
 * @template {object} Type
 * @description All-in-one selector function that wraps the given object in a proxied selector that augments it
 * with useful functions for manipulating it. You can alternatively use `turbo()`, `tu()`, or `t()` for the same behavior.
 * @param {Type} object - The object to wrap.
 * @return {Turbo<Type>} - The wrapped, proxied object.
 */
function $<Type extends object = Node>(object: Type): Turbo<Type>;

/**
 * @overload
 * @function $
 * @description All-in-one selector function that instantiates an element with the given tag (if valid) and returns it
 * wrapped in a proxied selector that augments it with useful functions for manipulating it. You can alternatively use
 * `turbo()`, `tu()`, or `t()` for the same behavior.
 * @param {string} tag - The HTML tag of the element to instantiate. If not defined, the tag will be set to "div".
 * @return {Turbo<Element>} - The instantiated, wrapped, and proxied element.
 */
function $(tag: string): Turbo<Element>;
function $(tagOrElement?: object | string): Turbo {
    return turbo(tagOrElement as any);
}

const turbofy = callOnce(function (options: TurbofyOptions = {}) {
    if (!options.excludeHierarchyFunctions) setupHierarchyFunctions();
    if (!options.excludeMiscFunctions) setupMiscFunctions();
    if (!options.excludeClassFunctions) setupClassFunctions();
    if (!options.excludeElementFunctions) setupElementFunctions();
    if (!options.excludeEventFunctions) setupEventFunctions();
    if (!options.excludeStyleFunctions) setupStyleFunctions();
    if (!options.excludeToolFunctions) setupToolFunctions();
    if (!options.excludeSubstrateFunctions) setupSubstrateFunctions();
    if (!options.excludeReifectFunctions) setupReifectFunctions();
});

export {$, t, tu, turbo, turbofy};