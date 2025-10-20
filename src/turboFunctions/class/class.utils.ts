import {TurboSelector} from "../turboSelector";

export class ClassFunctionsUtils {
    /**
     * @description Utility function to operate on the provided classes
     * @param selector
     * @param classes
     * @param callback
     */
    public operateOnClasses(selector: TurboSelector, classes?: string | string[],
                              callback: (classEntry: string) => void = (() => {})): TurboSelector {
        if (!selector || !classes || !selector.element) return selector;

        try {
            // If string provided --> split by spaces
            if (typeof classes === "string") classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0)
                .forEach(entry => callback(entry));
        } catch (e) {
            console.error(e);
        }

        return selector;
    }
}