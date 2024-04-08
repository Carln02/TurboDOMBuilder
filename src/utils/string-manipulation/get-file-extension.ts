function getFileExtension(str?: string): string {
    if (!str) return "";
    const match = str.match(/\.\S{1,4}$/);
    return match ? match[0] : "";
}

export {getFileExtension};