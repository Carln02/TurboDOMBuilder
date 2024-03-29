import {TurboCompatible, TurboProperties} from "../definitions/turbo-types";
import {ITurbo} from "../definitions/i-turbo";
import {
    setProperties,
    addChild,
    removeChild,
    addBefore,
    addClass,
    removeClass,
    toggleClass,
    addListener
} from "../core/base-functions";

interface TurboWrapper extends HTMLElement {
    [key: string]: any;
}

/**
 * @class TurboWrapper
 * @description A Turbo wrapper class, wrapping an HTML elements and providing all the Turbo functionalities.
 */
class TurboWrapper implements ITurbo {
    /**
     * @description The underlying HTML element.
     */
    public element: HTMLElement;

    /**
     * @description Whether or not this wrapper uses its proxy.
     */
    public useProxy: boolean = true;

    public readonly root: ShadowRoot | HTMLHeadElement = document.head;

    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties: HTMLElement | TurboProperties = {} as TurboProperties) {
        if (properties instanceof HTMLElement) {
            this.element = properties;
        } else {
            this.element = document.createElement(properties.tag || "div");
            if (properties.shadowDOM) this.root = this.element.attachShadow({mode: "open"});
            this.setProperties(properties);
        }
        return this.useProxy ? this.proxy() : this;
    }

    /**
     * @description Generates a proxy for this element. When trying to access a property that does not exist on the
     * TurboWrapper, the proxy will automatically try to access it on the underlying HTML element
     * @returns The proxy
     */
    public proxy(): this {
        return new Proxy(this, {
            get: (target: TurboWrapper, prop, receiver) => {
                //Check if the property exists directly on the TurboElement instance
                if (prop in target) {
                    const value = (target as any)[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }

                //If the property is not part of TurboElement, attempt to access it on the underlying HTMLElement
                const elementProp = (target.element as any)[prop];
                if (elementProp !== undefined) {
                    return typeof elementProp === "function" ? elementProp.bind(target.element) : elementProp;
                }

                //Default behavior
                return Reflect.get(target.element, prop, receiver);
            },
            set: (target, prop, value) => {
                //If trying to set a property that exists on the TurboElement, set it there
                if (prop in target) {
                    (target as any)[prop] = value;
                    return true;
                }

                //Otherwise, set the property on the underlying HTMLElement
                (target.element as any)[prop] = value;
                return true;
            }
        }) as this;
    }

    //Custom functions

    public setProperties(properties: TurboProperties) {
        setProperties(this, properties);
        return this.useProxy ? this.proxy() : this;
    }

    public addClass(classes: string | string[] | undefined): this {
        addClass(this.element, classes);
        return this.useProxy ? this.proxy() : this;
    }

    public removeClass(classes: string | string[] | undefined): this {
        removeClass(this.element, classes);
        return this.useProxy ? this.proxy() : this;
    }

    public toggleClass(classes: string | string[] | undefined, force?: boolean): this {
        toggleClass(this.element, classes, force);
        return this.useProxy ? this.proxy() : this;
    }

    public addChild(children: TurboCompatible | TurboCompatible[] | undefined): this {
        addChild(this.element, children);
        return this.useProxy ? this.proxy() : this;
    }

    public remChild(children: TurboCompatible | TurboCompatible[] | undefined): this {
        removeChild(this.element, children);
        return this.useProxy ? this.proxy() : this;
    }

    public addBefore(children: TurboCompatible | TurboCompatible[] | undefined, sibling: TurboCompatible): this {
        addBefore(this.element, children, sibling);
        return this.useProxy ? this.proxy() : this;
    }

    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): this {
        (this.element.style as any)[attribute] = value;
        return this.useProxy ? this.proxy() : this;
    }

    public setStyles(cssText: string): this {
        this.element.style.cssText += cssText;
        return this.useProxy ? this.proxy() : this;
    }

    //Method Chaining Declarations

    public addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                            options?: boolean | AddEventListenerOptions): this {
        addListener(this.element, type, listener, options);
        return this.useProxy ? this.proxy() : this;
    }

    public removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        EventListenerOptions): this {
        this.element.removeEventListener(type, listener, options);
        return this.useProxy ? this.proxy() : this;
    }

    public execute(callback: ((el: this) => void)): this {
        callback(this.proxy());
        return this.useProxy ? this.proxy() : this;
    }

    public setAttribute(name: string, value?: string | boolean): this {
        if (value == undefined) value = true;
        this.element.setAttribute(name, value.toString());
        return this.useProxy ? this.proxy() : this;
    }

    public removeAttribute(name: string): this {
        this.element.removeAttribute(name);
        return this.useProxy ? this.proxy() : this;
    }

    public blur(): this {
        this.element.blur();
        return this.useProxy ? this.proxy() : this;
    }

    public focus(): this {
        this.element.focus();
        return this.useProxy ? this.proxy() : this;
    }

    public remove(): this {
        this.element.remove();
        return this.useProxy ? this.proxy() : this;
    }
}

export {TurboWrapper};