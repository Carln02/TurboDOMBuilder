function isNull(value: any): boolean {
    return value == null && value != undefined;
}

function isUndefined(value: any): boolean {
    return typeof value == "undefined";
}

export {isNull, isUndefined};