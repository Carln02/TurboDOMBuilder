//@ts-nocheck
import {StatefulReifect} from "../statefulReifect/statefulReifect";
import {StatelessPropertyConfig, StatelessReifectProperties} from "./reifect.types";
import {ReifectAppliedOptions} from "../statefulReifect/statefulReifect.types";
import {StylesType} from "../../../turboFunctions/style/style.types";
import {PartialRecord} from "../../../types/basic.types";

/**
 * @class Reifect
 * @group Components
 * @category Reifect
 *
 * @description A class to manage and apply dynamic properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
class Reifect<ClassType extends object = Node> extends StatefulReifect<"default", ClassType> {
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatelessReifectProperties<ClassType>} properties - The configuration properties.
     */
    public constructor(properties: StatelessReifectProperties<ClassType>) {
        properties.states = ["default"];
        super(properties);
    }

    /**
     * @description The properties to be assigned to the objects. It could take:
     * - A record of `{key: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get properties(): StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType> {
        return super.properties?.["default"];
    }

    public set properties(value: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>) {
        super.properties = value;
    }

    /**
     * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
     * - A record of `{CSS property: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get styles(): StatelessPropertyConfig<StylesType, ClassType> {
        return super.styles?.["default"];
    }

    public set styles(value: StatelessPropertyConfig<StylesType, ClassType>) {
        super.styles = value;
    }

    /**
     * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
     * - A string of space-separated classes.
     * - An array of classes.
     * - An interpolation function that would return a string of space-separated classes or an array of classes.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get classes(): StatelessPropertyConfig<string | string[], ClassType> {
        return super.classes?.["default"];
    }

    public set classes(value: StatelessPropertyConfig<string | string[], ClassType>) {
        super.classes = value;
    }

    /**
     * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
     * - The object to be replaced with.
     * - An interpolation function that would return the object to be replaced with.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get replaceWith(): StatelessPropertyConfig<ClassType, ClassType> {
        return super.replaceWith?.["default"];
    }

    public set replaceWith(value: StatelessPropertyConfig<ClassType, ClassType>) {
        super.replaceWith = value;
    }

    /**
     * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
     * could take:
     * - A string of space-separated CSS properties.
     * - An array of CSS properties.
     * - An interpolation function that would return a string of space-separated CSS properties or an array of
     * CSS properties.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionProperties(): StatelessPropertyConfig<string | string[], ClassType> {
        return super.transitionProperties?.["default"];
    }

    public set transitionProperties(value: StatelessPropertyConfig<string | string[], ClassType>) {
        super.transitionProperties = value;
    }

    /**
     * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a duration (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionDuration(): StatelessPropertyConfig<number, ClassType> {
        return super.transitionDuration?.["default"];
    }

    public set transitionDuration(value: StatelessPropertyConfig<number, ClassType>) {
        super.transitionDuration = value;
    }

    /**
     * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
     * It could take:
     * - A string representing the timing function to apply.
     * - An interpolation function that would return a timing function (string).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionTimingFunction(): StatelessPropertyConfig<string, ClassType> {
        return super.transitionTimingFunction?.["default"];
    }

    public set transitionTimingFunction(value: StatelessPropertyConfig<string, ClassType>) {
        super.transitionTimingFunction = value;
    }

    /**
     * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a delay (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    public get transitionDelay(): StatelessPropertyConfig<number, ClassType> {
        return super.transitionDelay?.["default"];
    }

    public set transitionDelay(value: StatelessPropertyConfig<number, ClassType>) {
        super.transitionDelay = value;
    }

    public initialize(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<"default", ClassType>) {
        super.initialize("default", objects, options);
    }

    public apply(objects?: ClassType[] | ClassType, options?: ReifectAppliedOptions<"default", ClassType>) {
        super.apply("default", objects, options);
    }
}

/**
 * @group Components
 * @category Reifect
 */
function reifect<ClassType extends object = Node>(properties: StatelessReifectProperties<ClassType>): Reifect<ClassType> {
    return new Reifect<ClassType>(properties);
}

export {Reifect, reifect};