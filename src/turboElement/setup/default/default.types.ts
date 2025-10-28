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

    /**
     * @function destroy
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    destroy(): this;

    /**
     * @function initialize
     * @description Initializes the element. It sets up the UI by calling the methods `setupUIElements`,
     * `setupUILayout`, `setupUIListeners`, and `setupChangedCallbacks` (in this order, if they are defined).
     * This function is called automatically in `.setProperties()` and when instantiating an
     * element via `element()`. It is called only once per element (as it checks with the reflected `initialized` flag).
     */
    initialize(): void;


    /**
     * @readonly
     * @description Whether the element was initialized already or not.
     */
    readonly initialized: boolean;
}

export {TurboElementDefaultInterface};