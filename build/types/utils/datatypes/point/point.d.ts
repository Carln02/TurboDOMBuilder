import { Coordinate } from "./point.types";
declare class Point {
    readonly x: number;
    readonly y: number;
    /**
     * @description Create a point with coordinates (0, 0)
     */
    constructor();
    /**
     * @description Create a point with coordinates (n, n)
     * @param {number} n - The input value
     */
    constructor(n: number);
    /**
     * @description Create a point with coordinates (x, y)
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x: number, y: number);
    /**
     * @description Create a point with the clientX/clientY values. Useful for events.
     * @param {{clientX: number, clientY: number}} e - The coordinates
     */
    constructor(e: {
        clientX: number;
        clientY: number;
    });
    /**
     * @description Create a point with the provided coordinates
     * @param {Coordinate} p - The coordinates (or Point)
     */
    constructor(p: Coordinate);
    /**
     * @description Create a point with the provided [x, y] values.
     * @param {[number, number]} arr - The array of size 2.
     */
    constructor(arr: [number, number]);
    constructor(x: number | Coordinate | {
        clientX: number;
        clientY: number;
    } | [number, number]);
    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    static dist(p1: Coordinate, p2: Coordinate): number;
    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static midPoint(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static max(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static min(...arr: Coordinate[]): Point;
    get object(): Coordinate;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {Coordinate} p - The coordinates to compare it to
     * @return A boolean indicating whether they are equal
     */
    equals(p: Coordinate): boolean;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return A boolean indicating whether they are equal
     */
    equals(x: number, y: number): boolean;
    boundX(x1: number, x2: number): number;
    boundY(y1: number, y2: number): number;
    bound(n1: number, n2: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} n - The value to add to both x and y
     * @returns A new Point object with the result
     */
    add(n: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} x - The value to add to the x coordinate
     * @param {number} y - The value to add to the y coordinate
     * @returns A new Point object with the result
     */
    add(x: number, y: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {Coordinate} p - The coordinates to add
     * @returns A new Point object with the result
     */
    add(p: Coordinate): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} n - The value to subtract from both x and y
     * @returns A new Point object with the result
     */
    sub(n: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} x - The value to subtract from the x coordinate
     * @param {number} y - The value to subtract from the y coordinate
     * @returns A new Point object with the result
     */
    sub(x: number, y: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {Coordinate} p - The coordinates to subtract
     * @returns A new Point object with the result
     */
    sub(p: Coordinate): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} n - The value to multiply both x and y
     * @returns A new Point object with the result
     */
    mul(n: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} x - The value to multiply the x coordinate
     * @param {number} y - The value to multiply the y coordinate
     * @returns A new Point object with the result
     */
    mul(x: number, y: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {Coordinate} p - The coordinates to multiply
     * @returns A new Point object with the result
     */
    mul(p: Coordinate): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} n - The value to divide both x and y
     * @returns A new Point object with the result
     */
    div(n: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} x - The value to divide the x coordinate
     * @param {number} y - The value to divide the y coordinate
     * @returns A new Point object with the result
     */
    div(x: number, y: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {Coordinate} p - The coordinates to divide
     * @returns A new Point object with the result
     */
    div(p: Coordinate): Point;
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    abs(): Point;
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    max(): number;
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    min(): number;
    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    copy(): Point;
    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    arr(): number[];
}
export { Point };
