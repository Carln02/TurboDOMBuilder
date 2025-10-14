import {TurboSelector} from "../turboSelector";
import {ReifectHandler} from "../../turboComponents/wrappers/reifectHandler/reifectHandler";
import {StatefulReifect} from "../../turboComponents/wrappers/statefulReifect/statefulReifect";
import {Shown} from "../../utils/datatypes/basicDatatypes.types";

type ReifectDataEntry = {
    reifects?: ReifectHandler,
    showTransition?: StatefulReifect<Shown>,
};

export class ReifectFunctionsUtils {
    private dataMap = new WeakMap<Node, ReifectDataEntry>;

    public data(element: Node) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
}