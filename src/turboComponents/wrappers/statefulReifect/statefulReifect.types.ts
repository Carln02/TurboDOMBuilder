import {StylesType} from "../../../turboFunctions/style/style.types";
import {PartialRecord} from "../../../types/basic.types";

/**
 * @group Components
 * @category StatefulReifect
 * @description A function type that interpolates a value based on the index, total count, and the object.
 *
 * @template Type
 * @template ClassType
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type ReifectInterpolator<Type, ClassType extends object = Element> =
    ((index: number, total: number, object: ClassType) => Type);

/**
 * @group Components
 * @category StatefulReifect
 * @description A function type that interpolates a value based on the state, index, total count, and the object.
 *
 * @template Type
 * @template State
 * @template ClassType
 * @param {State} state - The current state.
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type StateInterpolator<Type, State extends string | number | symbol, ClassType extends object = Element> =
    ((state: State, index: number, total: number, object: ClassType) => Type);

/**
 * @group Components
 * @category StatefulReifect
 * @description A type that represents a property specific to a state or an interpolated value.
 *
 * @template Type
 * @template ClassType
 */
type StateSpecificProperty<Type, ClassType extends object = Element> =
    Type | ReifectInterpolator<Type, ClassType>;

/**
 * @group Components
 * @category StatefulReifect
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type BasicPropertyConfig<Type, State extends string | number | symbol> = PartialRecord<State, Type> | Type;

/**
 * @group Components
 * @category StatefulReifect
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type PropertyConfig<Type, State extends string | number | symbol, ClassType extends object = Element> =
    | PartialRecord<State, Type | ReifectInterpolator<Type, ClassType>>
    | Type
    | StateInterpolator<Type, State, ClassType>;

/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectObjectData<State extends string | number | symbol, ClassType extends object = Element> = {
    object: WeakRef<ClassType>,
    enabled: ReifectEnabledObject,
    lastState?: State,
    resolvedValues?: ReifectObjectComputedProperties<State, ClassType>,
    objectIndex?: number,
    totalObjectCount?: number,
    onSwitch?: (state: State, index: number, total: number, object: ClassType) => void,
}

/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectObjectComputedProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties: PartialRecord<State, PartialRecord<keyof ClassType, any>>,
    styles: PartialRecord<State, StylesType>,
    classes:PartialRecord<State, string | string[]>,
    replaceWith: PartialRecord<State, ClassType>,

    transitionProperties: PartialRecord<State, string[]>,
    transitionDuration: PartialRecord<State, number>,
    transitionTimingFunction: PartialRecord<State, string>,
    transitionDelay: PartialRecord<State, number>,
};

/**
 * @group Components
 * @category StatefulReifect
 */
type StatefulReifectCoreProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties?: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>,
    styles?: PropertyConfig<StylesType, State, ClassType>,
    classes?: PropertyConfig<string | string[], State, ClassType>,
    replaceWith?: PropertyConfig<ClassType, State, ClassType>,

    transitionProperties?: PropertyConfig<string | string[], State, ClassType>,
    transitionDuration?: PropertyConfig<number, State, ClassType>,
    transitionTimingFunction?: PropertyConfig<string, State, ClassType>,
    transitionDelay?: PropertyConfig<number, State, ClassType>,
};

/**
 * @group Components
 * @category StatefulReifect
 */
type StatefulReifectProperties<State extends string | number | symbol, ClassType extends object = Element> =
    StatefulReifectCoreProperties<State, ClassType> & {
    states?: State[],
    attachedObjects?: ClassType[],
    transition?: BasicPropertyConfig<string, State>
};

/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectAppliedOptions<State extends string | number | symbol = any, ClassType extends object = Element> = {
    attachObjects?: boolean,
    executeForAll?: boolean
    recomputeIndices?: boolean,
    recomputeProperties?: boolean,
    applyStylesInstantly?: boolean,
    propertiesOverride?: StatefulReifectCoreProperties<State, ClassType>
}

/**
 * @group Components
 * @category StatefulReifect
 */
type ReifectEnabledObject = {
    global?: boolean,
    properties?: boolean,
    styles?: boolean,
    classes?: boolean,
    replaceWith?: boolean,
    transition?: boolean,
}

export {ReifectObjectData, ReifectInterpolator, StateInterpolator, StateSpecificProperty, BasicPropertyConfig,
    PropertyConfig, StatefulReifectProperties, StatefulReifectCoreProperties, ReifectAppliedOptions, ReifectEnabledObject};