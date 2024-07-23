function areEqual<Type = any>(...entries: Type[]): boolean {
    if (entries.length < 2) return true;
    for (let i = 0; i < entries.length - 1; i++) {
        if (entries[i] != entries[i + 1]) return false;
    }
    return true;
}

function eachEqualToAny<Type = any>(values: Type[], ...entries: Type[]): boolean {
    if (entries.length < 1) return true;
    for (const entry of entries) {
        let equals = false;
        for (const value of values) {
            if (entry == value) equals = true;
        }
        if (!equals) return false;
    }
    return true;
}

export {areEqual, eachEqualToAny};