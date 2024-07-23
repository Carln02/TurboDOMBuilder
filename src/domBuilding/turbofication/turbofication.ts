import {addClassManipulationToElementPrototype} from "./classManipulation/classManipulation";
import {addChildManipulationToElementPrototype} from "./childManipulation/childManipulation";
import {addListenerManipulationToElementPrototype} from "./listenerManipulation/listenerManipulation";
import {addElementManipulationToElementPrototype} from "./elementManipulation/elementManipulation";
import {addStylesManipulationToElementPrototype} from "./styleManipulation/styleManipulation";
import {updateChainingPropertiesInElementPrototype} from "./chainingProperties/chainingProperties";
import "./turbofication.types";

function turbofy() {
    addClassManipulationToElementPrototype();
    addChildManipulationToElementPrototype();
    addListenerManipulationToElementPrototype();
    addElementManipulationToElementPrototype();
    addStylesManipulationToElementPrototype();
    updateChainingPropertiesInElementPrototype();
}

export {turbofy};