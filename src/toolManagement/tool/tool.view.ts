import {TurboView} from "../../domBuilding/mvc/turboView";
import {TurboModel} from "../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../domBuilding/mvc/turboEmitter";
import {Tool} from "./tool";
import {h4} from "../../domBuilding/elementCreation/basicElements";
import {DefaultEventName} from "../../eventHandling/eventNaming";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";

class ToolView<
    ElementType extends Tool = Tool<any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboView<ElementType, ModelType, EmitterType> {
    protected textElement: HTMLHeadingElement;

    protected setupUIElements() {
        super.setupUIElements();
        this.textElement = h4({text: this.element.name});
        this.element.addClass("card clickable");
    }

    protected setupUILayout() {
        super.setupUILayout();
        this.element.addChild(this.textElement);
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("selected", (value: boolean) => this.element.toggleClass(Tool.config.defaultSelectedClass, value));
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        this.element.addEventListener(DefaultEventName.click, (e) => {
            this.element.toolManager.setTool(this.element, ClickMode.left);
            e.stopImmediatePropagation();
        });
    }
}

export {ToolView};