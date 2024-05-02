import {TurboCompatible, TurboProperties} from "./definitions/turbo-types";
import {ITurbo} from "./definitions/i-turbo";
import {removeChild} from "../turbo-functions/child-manipulation/remove-child";
import {setProperties} from "../turbo-functions/element-manipulation/set-properties";
import {addClass} from "../turbo-functions/class-manipulation/add-class";
import {removeClass} from "../turbo-functions/class-manipulation/remove-class";
import {toggleClass} from "../turbo-functions/class-manipulation/toggle-class";
import {addChild} from "../turbo-functions/child-manipulation/add-child";
import {addChildBefore} from "../turbo-functions/child-manipulation/add-child-before";
import {removeAllChildren} from "../turbo-functions/child-manipulation/remove-all-children";
import {addListener} from "../turbo-functions/listener-manipulation/add-listener";
import {StylesRecord} from "../utils/styles/styles-record";
import {getClosestRoot} from "../turbo-functions/element-manipulation/get-closest-root";
import {kebabToCamelCase} from "../utils/string-manipulation/kebab-to-camel-case";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @implements ITurbo
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
class TurboElement extends HTMLElement implements ITurbo {
    /**
     * @description The stylesheet associated to this class. It will automatically be added once to the document
     * (or once to the closest shadow root).
     */
    public static readonly stylesheet: string = "";

    private static stylesRecord: StylesRecord = new StylesRecord();

    private pendingStyles: Record<keyof CSSStyleDeclaration, string> | {} = {};

    constructor(properties: TurboProperties = {}) {
        super();
        if (properties.shadowDOM) this.attachShadow({mode: "open"});
        TurboElement.stylesRecord.addStylesheet((this.constructor as any).stylesheet, this.className, getClosestRoot(this));
        this.setProperties(properties, true);
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (newValue == null || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = newValue;
    }

    //Config

    /**
     * @description Static configuration object.
     */
    static readonly config: any = {};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    //Custom functions

    public setProperties(properties: TurboProperties, setOnlyBaseProperties: boolean = false): this {
        setProperties(this, properties, setOnlyBaseProperties);
        return this;
    }

    public addClass(classes?: string | string[]): this {
        addClass(this, classes);
        return this;
    }

    public removeClass(classes?: string | string[]): this {
        removeClass(this, classes);
        return this;
    }

    public toggleClass(classes?: string | string[], force?: boolean): this {
        toggleClass(this, classes, force);
        return this;
    }

    public addChild(children?: TurboCompatible | TurboCompatible[]): this {
        addChild(this, children);
        return this;
    }

    public remChild(children?: TurboCompatible | TurboCompatible[]): this {
        removeChild(this, children);
        return this;
    }

    public addChildBefore(children?: TurboCompatible | TurboCompatible[], sibling?: TurboCompatible): this {
        addChildBefore(this, children, sibling);
        return this;
    }

    public removeAllChildren(): this {
        removeAllChildren(this);
        return this;
    }

    public addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                       options?: boolean | AddEventListenerOptions): this {
        addListener(this, type, listener, options);
        return this;
    }

    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): this {
        this.pendingStyles[attribute] = value;
        this.applyStyles();
        return this;
    }

    public setStyles(cssText: string): this {
        this.pendingStyles["cssText"] = cssText;
        this.applyStyles();
        return this;
    }

    private applyStyles() {
        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText") this.style.cssText += ";" + this.pendingStyles["cssText"];
                else (this.style as any)[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    }

    //Method Chaining Declarations

    public execute(callback: ((el: this) => void)): this {
        callback(this);
        return this;
    }

    public removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        EventListenerOptions): this {
        this.removeEventListener(type, listener, options);
        return this;
    }

    public setAttribute(name: string, value?: string | boolean): this {
        super.setAttribute(name, value?.toString() || "true");
        return this;
    }

    public removeAttribute(name: string): this {
        super.removeAttribute(name);
        return this;
    }

    public blur(): this {
        super.blur();
        return this;
    }

    public focus(): this {
        super.focus();
        return this;
    }

    public remove(): this {
        super.remove();
        return this;
    }

    //Other

    public show(b: boolean): this {
        this.setStyle("display", b ? "" : "none");
        return this;
    }
}

export {TurboElement};