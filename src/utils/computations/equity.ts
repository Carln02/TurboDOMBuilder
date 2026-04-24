/**
 * @group Utilities
 * @category Equity
 */
function areEqual<Type = any>(...entries: Type[]): boolean {
    if (entries.length < 2) return true;
    for (let i = 0; i < entries.length - 1; i++) {
        if (entries[i] != entries[i + 1]) return false;
    }
    return true;
}

function areSimilar<Type = any>(...entries: Type[]): boolean {
    if (entries.length < 2) return true;
    for (let i = 0; i < entries.length - 1; i++) {
        const e1 = entries[i];
        const e2 = entries[i + 1];
        if (e1 === e2) continue;
        if (typeof e1 !== "object" || typeof e2 !== "object") return false;
        if (Object.is(e1, e2)) continue;
        if (e1 !== null && "equals" in e1 && typeof e1.equals === "function") {
            const value = e1.equals(e2);
            if (typeof value === "boolean") return value;
        }
        if (e1 != null && e2 != null) {
            let cont = false;
            try {if (JSON.stringify(e1) === JSON.stringify(e2) && e1.toString() === e2.toString()) cont = true; } catch { }
            if (!cont) return false;
        }
    }
    return true;
}

/**
 * @group Utilities
 * @category Equity
 */
function equalToAny<Type = any>(entry: Type, ...values: Type[]): boolean {
    if (values.length < 1) return true;
    for (const value of values) {
        if (entry == value) return true;
    }
    return false;
}

/**
 * @group Utilities
 * @category Equity
 */
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

export {areEqual, equalToAny, eachEqualToAny, areSimilar};