interface TurboElementDefaultInterface {
    /**
     * @description Whether the element is selected or not.
     */
    selected: boolean;

    /**
     * @function getPropertiesValue
     * @description Returns the value with some fallback mechanisms on the static config field and a default value.
     * @param {Type} propertiesValue - The actual value; could be null.
     * @param {string} [configFieldName] - The field name of the associated value in the static config. Will be returned
     * if the actual value is null.
     * @param {Type} [defaultValue] - The default fallback value. Will be returned if both the actual and
     * config values are null.
     * @protected
     */
    getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type;
}

export {TurboElementDefaultInterface};