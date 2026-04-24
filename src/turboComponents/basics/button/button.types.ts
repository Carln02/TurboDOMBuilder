import {TurboButton} from "./button";

declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-button": TurboButton
    }
}