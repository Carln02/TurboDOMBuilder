import {TurboElementProperties} from "../../turboElement.types";
import {CloneElementOptions, FeedforwardProperties} from "../../../turboFunctions/element/element.types";

/**
 * @internal
 */
interface TurboElementDefaultInterface {
    /**
     * @description Whether the element is selected or not.
     */
    selected: boolean;

    readonly properties: object;

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

    defaultFeedforwardProperties: TurboElementProperties;

    feedforward(properties?: FeedforwardProperties): this;

    clone(options?: CloneElementOptions): this;
}

export {TurboElementDefaultInterface};