/**
 * @group Utilities
 * @category Null Check
 */
function isNull(value: any): boolean {
    return value == null && value != undefined;
}

/**
 * @group Utilities
 * @category Null Check
 */
function isUndefined(value: any): boolean {
    return typeof value == "undefined";
}

function alphabeticalSorting(a: string | number | symbol, b: string | number | symbol): number {
    if (typeof a == "string" && typeof b == "string") return a.localeCompare(b);
    else if (typeof a == "number" && typeof b == "number") return a - b;
    return 0;
}

export {isNull, isUndefined, alphabeticalSorting};