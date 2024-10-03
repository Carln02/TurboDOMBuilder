import { ReifectHandler } from "../reifectHandler/reifectHandler";
import { StatefulReifect } from "../statefulReifect/statefulReifect";
import { Shown } from "../../../utils/datatypes/basicDatatypes.types";
declare global {
    interface Node {
        /**
         * @description Handler for all Reifects attached to this element.
         */
        readonly reifects: ReifectHandler;
        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom StatefulReifect.
         */
        showTransition: StatefulReifect<Shown>;
        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;
        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean): this;
    }
}
