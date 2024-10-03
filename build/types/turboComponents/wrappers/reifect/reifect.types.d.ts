import { PartialRecord } from "../../../domBuilding/core.types";
import { StylesType } from "../../../domBuilding/turbofication/styleManipulation/styleManipulation.types";
import { ReifectInterpolator } from "../statefulReifect/statefulReifect.types";
/**
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type StatelessPropertyConfig<Type, ClassType extends object = Element> = Type | ReifectInterpolator<Type, ClassType>;
type StatelessReifectCoreProperties<ClassType extends object = Element> = {
    properties?: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    styles?: StatelessPropertyConfig<StylesType, ClassType>;
    classes?: StatelessPropertyConfig<string | string[], ClassType>;
    replaceWith?: StatelessPropertyConfig<ClassType, ClassType>;
    transitionProperties?: StatelessPropertyConfig<string | string[], ClassType>;
    transitionDuration?: StatelessPropertyConfig<number, ClassType>;
    transitionTimingFunction?: StatelessPropertyConfig<string, ClassType>;
    transitionDelay?: StatelessPropertyConfig<number, ClassType>;
};
type StatelessReifectProperties<ClassType extends object = Element> = StatelessReifectCoreProperties<ClassType> & {
    attachedObjects?: ClassType[];
};
export { StatelessReifectCoreProperties, StatelessReifectProperties, StatelessPropertyConfig };
