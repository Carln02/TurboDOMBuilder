/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {Object} target
 * @param {string} propertyKey
 */
function observe(target: Object, propertyKey: string): void {
    let constructor = target.constructor as any;
    if (!constructor.observedFields) constructor.observedFields = [];

    if (!constructor.observedFields.includes(propertyKey)) {
        constructor.observedFields.push(propertyKey);
    }
}

export {observe};