import {Coordinate} from "./point.types";

class Point {
    public readonly x: number;
    public readonly y: number;

    /**
     * @description Create a point with coordinates (0, 0)
     */
    constructor()
    /**
     * @description Create a point with coordinates (n, n)
     * @param {number} n - The input value
     */
    constructor(n: number)
    /**
     * @description Create a point with coordinates (x, y)
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x: number, y: number)
    /**
     * @description Create a point with the clientX/clientY values. Useful for events.
     * @param {{clientX: number, clientY: number}} e - The coordinates
     */
    constructor(e: { clientX: number, clientY: number })
    /**
     * @description Create a point with the provided coordinates
     * @param {Coordinate} p - The coordinates (or Point)
     */
    constructor(p: Coordinate)
    /**
     * @description Create a point with the provided [x, y] values.
     * @param {[number, number]} arr - The array of size 2.
     */
    constructor(arr: [number, number])
    constructor(x: number | Coordinate | { clientX: number, clientY: number } | [number, number])
    constructor(x: number | Coordinate | { clientX: number, clientY: number } | [number, number] = 0,
                y: number = typeof x == "number" ? x : 0) {
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
        } else if ("clientX" in x) {
            this.x = x.clientX;
            this.y = x.clientY;
        } else if ("x" in x) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x[0];
            this.y = x[1];
        }
    }

    // Static methods

    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    public static dist(p1: Coordinate, p2: Coordinate): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    public static midPoint(...arr: Coordinate[]): Point {
        if (arr.length == 0) return null;
        const x = arr.reduce((sum, p) => sum + p.x, 0) / arr.length;
        const y = arr.reduce((sum, p) => sum + p.y, 0) / arr.length;
        return new Point(x, y);
    }

    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    public static max(...arr: Coordinate[]): Point {
        if (arr.length == 0) return null;
        const x = arr.reduce((max, p) => Math.max(max, p.x), -Infinity);
        const y = arr.reduce((max, p) => Math.max(max, p.y), -Infinity);
        return new Point(x, y);
    }

    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    public static min(...arr: Coordinate[]): Point {
        if (arr.length == 0) return null;
        const x = arr.reduce((min, p) => Math.min(min, p.x), Infinity);
        const y = arr.reduce((min, p) => Math.min(min, p.y), Infinity);
        return new Point(x, y);
    }

    // Instance methods

    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {Coordinate} p - The coordinates to compare it to
     * @return A boolean indicating whether they are equal
     */
    public equals(p: Coordinate): boolean
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return A boolean indicating whether they are equal
     */
    public equals(x: number, y: number): boolean
    public equals(x: number | Coordinate, y: number = 0): boolean {
        if (typeof x == "number") return this.x == x && this.y == y;
        return this.x == x.x && this.y == x.y;
    }

    public boundX(x1: number, x2: number): number {
        return this.x < x1 ? x1
            : this.x > x2 ? x2
                : this.x;
    }

    public boundY(y1: number, y2: number): number {
        return this.y < y1 ? y1
            : this.y > y2 ? y2
                : this.y;
    }

    public bound(n1: number, n2: number): Point
    public bound(x1: number, x2: number, y1: number = x1, y2: number = x2): Point {
        return new Point(this.boundX(x1, x2), this.boundY(y1, y2));
    }

    /**
     * @description Add coordinates to this point
     * @param {number} n - The value to add to both x and y
     * @returns A new Point object with the result
     */
    public add(n: number): Point
    /**
     * @description Add coordinates to this point
     * @param {number} x - The value to add to the x coordinate
     * @param {number} y - The value to add to the y coordinate
     * @returns A new Point object with the result
     */
    public add(x: number, y: number): Point
    /**
     * @description Add coordinates to this point
     * @param {Coordinate} p - The coordinates to add
     * @returns A new Point object with the result
     */
    public add(p: Coordinate): Point
    public add(x: number | Coordinate, y?: number): Point {
        if (typeof x == "number") return new Point(this.x + x, this.y + (y || y == 0 ? y : x));
        return new Point(this.x + x.x, this.y + x.y);
    }

    /**
     * @description Subtract coordinates from this point
     * @param {number} n - The value to subtract from both x and y
     * @returns A new Point object with the result
     */
    public sub(n: number): Point
    /**
     * @description Subtract coordinates from this point
     * @param {number} x - The value to subtract from the x coordinate
     * @param {number} y - The value to subtract from the y coordinate
     * @returns A new Point object with the result
     */
    public sub(x: number, y: number): Point
    /**
     * @description Subtract coordinates from this point
     * @param {Coordinate} p - The coordinates to subtract
     * @returns A new Point object with the result
     */
    public sub(p: Coordinate): Point
    public sub(x: number | Coordinate, y?: number): Point {
        if (typeof x == "number") return new Point(this.x - x, this.y - (y || y == 0 ? y : x));
        return new Point(this.x - x.x, this.y - x.y);
    }

    /**
     * @description Multiply coordinates of this point
     * @param {number} n - The value to multiply both x and y
     * @returns A new Point object with the result
     */
    public mul(n: number): Point
    /**
     * @description Multiply coordinates of this point
     * @param {number} x - The value to multiply the x coordinate
     * @param {number} y - The value to multiply the y coordinate
     * @returns A new Point object with the result
     */
    public mul(x: number, y: number): Point
    /**
     * @description Multiply coordinates of this point
     * @param {Coordinate} p - The coordinates to multiply
     * @returns A new Point object with the result
     */
    public mul(p: Coordinate): Point
    public mul(x: number | Coordinate, y?: number): Point {
        if (typeof x == "number") return new Point(this.x * x, this.y * (y || y == 0 ? y : x));
        return new Point(this.x * x.x, this.y * x.y);
    }

    /**
     * @description Divide coordinates of this point
     * @param {number} n - The value to divide both x and y
     * @returns A new Point object with the result
     */
    public div(n: number): Point
    /**
     * @description Divide coordinates of this point
     * @param {number} x - The value to divide the x coordinate
     * @param {number} y - The value to divide the y coordinate
     * @returns A new Point object with the result
     */
    public div(x: number, y: number): Point
    /**
     * @description Divide coordinates of this point
     * @param {Coordinate} p - The coordinates to divide
     * @returns A new Point object with the result
     */
    public div(p: Coordinate): Point
    public div(x: number | Coordinate, y?: number): Point {
        if (typeof x == "number") return new Point(this.x / x, this.y / (y || y == 0 ? y : x));
        return new Point(this.x / x.x, this.y / x.y);
    }

    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    public abs(): Point {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    public max(): number {
        return Math.max(this.x, this.y);
    }

    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    public min(): number {
        return Math.min(this.x, this.y);
    }

    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    public copy(): Point {
        return new Point(this.x, this.y);
    }

    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    public arr(): number[] {
        return [this.x, this.y];
    }
}

export {Point};
