function trim(value: number, max: number, min: number = 0): number {
    if (value < min) value = min;
    if (value > max) value = max;
    return value;
}

function mod(value: number, modValue: number = 0): number {
    while (value < 0) value += modValue;
    while (value >= modValue) value -= modValue;
    return value;
}
export {trim, mod};