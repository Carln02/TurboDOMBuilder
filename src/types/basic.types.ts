/**
 * @group Types
 * @category Basics
 */
type FlexRect = {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number
};

/**
 * @group Types
 * @category Basics
 */
type Coordinate<Type = number> = {
    x: Type;
    y: Type;
};

/**
 * @group Types
 * @category Basics
 */
type PartialRecord<Property extends keyof any, Value> = { [P in Property]?: Value };

export {PartialRecord, FlexRect, Coordinate};