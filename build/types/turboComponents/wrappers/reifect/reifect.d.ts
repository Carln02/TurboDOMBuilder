import { StatefulReifect } from "../statefulReifect/statefulReifect";
import { StatelessPropertyConfig, StatelessReifectProperties } from "./reifect.types";
import { ReifectAppliedOptions } from "../statefulReifect/statefulReifect.types";
import { PartialRecord } from "../../../domBuilding/core.types";
import { StylesType } from "../../../domBuilding/turbofication/styleManipulation/styleManipulation.types";
/**
 * @class Reifect
 * @description A class to manage and apply dynamic properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
declare class Reifect<ClassType extends object = Node> extends StatefulReifect<"", ClassType> {
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatelessReifectProperties<ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatelessReifectProperties<ClassType>);
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
    get properties(): StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    set properties(value: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>);
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
    get styles(): StatelessPropertyConfig<StylesType, ClassType>;
    set styles(value: StatelessPropertyConfig<StylesType, ClassType>);
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
    get classes(): StatelessPropertyConfig<string | string[], ClassType>;
    set classes(value: StatelessPropertyConfig<string | string[], ClassType>);
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
    get replaceWith(): StatelessPropertyConfig<ClassType, ClassType>;
    set replaceWith(value: StatelessPropertyConfig<ClassType, ClassType>);
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
    get transitionProperties(): StatelessPropertyConfig<string | string[], ClassType>;
    set transitionProperties(value: StatelessPropertyConfig<string | string[], ClassType>);
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
    get transitionDuration(): StatelessPropertyConfig<number, ClassType>;
    set transitionDuration(value: StatelessPropertyConfig<number, ClassType>);
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
    get transitionTimingFunction(): StatelessPropertyConfig<string, ClassType>;
    set transitionTimingFunction(value: StatelessPropertyConfig<string, ClassType>);
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
    get transitionDelay(): StatelessPropertyConfig<number, ClassType>;
    set transitionDelay(value: StatelessPropertyConfig<number, ClassType>);
    initialize(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<"", ClassType>): void;
    apply(objects?: ClassType[] | ClassType, options?: ReifectAppliedOptions<"", ClassType>): void;
}
declare function reifect<ClassType extends object = Node>(properties: StatelessReifectProperties<ClassType>): Reifect<ClassType>;
export { Reifect, reifect };
