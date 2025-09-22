async function hashString(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function hashBySize(input: string, chars = 12): Promise<string> {
    const bytes = Math.ceil((chars * 6) / 8);

    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest("SHA-256", enc.encode(input));
    const slice = new Uint8Array(digest).slice(0, bytes);

    return (typeof btoa === "function"
        ? btoa(String.fromCharCode(...slice))
        : Buffer.from(slice).toString("base64"))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "")
        .slice(0, chars);
}

export {hashString, hashBySize};