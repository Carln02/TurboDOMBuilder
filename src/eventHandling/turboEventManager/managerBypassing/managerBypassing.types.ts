import {TurboEventManagerStateProperties} from "../turboEventManager.types";

declare global {
    interface HTMLElement {
        bypassTurboEventManagerOn: (e: Event) => (boolean | TurboEventManagerStateProperties);

        bypassTurboEventManager(): this;
    }
}

export {};