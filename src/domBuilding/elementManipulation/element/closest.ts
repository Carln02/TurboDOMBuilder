function closest<T extends Element>(element: Element, type: new (...args: any[]) => T): T | null {
    if (!element || !type) return null;
    while (element && !(element instanceof type)) element = element.parentElement;
    return (element as T) || null;
}

export {closest};