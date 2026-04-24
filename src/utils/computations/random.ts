/**
 * @group Utilities
 * @category Random
 */
function randomId(length: number = 8): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map(b => b.toString(36).padStart(2, "0"))
        .join("")
        .slice(0, length);
}

/**
 * @group Utilities
 * @category Random
 */
function randomFromRange(n1: number, n2: number) {
    if (typeof n1 != "number" || typeof n2 != "number") return 0;
    const min = Math.min(n1, n2);
    const max = Math.max(n1, n2);
    return (Math.random() * (max - min)) + min;
}

/**
 * @group Utilities
 * @category Random
 */
function randomString(length: number = 12): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

export {randomString, randomFromRange, randomId};