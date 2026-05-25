/**
 * @internal
 */
interface TurboElementUiInterface {
    /**
     * @description Whether to set the default CSS classes defined in the static config on the element or not. Setting
     * it will accordingly add/remove the CSS classes from the element.
     */
    unsetDefaultClasses: boolean;

    shadowDOM: boolean;

    defaultClasses: string | string[];
}

export {TurboElementUiInterface};