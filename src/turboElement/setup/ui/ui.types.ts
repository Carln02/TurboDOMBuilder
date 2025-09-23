interface TurboElementUiInterface {
    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class (or whichever default selected class was set in the config) on the element and update the UI.
     */
    selected: boolean;

    /**
     * @function initializeUI
     * @description Initializes the element's UI by calling all the setup methods (setupChangedCallbacks,
     * setupUIElements, setupUILayout, setupUIListeners).
     */
    initializeUI(): void;

    unsetDefaultClasses: boolean;
}

export {TurboElementUiInterface};