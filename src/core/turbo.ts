import {TurboProperties} from "./definitions/turbo-types";
import {ITurbo} from "./definitions/i-turbo";
import {setProperties} from "../turbo-functions/element-manipulation/set-properties";
import {addClass} from "../turbo-functions/class-manipulation/add-class";
import {removeClass} from "../turbo-functions/class-manipulation/remove-class";
import {toggleClass} from "../turbo-functions/class-manipulation/toggle-class";
import {addChild} from "../turbo-functions/child-manipulation/add-child";
import {addChildBefore} from "../turbo-functions/child-manipulation/add-child-before";
import {removeChild} from "../turbo-functions/child-manipulation/remove-child";
import {addListener} from "../turbo-functions/listener-manipulation/add-listener";
import {removeAllChildren} from "../turbo-functions/child-manipulation/remove-all-children";

/**
 * @description Factory method that takes a class extending HTMLElement and returns a TurboBase class that extends the
 * provided HTML element with a few powerful tools and functions.
 */
function Turbo<T extends HTMLElement>(BaseElement: new (...args: any[]) => T) {
    //@ts-ignore
    return class TurboBase extends BaseElement implements ITurbo {
        public readonly root: ShadowRoot | HTMLHeadElement = document.head;

        constructor(...args: any[]) {
            super(...args);
            const properties: TurboProperties<T> = args[0] || {};
            if (properties.shadowDOM) this.root = this.attachShadow({mode: "open"});
            this.setProperties(properties);
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
            });Object.entries(value).forEach(([key, val]) => {
                if (val !== undefined) (this.config as any)[key] = val;
            });
        }

        //Custom functions

        public setProperties(properties: TurboProperties): this {
            setProperties(this, properties);
            return this;
        }

        public addClass(classes: string | string[] | undefined): this {
            addClass(this, classes);
            return this;
        }

        public removeClass(classes: string | string[] | undefined): this {
            removeClass(this, classes);
            return this;
        }

        public toggleClass(classes: string | string[] | undefined, force?: boolean): this {
            toggleClass(this, classes, force);
            return this;
        }

        public addChild(children: HTMLElement | HTMLElement[] | undefined): this {
            addChild(this, children)
            return this;
        }

        public remChild(children: HTMLElement | HTMLElement[] | undefined): this {
            removeChild(this, children);
            return this;
        }

        public addChildBefore(children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): this {
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
            (this.style as any)[attribute] = value;
            return this;
        }

        public setStyles(cssText: string): this {
            this.style.cssText += cssText;
            return this;
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
}

export {Turbo};